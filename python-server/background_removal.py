#!/usr/bin/env python3
"""
Модуль удаления фона с изображений с использованием Saliency + GrabCut + Soft Alpha
"""

import cv2 as cv
import numpy as np

def _resize_for_speed(img, max_side=1024):
    """Масштабирование для ускорения обработки"""
    h, w = img.shape[:2]
    s = max(h, w)
    if s <= max_side:
        return img, 1.0
    scale = max_side / float(s)
    img_small = cv.resize(img, (int(w*scale), int(h*scale)), interpolation=cv.INTER_AREA)
    return img_small, scale

def _static_saliency(gray):
    """Универсальная оценка заметности"""
    sal = cv.saliency.StaticSaliencyFineGrained_create()
    ok, saliency = sal.computeSaliency(gray)
    if not ok:
        # запасной путь (Sobel+морфология)
        gx = cv.Sobel(gray, cv.CV_32F, 1, 0, ksize=3)
        gy = cv.Sobel(gray, cv.CV_32F, 0, 1, ksize=3)
        saliency = cv.magnitude(gx, gy)
        saliency = (255 * (saliency / (saliency.max() + 1e-6))).astype(np.uint8)
    else:
        saliency = (saliency * 255).astype(np.uint8)
    saliency = cv.GaussianBlur(saliency, (0, 0), 3)
    return saliency

def _pick_main_component(bin_mask, saliency, center_bias=0.35):
    """Выбираем главный объект по компонентам связности"""
    h, w = bin_mask.shape
    num, labels, stats, centroids = cv.connectedComponentsWithStats(bin_mask, connectivity=8)
    if num <= 1:
        return bin_mask

    cy, cx = h/2.0, w/2.0
    def norm_dist2(x, y):
        dx = (x - cx) / w
        dy = (y - cy) / h
        return dx*dx + dy*dy

    best_score, best_id = -1, 0
    for i in range(1, num):
        x, y, ww, hh, area = stats[i]
        if area < 0.0001 * w * h:  # Максимально мягкий порог для мелких объектов
            continue
        comp_mask = (labels == i).astype(np.uint8)
        mean_sal = float(cv.mean(saliency, comp_mask)[0]) / 255.0
        cx_i, cy_i = centroids[i]
        center_weight = np.exp(-norm_dist2(cx_i, cy_i) / (2 * (0.3**2)))  # Максимально широкое распределение
        
        # Максимальный бонус за размер (большие объекты предпочтительнее)
        size_bonus = min(5.0, area / (0.02 * w * h))  # Максимальный бонус за размер
        
        # Максимально консервативная формула - приоритет размеру и центру
        score = area * (0.1 + 0.9*mean_sal) * (1.0 + center_bias*center_weight) * size_bonus
        if score > best_score:
            best_score, best_id = score, i

    main = (labels == best_id).astype(np.uint8) * 255
    return main

def _make_trimap(fg_mask, inner_margin=5, outer_margin=8):
    """Создание trimap для GrabCut"""
    fg = (fg_mask > 0).astype(np.uint8)
    bg = 1 - fg

    sure_fg = cv.erode(fg, cv.getStructuringElement(cv.MORPH_ELLIPSE, (inner_margin*2+1, inner_margin*2+1)))
    sure_bg = cv.erode(bg, cv.getStructuringElement(cv.MORPH_ELLIPSE, (outer_margin*2+1, outer_margin*2+1)))

    trimap = np.full(fg.shape, cv.GC_PR_BGD, np.uint8)
    trimap[sure_bg == 1] = cv.GC_BGD
    trimap[sure_fg == 1] = cv.GC_FGD

    trimap = cv.medianBlur(trimap, 3)
    return trimap

def _grabcut_with_trimap(img_bgr, trimap, iters=5):
    """GrabCut с использованием trimap"""
    mask = trimap.copy()
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    cv.grabCut(img_bgr, mask, None, bgdModel, fgdModel, iters, mode=cv.GC_INIT_WITH_MASK)
    fg_mask = np.where((mask == cv.GC_FGD) | (mask == cv.GC_PR_FGD), 255, 0).astype(np.uint8)
    return fg_mask

