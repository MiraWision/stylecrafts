#!/usr/bin/env python3
"""
Python сервер для обработки изображений
- Векторизация: SLIC Superpixels + Merge вместо простого K-means
- Удаление фона: AI (rembg) + Classic (Saliency + GrabCut) fallback
"""

import cv2 as cv
import numpy as np
import json
import base64
import io
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

# Импортируем наши модули
from vectorization import vectorize_logo, VectorizeOptions
from background_removal import remove_background_keep_subject
from ai_background_removal import remove_background_ai, REMBG_OK

app = Flask(__name__)
CORS(app)

# ---------- API эндпоинты ----------

@app.route('/health', methods=['GET'])
def health():
    """Проверка состояния сервера"""
    return jsonify({
        "status": "ok",
        "message": "Python image processing server is running",
        "features": ["vectorization", "background-removal"],
        "rembg_available": REMBG_OK,
        "version": "2.0.0"
    })

@app.route('/vectorize', methods=['POST'])
def vectorize():
    """Векторизация изображения в SVG"""
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        # Получаем параметры
        params = data.get('params', {})
        smooth = params.get('smooth', 'bilateral')
        slic_region = params.get('slic_region', 18)
        slic_ruler = params.get('slic_ruler', 12.0)
        min_element_size = params.get('min_element_size', 25)
        color_thresh = params.get('color_thresh', 7.0)
        min_region_px = params.get('min_region_px', 600)
        with_text_preserve = params.get('with_text_preserve', True)
        with_lines_preserve = params.get('with_lines_preserve', True)
        stroke_outline = params.get('stroke_outline', False)
        smoothing_level = params.get('smoothing_level', 1)
        with_animation = params.get('with_animation', True)

        # Декодируем изображение
        image_data = data['image']
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        img_bgr = cv.cvtColor(np.array(image), cv.COLOR_RGB2BGR)

        # Векторизация с новым API
        options = VectorizeOptions(
            prefer_vtracer=True,
            k_colors=6,
            do_geom_post=True
        )
        svg_result = vectorize_logo(image_bytes, options)

        return jsonify({
            'success': True,
            'svg': svg_result,
            'params_used': {
                'prefer_vtracer': True,
                'k_colors': 6,
                'do_geom_post': True
            }
        })

    except Exception as e:
        print(f"Error in vectorize: {e}")
        print(traceback.format_exc())
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Vectorization failed"
        }), 500

@app.route('/remove-background', methods=['POST'])
def remove_background():
    """Удаление фона с изображения (AI + Classic fallback)"""
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        params = data.get('params', {}) or {}
        mode = params.get('mode', 'ai' if REMBG_OK else 'classic')

        # Декодируем изображение
        image_data = data['image']
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGBA')
        # Если RGBA — переводим в BGR (без альфы)
        if image.mode == 'RGBA':
            bg = Image.new('RGB', image.size, (255,255,255))
            bg.paste(image, mask=image.split()[3])
            image = bg
        img_bgr = cv.cvtColor(np.array(image), cv.COLOR_RGB2BGR)

        if mode == 'ai':
            # Классический OpenCV режим (без AI моделей)
            rgba, alpha, hard_mask = remove_background_ai(
                img_bgr,
                model=params.get('model','auto'),
                alpha_matting=bool(params.get('alpha_matting', True)),
                am_foreground_threshold=int(params.get('am_foreground_threshold',255)),
                am_background_threshold=int(params.get('am_background_threshold',10)),
                am_erosion_size=int(params.get('am_erosion_size',5)),
                post_shrink_px=int(params.get('post_shrink_px',1)),
                max_side=int(params.get('max_side',1600)),
                prefer_human=bool(params.get('prefer_human', True)),
                scene_hint=params.get('scene_hint', None)
            )
        else:
            # Classic mode
            rgba, alpha, hard_mask = remove_background_keep_subject(
                img_bgr,
                saliency_threshold=float(params.get('saliency_threshold',0.08)),
                inner_margin=int(params.get('inner_margin',18)),
                outer_margin=int(params.get('outer_margin',30)),
                grabcut_iters=int(params.get('grabcut_iters',10)),
                alpha_feather=int(params.get('alpha_feather',18)),
                max_side=int(params.get('max_side',1600))
            )

    except Exception as e:
        # Если AI упал — мягкий fallback на classic
        if REMBG_OK and params.get('mode','ai') == 'ai':
            try:
                rgba, alpha, hard_mask = remove_background_keep_subject(img_bgr)
            except Exception:
                print("Fallback classic also failed:", traceback.format_exc())
                return jsonify({'success': False, 'error': str(e)}), 500
        else:
            print("Error:", traceback.format_exc())
            return jsonify({'success': False, 'error': str(e)}), 500

    # encode results
    def enc_png(arr):
        _, buffer = cv.imencode('.png', arr)
        return "data:image/png;base64," + base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        'success': True,
        'mode_used': mode,
        'rgba': enc_png(rgba),
        'alpha': enc_png(alpha),
        'mask': enc_png(hard_mask)
    })

if __name__ == '__main__':
    print("Starting Python image processing server 2.0...")
    print("Features: Vectorization + Background Removal (AI + Classic)")
    print(f"AI Background Removal: {'Available' if REMBG_OK else 'Not Available'}")
    print("Make sure you have opencv-contrib-python installed:")
    print("pip install opencv-contrib-python")
    print("For AI mode: pip install rembg onnxruntime")
    print("Endpoints:")
    print("  - POST /vectorize (port 5005)")
    print("  - POST /remove-background (port 5005) - AI mode by default")
    print("  - GET /health")
    app.run(host='0.0.0.0', port=5005, debug=True)