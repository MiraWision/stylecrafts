#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Universal Logo/PNG → SVG vectorizer

Стек:
- VTracer (color) → первичная трассировка, гладкие кривые.
- Фолбэк: k-means в Lab + послойный Potrace (P5/PGM) → точные бренд-цвета.
- Геометрический постпроцесс: снап к окружностям и скруглённым прямоугольникам (rounded-rect).
- Полный учёт альфы: clipPath, обрезка слоёв, порядок слоёв по площади.
- Корректный парсинг/сборка SVG (viewBox/width/height сохраняются).

CLI:
    python vectorize_logo.py input.png -o out.svg
"""

import os, re, sys, math, tempfile, subprocess, shutil, warnings
from dataclasses import dataclass
from typing import List, Tuple, Optional
import xml.etree.ElementTree as ET

import numpy as np
import cv2 as cv
from shapely.geometry import Polygon, Point
from shapely.affinity import rotate, translate
from svgpathtools import parse_path, Path

# Подавляем предупреждения от библиотек
warnings.filterwarnings("ignore", category=UserWarning, module="svgpathtools")
warnings.filterwarnings("ignore", category=UserWarning, module="shapely")

# =========================
# Utils / IO
# =========================

def has_bin(name: str) -> bool:
    return shutil.which(name) is not None

def imread_bgr(path_or_bytes):
    """Return (BGR, alpha_or_None)."""
    if isinstance(path_or_bytes, (bytes, bytearray)):
        arr = np.frombuffer(path_or_bytes, np.uint8)
        img = cv.imdecode(arr, cv.IMREAD_UNCHANGED)
    else:
        img = cv.imread(path_or_bytes, cv.IMREAD_UNCHANGED)
    if img is None:
        raise ValueError("Cannot read image")
    if img.ndim == 2:
        return cv.cvtColor(img, cv.COLOR_GRAY2BGR), None
    if img.shape[2] == 4:
        return img[..., :3], img[..., 3]
    return img, None

def estimate_unique_colors(bgr: np.ndarray, stride: int = 2) -> int:
    sub = bgr[::stride, ::stride, :]
    uniq = np.unique(sub.reshape(-1,3), axis=0)
    return len(uniq)

def is_logo_like(img_bgr: np.ndarray, alpha: Optional[np.ndarray]) -> bool:
    h, w = img_bgr.shape[:2]
    px = h * w
    few_colors = estimate_unique_colors(img_bgr) < 48
    smallish = px < 1_200_000
    has_alpha = alpha is not None and (alpha < 10).sum() > 0
    return (few_colors and smallish) or has_alpha

def _estimate_bg_bgr(bgr: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Оценка фонового цвета: медиана по непрозрачным пикселям, fallback — белый."""
    mask = (alpha >= 240)
    if mask.sum() < 500:
        mask = (alpha >= 200)
    pix = bgr[mask]
    if len(pix) == 0:
        return np.array([255, 255, 255], np.uint8)
    return np.median(pix, axis=0).astype(np.uint8)