def _refine_alpha(color, hard_mask, radius=5):
    """Создание максимально мягкой альфа-кромки"""
    hard = (hard_mask > 0).astype(np.uint8) * 255
    
    # Используем максимально мягкие ядра
    kernel_small = cv.getStructuringElement(cv.MORPH_ELLIPSE, (radius//2+1, radius//2+1))
    kernel_large = cv.getStructuringElement(cv.MORPH_ELLIPSE, (radius*4+1, radius*4+1))
    
    inner = cv.erode(hard, kernel_small)
    outer = cv.dilate(hard, kernel_large)
    band = cv.subtract(outer, inner)

    # Максимально точные distance transforms
    dist_in = cv.distanceTransform(255 - inner, cv.DIST_L2, 5)
    dist_out = cv.distanceTransform(255 - (255 - outer), cv.DIST_L2, 5)
    eps = 1e-6
    alpha = np.zeros_like(hard, dtype=np.float32)
    alpha[inner > 0] = 1.0
    band_idx = band > 0
    
    # Максимально плавный переход
    if np.any(band_idx):
        alpha[band_idx] = np.power(dist_out[band_idx] / (dist_out[band_idx] + dist_in[band_idx] + eps), 0.5)

    try:
        # Максимально агрессивный guided filter
        gf = cv.ximgproc.guidedFilter(guide=color, src=alpha, radius=16, eps=1e-2)
        alpha = gf
    except Exception:
        a8 = np.clip(alpha * 255, 0, 255).astype(np.uint8)
        # Максимально мягкий bilateral filter
        a8 = cv.bilateralFilter(a8, d=15, sigmaColor=120, sigmaSpace=120)
        alpha = a8.astype(np.float32) / 255.0

    # Множественное сглаживание для максимальной мягкости
    alpha = cv.GaussianBlur(alpha, (0, 0), 3.0)
    alpha = cv.medianBlur((alpha * 255).astype(np.uint8), 5).astype(np.float32) / 255.0
    alpha = cv.GaussianBlur(alpha, (0, 0), 2.0)
    alpha = np.clip(alpha, 0.0, 1.0)
    return (alpha * 255).astype(np.uint8)

def remove_background_keep_subject(
    img_bgr,
    saliency_threshold=0.08,  # Максимально агрессивное определение объекта
    inner_margin=18,          # Максимально большая уверенная зона объекта
    outer_margin=30,          # Максимально большая уверенная зона фона
    grabcut_iters=10,         # Максимально много итераций
    alpha_feather=18,         # Максимально мягкая кромка
    max_side=1600
):
    """
    Основная функция удаления фона
    
    Возвращает (rgba_png, alpha, hard_mask):
      - rgba_png: BGR с альфа-каналом (прозрачный фон)
      - alpha: 8-битная альфа (0..255)
      - hard_mask: двоичная маска объекта (0/255)
    """
    # масштабируем для скорости, но альфу вернем к исходному размеру
    small, scale = _resize_for_speed(img_bgr, max_side=max_side)
    small_gray = cv.cvtColor(small, cv.COLOR_BGR2GRAY)

    # 1) Saliency → грубая карта интереса
    sal = _static_saliency(small_gray)

    # 2) Бинаризация saliency, оставляем главный компонент
    thr = int(np.clip(saliency_threshold, 0, 1) * 255)
    bin0 = (sal > thr).astype(np.uint8) * 255
    
    # Максимально мягкая морфология для сохранения деталей
    bin0 = cv.morphologyEx(bin0, cv.MORPH_OPEN, cv.getStructuringElement(cv.MORPH_ELLIPSE, (2,2)))
    bin0 = cv.morphologyEx(bin0, cv.MORPH_CLOSE, cv.getStructuringElement(cv.MORPH_ELLIPSE, (3,3)))
    
    bin_main = _pick_main_component(bin0, sal, center_bias=0.8)  # Максимальное предпочтение центру
    
    # Дополнительная защита: если объект слишком маленький, расширяем его
    obj_area = np.sum(bin_main > 0)
    total_area = bin_main.shape[0] * bin_main.shape[1]
    if obj_area < 0.1 * total_area:  # Если объект меньше 10% кадра
        # Расширяем объект для защиты от обрезания
        kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, (15, 15))
        bin_main = cv.dilate(bin_main, kernel)

    # 3) Trimap (FG/BG/Unknown)
    trimap = _make_trimap(bin_main, inner_margin=inner_margin, outer_margin=outer_margin)

    # 4) GrabCut c trimap
    gc_mask = _grabcut_with_trimap(small, trimap, iters=grabcut_iters)

    # 5) Мягкая альфа
    alpha_small = _refine_alpha(small, gc_mask, radius=alpha_feather)

    # 6) Возвращаемся к исходному размеру
    h0, w0 = img_bgr.shape[:2]
    alpha = cv.resize(alpha_small, (w0, h0), interpolation=cv.INTER_LINEAR)
    hard_mask = (alpha > 127).astype(np.uint8) * 255

    # 7) Формируем RGBA
    b, g, r = cv.split(img_bgr)
    rgba = cv.merge([b, g, r, alpha])
    return rgba, alpha, hard_mask
