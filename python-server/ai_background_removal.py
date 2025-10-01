#!/usr/bin/env python3
"""
AI Background Removal Module (OpenCV Plus)
Ансамбль из 6 кандидатов + авто-выбор лучшего + доводка
"""

import cv2 as cv
import numpy as np

# ============= базовые утилы =============
def _resize_keep(img, max_side=1600):
    h, w = img.shape[:2]
    s = max(h, w)
    if s <= max_side: return img, 1.0
    r = max_side/float(s)
    return cv.resize(img, (int(w*r), int(h*r)), cv.INTER_AREA), r

def _canny(gray):
    g = cv.GaussianBlur(gray, (0,0), 1.2)
    return cv.Canny(g, 80, 180, L2gradient=True)

# ============= saliency + priors =============
def _saliency_fused(gray):
    s1 = cv.saliency.StaticSaliencyFineGrained_create()
    ok1, m1 = s1.computeSaliency(gray)
    m1 = (m1*255).astype(np.uint8) if ok1 else np.zeros_like(gray)
    s2 = cv.saliency.StaticSaliencySpectralResidual_create()
    ok2, m2 = s2.computeSaliency(gray)
    m2 = (m2*255).astype(np.uint8) if ok2 else np.zeros_like(gray)
    sal = cv.normalize(0.65*m1.astype(np.float32)+0.35*m2.astype(np.float32), None, 0,255, cv.NORM_MINMAX).astype(np.uint8)
    return cv.GaussianBlur(sal, (0,0), 1.6)