def decontaminate_alpha_halo(bgr: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Смешиваем полупрозрачные пиксели с оценённым фоном → исчезают тёмные ореолы."""
    bg = _estimate_bg_bgr(bgr, alpha).astype(np.float32)
    a = (alpha.astype(np.float32) / 255.0)[..., None]
    out = bgr.astype(np.float32) * a + bg[None, None, :] * (1.0 - a)
    return np.clip(out, 0, 255).astype(np.uint8)

def _is_edge_halo(mask01: np.ndarray) -> bool:
    """True, если маска похожа на тонкий контур (большая часть — внешнее кольцо)."""
    if mask01.sum() == 0:
        return False
    k3 = np.ones((3,3), np.uint8)
    er = cv.erode(mask01, k3, 1)
    ring = (mask01 & (~er))
    ring_ratio = float(ring.sum()) / float(mask01.sum())
    return ring_ratio > 0.60  # 60% пикселей находятся на «ободе»

# =========================
# Palette (k-means, Lab)
# =========================

def quantize_lab(img_bgr: np.ndarray, k: int = 6) -> Tuple[np.ndarray, np.ndarray]:
    """Return labels (HxW) and centers (k,3) in Lab."""
    lab = cv.cvtColor(img_bgr, cv.COLOR_BGR2LAB)
    # лёгкое подавление шума, но edge-aware
    lab_bgr = cv.cvtColor(lab, cv.COLOR_LAB2BGR)
    lab_bgr = cv.bilateralFilter(lab_bgr, d=0, sigmaColor=8, sigmaSpace=2)
    lab = cv.cvtColor(lab_bgr, cv.COLOR_BGR2LAB)

    data = lab.reshape(-1,3).astype(np.float32)
    criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 60, 0.1)
    _, labels, centers = cv.kmeans(data, k, None, criteria, 6, cv.KMEANS_PP_CENTERS)
    labels = labels.reshape(img_bgr.shape[:2])
    centers = centers.astype(np.uint8)
    return labels, centers

def color_of_mask_median_rgb(bgr: np.ndarray, mask01: np.ndarray) -> Tuple[int,int,int]:
    """mask01 in {0,1}"""
    pix = bgr[mask01.astype(bool)][:, ::-1]  # RGB
    if len(pix) == 0:
        return (128,128,128)
    r,g,b = np.median(pix, axis=0).astype(int)
    # защёлки белого/чёрного
    if r>245 and g>245 and b>245: return (255,255,255)
    if r<10 and g<10 and b<10:    return (0,0,0)
    return (r,g,b)

def deltaE76(c1: np.ndarray, c2: np.ndarray) -> float:
    c1 = c1.astype(np.float32); c2 = c2.astype(np.float32)
    return float(np.linalg.norm(c1 - c2))

def merge_labels_by_deltaE(labels: np.ndarray, centers_lab: np.ndarray, thr: float = 10.0):
    """
    Объединяем близкие кластеры (ΔE < thr). Возвращаем (new_labels, groups),
    где groups — список списков исходных индексов центров.
    """
    k = len(centers_lab)
    used = [False]*k
    groups = []
    for i in range(k):
        if used[i]: 
            continue
        grp = [i]; used[i] = True
        for j in range(i+1, k):
            if used[j]: 
                continue
            if deltaE76(centers_lab[i], centers_lab[j]) < thr:
                grp.append(j); used[j] = True
        groups.append(grp)

    mapping = np.zeros(k, dtype=np.int32)
    for gid, grp in enumerate(groups):
        for idx in grp:
            mapping[idx] = gid

    new_labels = mapping[labels]
    return new_labels, groups

# =========================
# SVG helpers
# =========================

_RGB_HEX = re.compile(r'#([0-9a-fA-F]{6})')
_RGB_FUNC = re.compile(r'rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)')

def _parse_rgb(s: str):
    if not s or s == 'none': return None
    m = re.search(r'#([0-9a-fA-F]{6})', s)
    if m:
        h = m.group(1); return (int(h[0:2],16), int(h[2:4],16), int(h[4:6],16))
    m = re.search(r'rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)', s)
    if m: return (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return None

def _parse_style_fill(style: str):
    if not style: return None
    kv = {}
    for part in style.split(';'):
        if ':' in part:
            k,v = part.split(':',1)
            kv[k.strip().lower()] = v.strip()
    if 'fill' in kv and kv['fill'] != 'none':
        col = _parse_rgb(kv['fill'])
        if col and float(kv.get('fill-opacity','1') or '1') > 0:
            return col
    return None

def _mat_identity():
    return np.eye(3, dtype=np.float64)

def _mat_translate(tx, ty=0.0):
    M = _mat_identity(); M[0,2]=tx; M[1,2]=ty; return M

def _mat_scale(sx, sy=None):
    if sy is None: sy = sx
    M = _mat_identity(); M[0,0]=sx; M[1,1]=sy; return M

def _mat_rotate(deg, cx=0.0, cy=0.0):
    th = math.radians(deg); c, s = math.cos(th), math.sin(th)
    R = np.array([[c,-s,0],[s, c,0],[0,0,1]], dtype=np.float64)
    if cx or cy:
        return _mat_translate(cx,cy) @ R @ _mat_translate(-cx,-cy)
    return R

_TRANS_RE = re.compile(r'(matrix|translate|scale|rotate)\s*\(([^)]*)\)')

def _parse_transform_attr(t: str):
    M = _mat_identity()
    if not t: return M
    for kind, args in _TRANS_RE.findall(t):
        vals = [float(v) for v in re.split(r'[ ,]+', args.strip()) if v]
        if kind == 'matrix' and len(vals)==6:
            a,b,c,d,e,f = vals
            T = np.array([[a,c,e],[b,d,f],[0,0,1]], dtype=np.float64)
        elif kind == 'translate':
            T = _mat_translate(vals[0], vals[1] if len(vals)>1 else 0.0)
        elif kind == 'scale':
            T = _mat_scale(vals[0], vals[1] if len(vals)>1 else None)
        elif kind == 'rotate':
            T = _mat_rotate(vals[0], *(vals[1:3] if len(vals)>=3 else (0.0,0.0)))
        else:
            T = _mat_identity()
        M = M @ T
    return M

def extract_paths_with_ctm(svg_text: str):
    """
    Возвращает список кортежей (d, fill_rgb_or_None, CTM(3x3)).
    Учитывает наследование fill и все transform в иерархии.
    """
    try:
        root = ET.fromstring(svg_text)
    except ET.ParseError:
        return []

    ns = ''
    if root.tag.startswith('{'):
        ns = root.tag.split('}')[0] + '}'

    out = []

    def walk(node, ctm, inherited_fill):
        node_ctm = ctm @ _parse_transform_attr(node.get('transform',''))
        # fill: attr → style → наследование
        cur_fill = inherited_fill
        fa = node.get('fill')
        if fa and fa != 'none':
            cur_fill = _parse_rgb(fa)
        else:
            st = _parse_style_fill(node.get('style',''))
            if st: cur_fill = st

        if node.tag == f'{ns}path':
            d = node.get('d')
            if d: out.append((d, cur_fill, node_ctm))

        for ch in list(node):
            walk(ch, node_ctm, cur_fill)

    walk(root, _mat_identity(), None)
    return out

def _apply_ctm_to_points(pts: np.ndarray, M: np.ndarray):
    # pts: Nx2 → Nx2
    hp = np.c_[pts, np.ones((len(pts),1))]
    res = (hp @ M.T)[:, :2]
    return res.astype(np.float32)

def _poly_to_path_d(pts: np.ndarray):
    if len(pts) < 3: return ""
    s = [f"M{pts[0,0]},{pts[0,1]}"]
    s += [f"L{x},{y}" for x,y in pts[1:]]
    s.append("Z")
    return " ".join(s)

def _parse_fill(s: str) -> Optional[Tuple[int,int,int]]:
    """Parse fill from attributes or style string."""
    # style="fill:#rrggbb" or style="fill:rgb(...)" or fill="#rrggbb" etc.
    cand = None
    m = re.search(r'fill="([^"]+)"', s)
    if m: cand = m.group(1)
    else:
        m2 = re.search(r'style="([^"]+)"', s)
        if m2:
            st = m2.group(1)
            m3 = re.search(r'fill\s*:\s*([^;]+)', st)
            if m3: cand = m3.group(1)
    if not cand:
        return None
    mh = _RGB_HEX.search(cand)
    if mh:
        h = mh.group(1)
        r = int(h[0:2],16); g=int(h[2:4],16); b=int(h[4:6],16)
        return (r,g,b)
    mf = _RGB_FUNC.search(cand)
    if mf:
        return (int(mf.group(1)), int(mf.group(2)), int(mf.group(3)))
    return None

def parse_svg_paths(svg_text: str) -> List[Tuple[str, Optional[Tuple[int,int,int]]]]:
    """Return list of (d, fill_rgb_or_None)."""
    res=[]
    i=0
    while True:
        i = svg_text.find('<path', i)
        if i == -1: break
        j = svg_text.find('d="', i)
        if j == -1: 
            i += 5; 
            continue
        j += 3
        k = svg_text.find('"', j)
        d = svg_text[j:k]
        frag = svg_text[i: svg_text.find('>', i)+1]
        fill = _parse_fill(frag)
        res.append((d, fill))
        i = k
    return res

def extract_viewbox_wh(svg_text: str) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    def _get(attr):
        m = re.search(fr'{attr}="([^"]+)"', svg_text)
        return m.group(1) if m else None
    return _get("viewBox"), _get("width"), _get("height")

def build_svg(paths: List[Tuple[str, Tuple[int,int,int]]],
              viewbox: Optional[str],
              width: Optional[str],
              height: Optional[str],
              clip_path_d: Optional[str]=None) -> str:
    vb = viewbox or "0 0 1024 1024"
    head = '<svg xmlns="http://www.w3.org/2000/svg"'
    if width:  head += f' width="{width}"'
    if height: head += f' height="{height}"'
    head += f' viewBox="{vb}">'
    out=[head]
    if clip_path_d and len(clip_path_d) > 3:
        out.append('<defs>')
        out.append('<clipPath id="alphaClip">')
        out.append(f'<path d="{clip_path_d}"/>')
        out.append('</clipPath>')
        out.append('</defs>')
        out.append('<g clip-path="url(#alphaClip)" fill-rule="nonzero">')
    else:
        out.append('<g fill-rule="nonzero">')
    for d,(r,g,b) in paths:
        out.append(f'<path d="{d}" fill="rgb({r},{g},{b})"/>')
    out.append('</g></svg>')
    return "\n".join(out)

# =========================
# Path sampling & geometry fits
# =========================

def path_to_points(d: str, n: int = 256) -> np.ndarray:
    """Sample SVG path via svgpathtools."""
    try:
        p: Path = parse_path(d)
    except Exception:
        return np.zeros((0,2), np.float32)
    if p.length() == 0:
        return np.zeros((0,2), np.float32)
    ts = np.linspace(0, 1, n)
    xs = np.array([p.point(t).real for t in ts], np.float32)
    ys = np.array([p.point(t).imag for t in ts], np.float32)
    return np.stack([xs, ys], axis=1)

# --- subpaths sampling & rebuild ---

def path_to_subpaths_points(d: str, points_per_unit: float = 0.5) -> list[np.ndarray]:
    """
    Семплируем path в несколько полилиний (по подпутям). Никаких соединяющих диагоналей.
    points_per_unit — плотность семплинга (точек на единицу длины сегмента).
    """
    try:
        p: Path = parse_path(d)
    except Exception:
        return []

    subpaths = []
    cur = []
    prev_end = None

    for seg in p:
        # разрыв подпути: начало сегмента != конец предыдущего
        if prev_end is None or (seg.start != prev_end):
            if cur:
                subpaths.append(np.array(cur, np.float32))
                cur = []
            cur.append([seg.start.real, seg.start.imag])

        # сколько точек на сегмент (по длине)
        try:
            L = float(seg.length(error=1e-3))
        except Exception:
            L = 20.0
        n = max(6, int(L * points_per_unit))
        ts = np.linspace(0.0, 1.0, n, endpoint=True)
        for t in ts[1:]:  # первую уже добавили
            z = seg.point(t)
            cur.append([z.real, z.imag])

        prev_end = seg.end

    if cur:
        subpaths.append(np.array(cur, np.float32))

    # закрываем каждый подпуть «геометрически»
    closed = []
    for poly in subpaths:
        if len(poly) < 3:
            continue
        # если не замкнут — замкнём
        if np.linalg.norm(poly[0] - poly[-1]) > 1e-3:
            poly = np.vstack([poly, poly[0]])
        closed.append(poly)
    return closed

def apply_ctm_to_polylines(polys: list[np.ndarray], M: np.ndarray) -> list[np.ndarray]:
    if not polys: return []
    out = []
    for poly in polys:
        hp = np.c_[poly, np.ones((len(poly), 1), dtype=np.float64)]
        tr = (hp @ M.T)[:, :2].astype(np.float32)
        out.append(tr)
    return out

def polylines_to_path_d(polys: list[np.ndarray]) -> str:
    parts = []
    for poly in polys:
        if len(poly) < 3: 
            continue
        parts.append(f"M{poly[0,0]},{poly[0,1]}")
        for x, y in poly[1:]:
            parts.append(f"L{x},{y}")
        parts.append("Z")
    return " ".join(parts)

def fit_circle(points: np.ndarray, min_r: float = 2.0) -> Tuple[Tuple[float,float], float, float]:
    """Taubin circle fit; returns (cx,cy), r, circularity[0..1]."""
    if len(points) < 12:
        return (0,0), 0.0, 0.0
    x = points[:,0]; y = points[:,1]
    xm, ym = x.mean(), y.mean()
    u, v = x - xm, y - ym
    Suu = np.sum(u*u); Suv = np.sum(u*v); Svv = np.sum(v*v)
    Suuu = np.sum(u*u*u); Svvv = np.sum(v*v*v)
    Suvv = np.sum(u*v*v); Svuu = np.sum(v*u*u)
    A = np.array([[Suu, Suv],[Suv, Svv]])
    b = 0.5*np.array([Suuu + Suvv, Svvv + Svuu])
    try:
        uc, vc = np.linalg.solve(A,b)
    except np.linalg.LinAlgError:
        return (xm,ym), 0.0, 0.0
    cx, cy = xm+uc, ym+vc
    r = float(np.sqrt(uc*uc + vc*vc + (Suu+Svv)/len(points)))
    if r < min_r:
        return (cx,cy), r, 0.0
    d = np.sqrt((x-cx)**2 + (y-cy)**2)
    circ = 1.0 - float(np.clip(np.std(d)/(r+1e-6), 0, 1))
    return (cx,cy), r, circ

def rounded_rect_fit(points: np.ndarray, jaccard_thr: float = 0.80) -> Optional[Tuple[float,float,float,float,float,float]]:
    if len(points) < 20:
        return None
    pts = points.astype(np.float32)

    # PCA для ориентации
    pts0 = pts - pts.mean(axis=0, keepdims=True)
    cov = np.cov(pts0.T)
    eigvals, eigvecs = np.linalg.eigh(cov)
    R = eigvecs  # [e1 e2]
    pr = pts0 @ R  # локальные координаты

    x_min, y_min = pr[:,0].min(), pr[:,1].min()
    x_max, y_max = pr[:,0].max(), pr[:,1].max()
    w, h = (x_max - x_min), (y_max - y_min)

    if w < 4 or h < 4:
        return None

    # кривизна: берём точки на углах (где кривизна > медианы*2)
    d2 = np.diff(pr, axis=0, append=pr[:1])
    t = np.arctan2(d2[:,1], d2[:,0])
    kappa = np.abs(np.diff(t, prepend=t[-1:]))
    kappa = (kappa + np.roll(kappa, -1) + np.roll(kappa, 1)) / 3.0
    corner_idx = kappa >= (np.median(kappa) * 2.0)

    dx = np.minimum(pr[:,0]-x_min, x_max-pr[:,0])
    dy = np.minimum(pr[:,1]-y_min, y_max-pr[:,1])
    r_est = float(np.clip(np.median(np.minimum(dx[corner_idx], dy[corner_idx])), 0.0, min(w,h)/2))

    # собираем маску synthetic rounded-rect и сравниваем с исходной (Jaccard)
    step = 1.0
    W = int(math.ceil(w/step))+8
    H = int(math.ceil(h/step))+8
    syn = np.zeros((H, W), np.uint8)

    d_local = rounded_rect_path(0,0,w,h,r_est,0.0)
    local_pts = path_to_points(d_local, 600)
    local_pts[:,0] -= local_pts[:,0].min(); local_pts[:,1] -= local_pts[:,1].min()
    local_pts /= step
    cv.fillPoly(syn, [local_pts.astype(np.int32)], 255)

    orig = np.zeros_like(syn)
    pr_shift = pr.copy()
    pr_shift[:,0] -= x_min; pr_shift[:,1] -= y_min
    pr_shift /= step
    cv.fillPoly(orig, [pr_shift.astype(np.int32)], 255)

    inter = np.logical_and(syn>0, orig>0).sum()
    union = np.logical_or (syn>0, orig>0).sum()
    jacc = inter / (union + 1e-6)

    if jacc < jaccard_thr:
        return None

    # возвращаем в глобальные координаты
    cx, cy = pts.mean(axis=0).tolist()
    # угол поворота (по первой оси PCA)
    theta = math.degrees(math.atan2(R[1,1], R[0,1]))  # ось y локальная → глобальная
    return (float(cx), float(cy), float(w), float(h), float(r_est), float(theta))

def circle_path(cx: float, cy: float, r: float) -> str:
    """Circle via 4 cubic Bézier segments (maximal compatibility)."""
    k = 0.5522847498307936
    x0, y0 = cx - r, cy
    dx, dy = k*r, k*r
    return (
        f"M{x0},{y0} "
        f"C{x0},{y0-dy} {cx-r+dx},{cy-r} {cx},{cy-r} "
        f"C{cx+dx},{cy-r} {cx+r},{cy-dy} {cx+r},{cy} "
        f"C{cx+r},{cy+dy} {cx+dx},{cy+r} {cx},{cy+r} "
        f"C{cx-dx},{cy+r} {x0},{y0+dy} {x0},{y0} Z"
    )

def rounded_rect_path(cx: float, cy: float, w: float, h: float, r: float, theta_deg: float) -> str:
    """Rounded-rect via arcs (A) in the rectangle's local frame, then rotated."""
    # строим путь в локальных координатах
    x0, y0 = -w/2, -h/2
    r = max(0.0, min(r, min(w,h)/2))
    # углы: (x0+r,y0) → (x0+w-r,y0) → ... по часовой
    cmds = []
    # старт
    cmds.append(f"M{x0+r},{y0}")
    # top edge
    cmds.append(f"L{x0+w-r},{y0}")
    # top-right corner
    cmds.append(f"A{r},{r} 0 0 1 {x0+w},{y0+r}")
    # right edge
    cmds.append(f"L{x0+w},{y0+h-r}")
    # bottom-right
    cmds.append(f"A{r},{r} 0 0 1 {x0+w-r},{y0+h}")
    # bottom edge
    cmds.append(f"L{x0+r},{y0+h}")
    # bottom-left
    cmds.append(f"A{r},{r} 0 0 1 {x0},{y0+h-r}")
    # left edge
    cmds.append(f"L{x0},{y0+r}")
    # top-left
    cmds.append(f"A{r},{r} 0 0 1 {x0+r},{y0}")
    cmds.append("Z")
    d_local = " ".join(cmds)

    # теперь поворот и перенос через матрицу (аппроксимируем заменой координат в командах L/M/A)
    # Для стабильности проще сэмплировать в точки и собрать кубиками — но для компактности сделаем простую замену.
    # Сэмплируем и строим многоугольник (даёт очень чистый результат).
    pts = path_to_points(d_local, 400)
    # Повернуть и сдвинуть на (cx,cy)
    theta = math.radians(theta_deg)
    ct, st = math.cos(theta), math.sin(theta)
    rot = np.stack([ [ct, -st], [st, ct] ], axis=0)
    ptsR = (pts @ rot.T) + np.array([cx, cy], np.float32)

    # Собираем путь линиями (SVG рендеры сгладят), при желании можно аппрокс. C-дугами
    pieces = [f"M{ptsR[0,0]},{ptsR[0,1]}"]
    for i in range(1, len(ptsR)):
        x,y = ptsR[i]
        pieces.append(f"L{x},{y}")
    pieces.append("Z")
    return " ".join(pieces)

# =========================
# VTracer pipeline
# =========================

def vtracer_svg(img_bgr: np.ndarray,
                mode: str = "color",
                filter_speckle: int = 4,
                hierarchical: bool = True,
                corner_threshold: int = 60) -> Optional[str]:
    if not has_bin("vtracer"):
        return None
    tmp_png = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
    cv.imwrite(tmp_png, img_bgr)
    out_svg = tmp_png.replace(".png",".svg")
    cmd = ["vtracer", "--mode", mode, "--filter-speckle", str(filter_speckle),
           "--input", tmp_png, "--output", out_svg,
           "--corner-threshold", str(corner_threshold)]
    if hierarchical:
        cmd.append("--hierarchical")
    subprocess.run(cmd, check=True)
    svg = open(out_svg,"r",encoding="utf-8").read()
    os.remove(tmp_png); os.remove(out_svg)
    return svg

# =========================
# Potrace per-color layers
# =========================


def potrace_layer_svg_from_mask(mask01: np.ndarray) -> str:
    """Ч/б маска → SVG через potrace (PGM). Добавили мягкий порог и тонкое расширение."""
    m = (mask01.astype(np.uint8) * 255)
    # деликатно закрываем микродыры на альфе
    m = cv.morphologyEx(m, cv.MORPH_CLOSE, np.ones((3,3), np.uint8), iterations=1)
    inv = (255 - m)
    h, w = inv.shape
    pgm = tempfile.NamedTemporaryFile(suffix=".pgm", delete=False).name
    with open(pgm, "wb") as f:
        f.write(f"P5\n{w} {h}\n255\n".encode("ascii"))
        f.write(inv.tobytes())
    out_svg = pgm.replace(".pgm", ".svg")
    subprocess.run([
        "potrace", pgm, "-s", "-o", out_svg,
        "--flat", "--longcoding",
        "--turnpolicy", "minority",
        "--opttolerance", "0.2",
        "--turdsize", "3"          # отсек мелкие соринки
    ], check=True)
    txt = open(out_svg, "r", encoding="utf-8").read()
    os.remove(pgm); os.remove(out_svg)
    return txt

def _build_clip_from_alpha(alpha: np.ndarray) -> Optional[str]:
    """
    Строим clipPath только из крупнейшего внешнего контура альфы.
    Координаты — в пикселях исходного изображения.
    """
    print("      🔍 Анализируем альфа-канал...")
    a01 = (alpha >= 128).astype(np.uint8)
    alpha_pixels = np.sum(a01)
    print(f"      📊 Альфа-пиксели (>=128): {alpha_pixels}")
    
    # чуть закрываем микродыры, но не раздуваем
    print("      🔄 Применяем морфологическое закрытие...")
    a01 = cv.morphologyEx(a01, cv.MORPH_CLOSE, np.ones((3,3), np.uint8), iterations=1)
    alpha_pixels_after = np.sum(a01)
    print(f"      📊 После морфологии: {alpha_pixels_after} пикселей")

    print("      🔄 Запускаем Potrace для альфы...")
    clip_svg = potrace_layer_svg_from_mask(a01)
    items = extract_paths_with_ctm(clip_svg)
    print(f"      📊 Найдено контуров в альфе: {len(items)}")
    
    if not items:
        print("      ❌ Контуры не найдены")
        return None

    # берём самый большой контур, применив CTM к точкам
    print("      🔍 Ищем самый большой контур...")
    def area_of(item):
        d, _, M = item
        polys = path_to_subpaths_points(d, points_per_unit=0.8)
        polys = apply_ctm_to_polylines(polys, M)
        # площадь — сумма площадей подпутей
        s = 0.0
        for poly in polys:
            if len(poly) >= 3:
                s += abs(cv.contourArea(poly.astype(np.float32)))
        return s

    areas = [area_of(item) for item in items]
    print(f"      📊 Площади контуров: {[f'{a:.0f}' for a in areas]}")
    
    d_big, _, M_big = max(items, key=area_of)
    polys = path_to_subpaths_points(d_big, points_per_unit=0.8)
    polys = apply_ctm_to_polylines(polys, M_big)
    # собираем в единый d из нескольких подпутей
    clip_d = polylines_to_path_d(polys)
    
    if not clip_d:
        print("      ❌ Контур слишком мал или некорректный")
        return None

    print("      ✅ ClipPath успешно создан")
    return clip_d

def _white_like_mask(bgr: np.ndarray, alpha: Optional[np.ndarray]) -> np.ndarray:
    """Находим почти белые пиксели: L* высокий, насыщенность низкая. Возвращаем 0/1."""
    lab = cv.cvtColor(bgr, cv.COLOR_BGR2LAB)
    L, a, b = lab[...,0], lab[...,1], lab[...,2]
    # низкая хрома и высокий L
    chroma = np.abs(a - 128) + np.abs(b - 128)
    mask = (L >= 230) & (chroma <= 24)
    if alpha is not None:
        mask &= (alpha >= 128)
    return mask.astype(np.uint8)

def extract_paths_from_svg(svg_text: str) -> List[str]:
    return [d for d,_ in parse_svg_paths(svg_text)]

def color_layers_potrace_svg(img_bgr: np.ndarray, k: int, alpha: Optional[np.ndarray]) -> Tuple[str, Optional[str]]:
    print("      🔄 Начинаем обработку цветовых слоев...")
    H, W = img_bgr.shape[:2]
    print(f"      📊 Размер изображения: {W}x{H}")
    
    # clipPath
    clip_d = _build_clip_from_alpha(alpha) if alpha is not None else None

    # 1) слой «почти белый» (логотипные буквы/иконки)
    print("      🔍 Ищем белые пиксели...")
    white01 = _white_like_mask(img_bgr, alpha)
    white_pixels = int(white01.sum())
    print(f"      📊 Белых пикселей: {white_pixels}")
    
    paths_colored: List[Tuple[str, Tuple[int,int,int]]] = []
    if white_pixels > 100:
        print("      🔄 Обрабатываем белый слой...")
        wsvg = potrace_layer_svg_from_mask(white01)
        white_items = extract_paths_with_ctm(wsvg)
        print(f"      📊 Белых путей: {len(white_items)}")
        for (d_i, _, M_i) in white_items:
            polys = path_to_subpaths_points(d_i, points_per_unit=0.8)
            polys = apply_ctm_to_polylines(polys, M_i)
            d_fixed = polylines_to_path_d(polys)
            if d_fixed:
                paths_colored.append((d_fixed, (255,255,255)))
    else:
        print("      ⏭️ Белых пикселей слишком мало, пропускаем")

    # 2) остальные цвета (исключаем белое)
    print("      🔄 Подготавливаем изображение для k-means...")
    bgr_for_kmeans = img_bgr.copy()
    bgr_for_kmeans[white01.astype(bool)] = 0  # чтобы белое не «съедало» кластеры
    print("      🔄 Запускаем k-means кластеризацию...")
    labels, centers = quantize_lab(bgr_for_kmeans, k=max(3, k-1))
    print(f"      📊 K-means: {len(centers)} кластеров")
    
    # объединяем похожие центры, чтобы не плодить несколько "оранжевых" слоёв
    print("      🔄 Объединяем похожие цвета...")
    labels_merged, groups = merge_labels_by_deltaE(labels, centers, thr=9.0)
    print(f"      📊 После объединения: {len(groups)} групп цветов")

    # для каждого объединённого цвета — единая маска и один путь
    for gid, grp in enumerate(groups):
        print(f"      🔍 Обрабатываем группу цветов {gid}...")
        mask01 = np.isin(labels_merged, gid).astype(np.uint8)
        if alpha is not None:
            mask01 &= (alpha >= 128).astype(np.uint8)
        
        group_pixels = int(mask01.sum())
        area_ratio = group_pixels / float(H * W)
        print(f"      📊 Пикселей в группе {gid}: {group_pixels}")
        
        if group_pixels < 200:
            print(f"      ⏭️ Группа {gid} слишком мала, пропускаем")
            continue

        # медианный цвет по всей объединённой маске
        fill = color_of_mask_median_rgb(img_bgr, mask01)
        print(f"      📊 Цвет группы {gid}: RGB({fill[0]},{fill[1]},{fill[2]})")
        
        # Анализ цвета в LAB для определения яркости
        lab_px = cv.cvtColor(np.uint8([[fill[::-1]]]), cv.COLOR_BGR2Lab)[0,0]
        L = int(lab_px[0])

        # отсечь 1-пиксельные ободки и очень тёмные мелкие слои
        if _is_edge_halo(mask01) or (L < 30 and area_ratio < 0.02):
            print(f"      ⏭️ Группа {gid}: контурный/тёмный шум, пропускаем")
            continue

        # белый мы уже добавили отдельным слоем
        if sum(fill) > 735:
            print(f"      ⏭️ Группа {gid} слишком белая, пропускаем")
            continue

        print(f"      🔄 Трассируем группу {gid}...")
        layer_svg = potrace_layer_svg_from_mask(mask01)
        items = extract_paths_with_ctm(layer_svg)
        print(f"      📊 Путей в группе {gid}: {len(items)}")
        
        for (d_i, _, M_i) in items:
            polys = path_to_subpaths_points(d_i, points_per_unit=0.8)
            polys = apply_ctm_to_polylines(polys, M_i)
            d_fixed = polylines_to_path_d(polys)
            if d_fixed:
                paths_colored.append((d_fixed, fill))

    print(f"      📊 Всего путей собрано: {len(paths_colored)}")

    # 3) порядок слоёв: большие снизу, белые — сверху
    print("      🔄 Сортируем слои...")
    def area_of(d): 
        pts = path_to_points(d, 200)
        return float(cv.contourArea(pts)) if len(pts) >= 3 else 0.0
    
    # разделим белые и не белые
    whites = [(d,c) for (d,c) in paths_colored if c==(255,255,255)]
    colors = [(d,c) for (d,c) in paths_colored if c!=(255,255,255)]
    print(f"      📊 Белых путей: {len(whites)}, цветных: {len(colors)}")
    
    colors.sort(key=lambda it: area_of(it[0]), reverse=True)
    paths_ordered = colors + whites  # белое поверх
    print(f"      📊 Финальный порядок: {len(colors)} цветных + {len(whites)} белых")

    print("      🔄 Собираем финальный SVG...")
    vb = f"0 0 {W} {H}"
    svg = build_svg(paths_ordered, viewbox=vb, width=str(W), height=str(H), clip_path_d=clip_d)
    print("      ✅ SVG собран")
    return svg, clip_d

# =========================
# Geometry postprocess
# =========================

def postprocess_geometry(svg_text: str) -> str:
    """Try to replace near-circles and rounded-rects; keep fills, keep viewBox/size."""
    print("         🔍 Анализируем геометрию путей...")
    vb, w, h = extract_viewbox_wh(svg_text)
    parsed = parse_svg_paths(svg_text)
    print(f"         📊 Путей для анализа: {len(parsed)}")
    
    replaced: List[Tuple[str, Tuple[int,int,int]]] = []
    circles_found = 0
    rounded_rects_found = 0

    for i, (d, fill) in enumerate(parsed):
        print(f"         🔍 Анализируем путь {i+1}/{len(parsed)}...")
        pts = path_to_points(d, 256)
        if len(pts) < 8:
            print(f"         ⏭️ Путь {i+1}: слишком мало точек ({len(pts)}), пропускаем")
            if fill is None: fill=(0,0,0)
            replaced.append((d, fill))
            continue

        # 1) circle
        print(f"         🔍 Проверяем путь {i+1} на круг...")
        (cx,cy), r, circ = fit_circle(pts, min_r=2.0)
        print(f"         📊 Круг: центр=({cx:.1f},{cy:.1f}), r={r:.1f}, circularity={circ:.3f}")
        
        if circ >= 0.92:
            print(f"         ✅ Путь {i+1}: заменяем на круг")
            newd = circle_path(cx, cy, r)
            if fill is None: fill=(0,0,0)
            replaced.append((newd, fill))
            circles_found += 1
            continue

        # 2) rounded-rect
        print(f"         🔍 Проверяем путь {i+1} на скругленный прямоугольник...")
        rr = rounded_rect_fit(pts)
        if rr is not None:
            cx,cy,w0,h0,r0,theta = rr
            print(f"         📊 Rounded-rect: центр=({cx:.1f},{cy:.1f}), размер={w0:.1f}x{h0:.1f}, r={r0:.1f}, угол={theta:.1f}°")
            print(f"         ✅ Путь {i+1}: заменяем на скругленный прямоугольник")
            newd = rounded_rect_path(cx,cy,w0,h0,r0,theta)
            if fill is None: fill=(0,0,0)
            replaced.append((newd, fill))
            rounded_rects_found += 1
            continue

        # fallback
        print(f"         ⏭️ Путь {i+1}: оставляем как есть")
        if fill is None: fill=(0,0,0)
        replaced.append((d, fill))

    print(f"         📊 Результат: {circles_found} кругов, {rounded_rects_found} скругленных прямоугольников")
    print("         🔄 Собираем финальный SVG...")
    return build_svg(replaced, vb, w, h)

# =========================
# Main API
# =========================

@dataclass
class VectorizeOptions:
    prefer_vtracer: bool = True
    k_colors: int = 6
    do_geom_post: bool = True

def vectorize_logo(input_path_or_bytes, opt: VectorizeOptions = VectorizeOptions()) -> str:
    print("🚀 === НАЧАЛО ВЕКТОРИЗАЦИИ ===")
    
    # Загрузка изображения
    print("📁 Загружаем изображение...")
    bgr, alpha = imread_bgr(input_path_or_bytes)
    H, W = bgr.shape[:2]
    print(f"   ✅ Размер: {W}x{H}, каналов: {bgr.shape[2]}")
    print(f"   ✅ Альфа-канал: {'есть' if alpha is not None else 'нет'}")
    if alpha is not None:
        alpha_pixels = np.sum(alpha > 0)
        alpha_ratio = alpha_pixels / (H * W)
        print(f"   ✅ Альфа-пиксели: {alpha_pixels} ({alpha_ratio:.1%} от общего)")
        
        # Деконтаминация альфа-ореола
        print("   🔄 Деконтаминируем альфа-ореол...")
        bgr = decontaminate_alpha_halo(bgr, alpha)
        print("   ✅ Деконтаминация завершена")

    # Определение типа изображения
    logo_like = is_logo_like(bgr, alpha)
    print(f"🎯 Тип изображения: {'логотип/иконка' if logo_like else 'сложное'}")
    
    # Анализ цветов
    unique_colors = estimate_unique_colors(bgr)
    print(f"🎨 Уникальных цветов: {unique_colors}")

    # Построение clipPath
    print("✂️ Строим clipPath...")
    clip_d = _build_clip_from_alpha(alpha) if alpha is not None else None
    if clip_d:
        clip_pts = path_to_points(clip_d, 400)
        clip_area = float(cv.contourArea(clip_pts)) if len(clip_pts) >= 3 else 0.0
        full_area = float(W * H)
        clip_ratio = clip_area / full_area if full_area > 0 else 0
        print(f"   ✅ ClipPath создан, площадь: {clip_area:.0f}px ({clip_ratio:.1%})")
        if clip_ratio > 0.95:
            print("   ⚠️ ClipPath слишком большой (>95%), будет отключен")
    else:
        print("   ❌ ClipPath не создан")

    # 1) VTracer
    print("\n🔧 === ПРОБУЕМ VTRACER ===")
    if opt.prefer_vtracer and has_bin("vtracer"):
        print("   ✅ VTracer доступен")
        try:
            print("   🔄 Запускаем VTracer...")
            svg = vtracer_svg(bgr, mode="color", filter_speckle=2, hierarchical=True, corner_threshold=50)
            if svg:
                print("   ✅ VTracer успешно обработал изображение")
                
                if opt.do_geom_post:
                    print("   🔄 Применяем геометрический постпроцесс...")
                    svg = postprocess_geometry(svg)
                    print("   ✅ Геометрический постпроцесс завершен")

                # Обработка клипа для VTracer
                if svg and clip_d:
                    print("   🔄 Обрабатываем clipPath для VTracer...")
                    clip_pts = path_to_points(clip_d, 400)
                    clip_area = float(cv.contourArea(clip_pts)) if len(clip_pts) >= 3 else 0.0
                    full_area = float(W * H)
                    use_clip = (clip_area > 0) and (clip_area < 0.95 * full_area)
                    
                    print(f"   📊 Площадь клипа: {clip_area:.0f}px / {full_area:.0f}px ({clip_area/full_area:.1%})")
                    print(f"   📊 Использовать клип: {'да' if use_clip else 'нет'}")

                    # Парсинг путей
                    parsed = parse_svg_paths(svg)
                    print(f"   📊 Найдено путей: {len(parsed)}")
                    colored = [(d, fill if fill else (0, 0, 0)) for d, fill in parsed]

                    # Нормализация координат
                    vb = f"0 0 {W} {H}"
                    width, height = str(W), str(H)
                    print(f"   🔄 Нормализуем координаты: viewBox={vb}, size={width}x{height}")
                    svg = build_svg(colored, vb, width, height, clip_path_d=(clip_d if use_clip else None))
                    print("   ✅ SVG собран с нормализованными координатами")
                else:
                    print("   ℹ️ ClipPath не применяется")
                
                print("🎉 VTracer успешно завершен!")
                return svg
            else:
                print("   ❌ VTracer вернул пустой результат")
        except Exception as e:
            print(f"   ❌ VTracer упал: {e}")
            import traceback
            print(f"   📋 Traceback: {traceback.format_exc()}")
    else:
        if not opt.prefer_vtracer:
            print("   ⏭️ VTracer отключен в настройках")
        else:
            print("   ❌ VTracer не установлен")

    # 2) Potrace fallback
    print("\n🔧 === ПРОБУЕМ POTRACE FALLBACK ===")
    if has_bin("potrace"):
        print("   ✅ Potrace доступен")
        try:
            k_colors = opt.k_colors if logo_like else max(8, opt.k_colors+2)
            print(f"   🔄 Запускаем k-means + Potrace (k={k_colors})...")
            svg, _ = color_layers_potrace_svg(bgr, k=k_colors, alpha=alpha)
            print("   ✅ Potrace успешно обработал изображение")
            
            if opt.do_geom_post:
                print("   🔄 Применяем геометрический постпроцесс...")
                svg = postprocess_geometry(svg)
                print("   ✅ Геометрический постпроцесс завершен")
            
            print("🎉 Potrace fallback успешно завершен!")
            return svg
        except Exception as e:
            print(f"   ❌ Potrace упал: {e}")
            import traceback
            print(f"   📋 Traceback: {traceback.format_exc()}")
    else:
        print("   ❌ Potrace не установлен")

    # 3) Аварийный режим
    print("\n🔧 === АВАРИЙНЫЙ РЕЖИМ (OpenCV) ===")
    print("   ⚠️ Используем базовую трассировку контуров")
    try:
        gray = cv.cvtColor(bgr, cv.COLOR_BGR2GRAY)
        if alpha is not None:
            gray = cv.bitwise_and(gray, gray, mask=(alpha>0).astype(np.uint8)*255)
            print("   🔄 Применяем альфа-маску к серому изображению")
        
        _, th = cv.threshold(gray, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
        contours, _ = cv.findContours(255-th, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        print(f"   📊 Найдено контуров: {len(contours)}")
        
        paths = []
        for i, c in enumerate(contours):
            area = cv.contourArea(c)
            if area < 64:
                print(f"   ⏭️ Контур {i}: слишком мал ({area:.0f}px)")
                continue
            
            print(f"   🔄 Обрабатываем контур {i}: площадь {area:.0f}px")
            eps = max(0.002*cv.arcLength(c, True), 0.5)
            approx = cv.approxPolyDP(c, eps, True).reshape(-1,2)
            d = " ".join([("M" if i==0 else "L")+f"{x},{y}" for i,(x,y) in enumerate(approx)]) + " Z"
            mask = np.zeros((H,W), np.uint8); cv.drawContours(mask, [c], -1, 255, -1)
            r,g,b = color_of_mask_median_rgb(bgr, (mask>0).astype(np.uint8))
            paths.append((d,(r,g,b)))
            print(f"   ✅ Контур {i}: {len(approx)} точек, цвет RGB({r},{g},{b})")
        
        print(f"   📊 Итого путей: {len(paths)}")
        svg = build_svg(paths, f"0 0 {W} {H}", str(W), str(H), clip_path_d=clip_d)
        
        if opt.do_geom_post:
            print("   🔄 Применяем геометрический постпроцесс...")
            svg = postprocess_geometry(svg)
            print("   ✅ Геометрический постпроцесс завершен")
        
        print("🎉 Аварийный режим успешно завершен!")
        return svg
    except Exception as e:
        print(f"   ❌ Аварийный режим упал: {e}")
        import traceback
        print(f"   📋 Traceback: {traceback.format_exc()}")
        return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><text x="10" y="20" fill="red">Ошибка векторизации</text></svg>'

# =========================
# CLI
# =========================

def _main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("input", help="PNG/JPG with logo")
    ap.add_argument("-o","--output", default="out.svg")
    ap.add_argument("--no-vtracer", action="store_true", help="disable VTracer and use Potrace pipeline")
    ap.add_argument("--k", type=int, default=6, help="k-means palette size for Potrace pipeline")
    ap.add_argument("--no-geom", action="store_true", help="disable geometry postprocess")
    args = ap.parse_args()

    svg = vectorize_logo(
        args.input,
        VectorizeOptions(
            prefer_vtracer=not args.no_vtracer,
            k_colors=args.k,
            do_geom_post=not args.no_geom
        )
    )
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Saved: {args.output}")

if __name__ == "__main__":
    _main()
