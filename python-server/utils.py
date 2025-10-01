#!/usr/bin/env python3
"""
Утилиты для обработки изображений
"""

import cv2 as cv
import numpy as np
from math import sqrt
from collections import defaultdict

def bgr2lab(img_bgr):
    """Конвертация BGR в LAB"""
    return cv.cvtColor(img_bgr, cv.COLOR_BGR2LAB)

def lab2bgr(img_lab):
    """Конвертация LAB в BGR"""
    return cv.cvtColor(img_lab, cv.COLOR_LAB2BGR)

def deltaE76(lab1, lab2):
    """Вычисление цветового расстояния в Lab пространстве"""
    diff = lab1.astype(np.float32) - lab2.astype(np.float32)
    return float(np.sqrt((diff**2).sum()))

def edge_aware_smooth(img_bgr, flag="bilateral"):
    """Edge-aware сглаживание для сохранения границ"""
    if flag == "edgepreserve":
        return cv.edgePreservingFilter(img_bgr, flags=1, sigma_s=60, sigma_r=0.4)
    elif flag == "bilateral":
        out = img_bgr.copy()
        for _ in range(2):
            out = cv.bilateralFilter(out, d=9, sigmaColor=50, sigmaSpace=50)
        return out
    else:
        return img_bgr

def clahe_l(img_bgr, clip=2.0, tiles=8):
    """Улучшение контраста в L канале"""
    lab = bgr2lab(img_bgr)
    L, a, b = cv.split(lab)
    clahe = cv.createCLAHE(clipLimit=clip, tileGridSize=(tiles, tiles))
    L2 = clahe.apply(L)
    lab2 = cv.merge([L2, a, b])
    return lab2

def build_adjacency(labels):
    """Построение графа соседства суперпикселей"""
    h, w = labels.shape
    adj = defaultdict(set)
    
    # По строкам
    a = labels[:, :-1]
    b = labels[:, 1:]
    mask = a != b
    ys, xs = np.where(mask)
    for y, x in zip(ys, xs):
        l1, l2 = int(labels[y, x]), int(labels[y, x+1])
        adj[l1].add(l2)
        adj[l2].add(l1)
    
    # По столбцам
    a = labels[:-1, :]
    b = labels[1:, :]
    mask = a != b
    ys, xs = np.where(mask)
    for y, x in zip(ys, xs):
        l1, l2 = int(labels[y, x]), int(labels[y+1, x])
        adj[l1].add(l2)
        adj[l2].add(l1)
    
    return adj

class DSU:
    """Disjoint Set Union для эффективного слияния регионов"""
    def __init__(self, n):
        self.p = list(range(n))
        self.sz = [1] * n
    
    def find(self, x):
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]
            x = self.p[x]
        return x
    
    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.sz[a] < self.sz[b]:
            a, b = b, a
        self.p[b] = a
        self.sz[a] += self.sz[b]
        return True

def compute_region_stats(img_lab, labels, n_labels):
    """Вычисление средних цветов и размеров регионов"""
    h, w = labels.shape
    L, A, B = cv.split(img_lab)
    stats = {
        i: {"sum": np.zeros(3, np.float64), "count": 0}
        for i in range(n_labels)
    }
    
    flat_labels = labels.reshape(-1)
    flat_L = L.reshape(-1)
    flat_A = A.reshape(-1)
    flat_B = B.reshape(-1)
    
    for lab, l, a, b in zip(flat_labels, flat_L, flat_A, flat_B):
        st = stats[int(lab)]
        st["sum"] += np.array([l, a, b], dtype=np.float64)
        st["count"] += 1
    
    means = {}
    for i in range(n_labels):
        c = stats[i]["count"]
        if c == 0:
            means[i] = np.array([0, 128, 128], dtype=np.float32)
        else:
            means[i] = (stats[i]["sum"] / c).astype(np.float32)
    
    return means, {i: stats[i]["count"] for i in range(n_labels)}

def rgb_from_lab(lab_mean):
    """Конвертация Lab в RGB"""
    patch = np.uint8([[lab_mean]])
    bgr = lab2bgr(patch)[0, 0].tolist()
    r, g, b = int(bgr[2]), int(bgr[1]), int(bgr[0])
    return r, g, b