def _bg_prior_by_border_kmeans(img_bgr, border=36, K=5):
    h,w = img_bgr.shape[:2]
    b = min(border, h//4, w//4)
    mask = np.zeros((h,w), np.uint8)
    mask[:b,:]=255; mask[-b:,:]=255; mask[:,:b]=255; mask[:,-b:]=255
    ys, xs = np.where(mask>0)
    if len(xs)<K: return np.ones((h,w), np.float32)*0.5
    samples = img_bgr[ys, xs].reshape(-1,3).astype(np.float32)
    crit = (cv.TERM_CRITERIA_EPS+cv.TERM_CRITERIA_MAX_ITER, 50, 0.5)
    _, lb, centers = cv.kmeans(samples, K, None, crit, 3, cv.KMEANS_PP_CENTERS)
    imgf = img_bgr.reshape(-1,3).astype(np.float32)
    dists = [np.linalg.norm(imgf-c, axis=1) for c in centers]
    dmin = np.min(np.stack(dists,0), 0).reshape(h,w)
    dmin = cv.GaussianBlur(dmin, (0,0), 2.2)
    return cv.normalize(dmin, None, 0,1, cv.NORM_MINMAX)

# ============= trimap/инициализации =============
def _auto_trimap(sal, bg_prior, center_bias=0.25, fg_q=0.90, bg_thr=0.55):
    h, w = sal.shape
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w/2.0, h/2.0
    cb = np.exp(-(((xx-cx)/w)**2 + ((yy-cy)/h)**2)/(2*(0.35**2)))
    cb = cv.normalize(cb, None, 0,1, cv.NORM_MINMAX)
    s = sal.astype(np.float32)/255.0
    sure_bg = ((bg_prior>bg_thr) & (s<0.25)).astype(np.uint8)*255
    score_fg = s*(0.6+0.4*cb)
    thr_fg = np.quantile(score_fg, fg_q)
    sure_fg = (score_fg>=thr_fg).astype(np.uint8)*255
    trimap = np.full((h,w), cv.GC_PR_BGD, np.uint8)
    trimap[sure_bg>0] = cv.GC_BGD
    trimap[sure_fg>0] = cv.GC_FGD
    # фиксируем жёстко рамку фоном
    bd=20; trimap[:bd,:]=0; trimap[-bd:,:]=0; trimap[:,:bd]=0; trimap[:,-bd:]=0
    return trimap

def _rect_from_percent(h,w, margin=0.1):
    dx=int(w*margin); dy=int(h*margin)
    return (dx,dy,w-2*dx,h-2*dy)

# ============= сегментация/доводка =============
def _grabcut_with_mask(img, trimap, iters=6):
    m = trimap.copy()
    bg, fg = np.zeros((1,65), np.float64), np.zeros((1,65), np.float64)
    cv.grabCut(img, m, None, bg, fg, iters, mode=cv.GC_INIT_WITH_MASK)
    return np.where((m==cv.GC_FGD)|(m==cv.GC_PR_FGD), 255, 0).astype(np.uint8)

def _grabcut_with_rect(img, rect, iters=5):
    m = np.full(img.shape[:2], cv.GC_PR_BGD, np.uint8)
    x,y,w,h = rect
    m[y:y+h, x:x+w] = cv.GC_PR_FGD
    bg, fg = np.zeros((1,65), np.float64), np.zeros((1,65), np.float64)
    cv.grabCut(img, m, rect, bg, fg, iters, mode=cv.GC_INIT_WITH_RECT)
    return np.where((m==cv.GC_FGD)|(m==cv.GC_PR_FGD), 255, 0).astype(np.uint8)

def _superpixel_vote(img, mask, region_size=26, ruler=10.0):
    try:
        slic = cv.ximgproc.createSuperpixelSLIC(img, algorithm=cv.ximgproc.SLIC, region_size=region_size, ruler=ruler)
        slic.iterate(10)
        labels = slic.getLabels()
        out = mask.copy().astype(np.uint8)
        for i in range(labels.max()+1):
            m = (labels==i)
            out[m] = 255 if np.mean(mask[m])>127 else 0
        return out
    except Exception:
        return mask

def _crf(img, alpha):
    try:
        import pydensecrf.densecrf as dcrf
        from pydensecrf.utils import unary_from_softmax, create_pairwise_bilateral, create_pairwise_gaussian
    except Exception:
        return alpha
    h,w = alpha.shape
    p1 = np.clip(alpha.astype(np.float32)/255.0, 1e-6, 1-1e-6)
    unary = unary_from_softmax(np.vstack([1-p1, p1]))
    d = dcrf.DenseCRF2D(w,h,2)
    d.setUnaryEnergy(unary)
    d.addPairwiseEnergy(create_pairwise_gaussian(sdims=(3,3), shape=(h,w)), compat=3)
    d.addPairwiseEnergy(create_pairwise_bilateral(sdims=(50,50), schan=(10,10,10), img=img, chdim=2), compat=5)
    Q = d.inference(5)
    return (np.array(Q)[1].reshape(h,w)*255).astype(np.uint8)

def _guided_in_band(img, alpha, band_px=6):
    k = cv.getStructuringElement(cv.MORPH_ELLIPSE,(band_px*2+1, band_px*2+1))
    inner = cv.erode(alpha, k); outer = cv.dilate(alpha, k)
    band = cv.subtract(outer, inner)
    af = alpha.astype(np.float32)/255.0
    try:
        ref = cv.ximgproc.guidedFilter(guide=img, src=af, radius=8, eps=1e-3)
        af[band>0] = ref[band>0]
        return (np.clip(af,0,1)*255).astype(np.uint8)
    except Exception:
        return alpha

# ============= деконтаминация цвета (бережно, по краю) =============
def _decontam_chroma_edge(img, alpha, band=4, strength=0.85):
    k = cv.getStructuringElement(cv.MORPH_ELLIPSE,(band*2+1, band*2+1))
    inner = cv.erode(alpha, k); outer = cv.dilate(alpha, k)
    ring = cv.subtract(outer, inner)
    if ring.max()==0: return img
    ycc = cv.cvtColor(img, cv.COLOR_BGR2YCrCb).astype(np.float32)
    m = cv.mean(img, ring)[:3]
    bgc = cv.cvtColor(np.uint8([[m]]), cv.COLOR_BGR2YCrCb)[0,0].astype(np.float32)
    a = (alpha/255.0).astype(np.float32)
    Y,Cr,Cb = ycc[...,0], ycc[...,1], ycc[...,2]
    Cr_fix = (Cr-(1.0-a)*bgc[1])/np.maximum(a,1e-3)
    Cb_fix = (Cb-(1.0-a)*bgc[2])/np.maximum(a,1e-3)
    Cr_out = Cr*(1.0-strength)+Cr_fix*strength
    Cb_out = Cb*(1.0-strength)+Cb_fix*strength
    out = np.stack([Y,Cr_out,Cb_out],-1)
    bgr = cv.cvtColor(np.clip(out,0,255).astype(np.uint8), cv.COLOR_YCrCb2BGR)
    res = img.copy(); res[ring>0] = bgr[ring>0]
    return res

def _premultiply(bgr, alpha):
    a = (alpha/255.0)[...,None].astype(np.float32)
    pm = (bgr.astype(np.float32)*a).astype(np.uint8)
    return cv.merge([pm[...,0], pm[...,1], pm[...,2], alpha])

# ============= оценка качества масок и ансамбль =============
def _mask_scores(img_bgr, alpha):
    H,W = alpha.shape
    fg = (alpha>127).astype(np.uint8)*255
    gray = cv.cvtColor(img_bgr, cv.COLOR_BGR2GRAY)
    edges = _canny(gray)
    k = cv.getStructuringElement(cv.MORPH_ELLIPSE,(7,7))
    inner = cv.erode(fg, k); outer = cv.dilate(fg, k); band = cv.subtract(outer, inner)
    # протечка фона
    leak = cv.bitwise_and(edges, cv.bitwise_not(fg)).sum()/(255.0*H*W)
    # прилегание к краям (в полосе)
    on_edge = cv.bitwise_and(edges, band)
    cut = on_edge.sum()/(255.0*(band.sum()/255.0+1e-6))
    # дырки
    filled = cv.morphologyEx(fg, cv.MORPH_CLOSE, cv.getStructuringElement(cv.MORPH_ELLIPSE,(5,5)))
    holes = max(0, (filled.sum()-fg.sum())/(255.0*H*W))
    return dict(leak=leak, cut=cut, holes=holes)

def _score(s):  # меньше — лучше
    return 2.2*s['leak'] + 1.0*s['holes'] - 0.9*s['cut']

def _fuse_two(a1, a2, img_bgr):
    # локальное слияние по краевому доверию
    edges = _canny(cv.cvtColor(img_bgr, cv.COLOR_BGR2GRAY)).astype(np.float32)/255.0
    w = cv.GaussianBlur(edges, (0,0), 2.5)
    w = np.clip(w, 0.2, 0.8)
    return (a1.astype(np.float32)*w + a2.astype(np.float32)*(1.0-w)).astype(np.uint8)

# ============= KMeans-фон (fallback) =============
def _kmeans_ab_fg(img_bgr, K=2):
    lab = cv.cvtColor(img_bgr, cv.COLOR_BGR2Lab)
    ab = lab[...,1:].reshape(-1,2).astype(np.float32)
    crit = (cv.TERM_CRITERIA_EPS+cv.TERM_CRITERIA_MAX_ITER, 50, 0.5)
    _, labels, centers = cv.kmeans(ab, K, None, crit, 3, cv.KMEANS_PP_CENTERS)
    h,w = lab.shape[:2]
    labels = labels.reshape(h,w)
    # фон — тот кластер, который больше касается границ
    border = np.zeros((h,w), np.uint8); border[:5,:]=1; border[-5:,:]=1; border[:,:5]=1; border[:,-5:]=1
    scores=[np.sum((labels==i)&(border==1)) for i in range(K)]
    bg_id=int(np.argmax(scores))
    fg = (labels!=bg_id).astype(np.uint8)*255
    return fg

# ============= ОСНОВНОЕ API =============
def remove_background_ai(
    img_bgr,
    model="auto",  # Игнорируется в классическом режиме
    alpha_matting=True,  # Игнорируется
    am_foreground_threshold=255,  # Игнорируется
    am_background_threshold=10,  # Игнорируется
    am_erosion_size=5,  # Игнорируется
    post_shrink_px=1,  # Игнорируется
    max_side=1600,
    prefer_human=True,  # Игнорируется
    scene_hint=None  # Игнорируется
):
    """
    Энсамбль из 6 кандидатов + авто-выбор лучшего + доводка.
    Возвращает: rgba, alpha, mask
    """
    h0,w0 = img_bgr.shape[:2]
    work, sc = _resize_keep(img_bgr, max_side)
    gray = cv.cvtColor(work, cv.COLOR_BGR2GRAY)

    sal = _saliency_fused(gray)
    bgp = _bg_prior_by_border_kmeans(work)

    # --- 1) Несколько trimap-инициализаций ---
    trimaps = [
        _auto_trimap(sal, bgp, fg_q=0.90, bg_thr=0.55),  # базовый
        _auto_trimap(sal, bgp, fg_q=0.88, bg_thr=0.50),  # более агрессивный FG
        _auto_trimap(sal, bgp, fg_q=0.94, bg_thr=0.60),  # более агрессивный BG
    ]
    cand = []
    for tm in trimaps:
        m = _grabcut_with_mask(work, tm, iters=6)
        m = _superpixel_vote(work, m, region_size=26, ruler=10.0)
        cand.append(m)

    # --- 2) Прямоугольный GrabCut (на случай плохой saliency) ---
    rect = _rect_from_percent(*work.shape[:2], margin=0.12)
    m_rect = _grabcut_with_rect(work, rect, iters=5)
    m_rect = _superpixel_vote(work, m_rect, region_size=30, ruler=12.0)
    cand.append(m_rect)

    # --- 3) KMeans по a*b (фон = кластер рамки) ---
    m_km = _kmeans_ab_fg(work, K=2)
    m_km = _superpixel_vote(work, m_km, region_size=24, ruler=8.0)
    cand.append(m_km)

    # --- 4) CRF + guided для каждого кандидата ---
    refined = []
    for m in cand:
        a = _crf(work, m)
        a = _guided_in_band(work, a, band_px=6)
        a = cv.erode(a, cv.getStructuringElement(cv.MORPH_ELLIPSE,(3,3)))  # 1px внутрь — убрать ореол
        refined.append(a)

    # --- 5) Выбор лучшего и мягкое слияние с 2-м лучшим ---
    scores = [(_score(_mask_scores(work, a)), idx) for idx,a in enumerate(refined)]
    scores.sort(key=lambda x:x[0])  # меньше — лучше
    best = refined[scores[0][1]]
    second = refined[scores[1][1]]
    fused = _fuse_two(best, second, work)

    # --- 6) Апскейл к оригиналу ---
    alpha = fused if sc==1.0 else cv.resize(fused, (w0,h0), cv.INTER_CUBIC)

    # --- 7) Хрома-деконтаминация только на краю + выходы ---
    clean = _decontam_chroma_edge(img_bgr, alpha, band=4, strength=0.85)
    rgba = cv.merge([clean[...,0], clean[...,1], clean[...,2], alpha])
    mask = (alpha>127).astype(np.uint8)*255

    return rgba, alpha, mask

# Для совместимости с app.py
REMBG_OK = False  # Классический режим не использует rembg