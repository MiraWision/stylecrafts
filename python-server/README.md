# Python Image Processing Server

Сервер для обработки изображений с поддержкой векторизации и удаления фона.

## Возможности

- **Векторизация изображений** - преобразование растровых изображений в SVG с использованием SLIC Superpixels
- **Удаление фона** - классический OpenCV подход с saliency + grabcut + superpixels + CRF

## Установка

1. Создайте виртуальную среду:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Запустите сервер:
```bash
python app.py
```

Сервер будет доступен по адресу `http://localhost:5002`

## API Endpoints

### GET /health
Проверка состояния сервера

**Ответ:**
```json
{
  "status": "ok",
  "message": "Python image processing server is running",
  "features": ["vectorization", "background-removal"],
  "rembg_available": false,
  "version": "2.0.0"
}
```

### POST /vectorize
Векторизация изображения в SVG

**Параметры:**
- `image` (string) - изображение в base64
- `params` (object) - параметры векторизации:
  - `max_superpixels` (int, default: 400) - максимальное количество суперпикселей
  - `compactness` (float, default: 10.0) - компактность суперпикселей
  - `merge_threshold` (float, default: 0.3) - порог слияния регионов
  - `min_region_area` (int, default: 100) - минимальная площадь региона
  - `edge_threshold` (float, default: 0.1) - порог обнаружения краев
  - `text_threshold` (float, default: 0.5) - порог обнаружения текста
  - `line_threshold` (float, default: 0.3) - порог обнаружения линий
  - `approx_epsilon` (float, default: 0.02) - точность аппроксимации контуров

**Ответ:**
```json
{
  "success": true,
  "svg": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>..."
}
```

### POST /remove-background
Удаление фона с изображения (OpenCV классический подход)

**Параметры:**
- `image` (string) - изображение в base64
- `params` (object) - параметры удаления фона:
  - `mode` (string, default: "ai") - режим: "ai" (OpenCV) или "classic"
  - `max_side` (int, default: 1600) - максимальная сторона для обработки

**Ответ:**
```json
{
  "success": true,
  "mode_used": "ai",
  "rgba": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "alpha": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "mask": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## Алгоритм удаления фона

1. **Комбинированная карта заметности** - объединение FineGrained и SpectralResidual saliency
2. **Фон-приор по бордюрам** - K-means кластеризация цветов рамки изображения
3. **Автоматический trimap** - создание маски объект/фон/неизвестно
4. **GrabCut сегментация** - итеративная сегментация с использованием trimap
5. **Superpixel голосование** - уточнение маски на основе SLIC суперпикселей
6. **CRF доводка** - Conditional Random Fields для улучшения краев
7. **Guided filter** - сглаживание в короне вокруг объекта
8. **Chroma decontamination** - удаление цветового подсоса фона

## Примеры использования

### Векторизация
```bash
curl -X POST http://localhost:5002/vectorize \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "params": {
      "max_superpixels": 500,
      "compactness": 15.0
    }
  }'
```

### Удаление фона
```bash
curl -X POST http://localhost:5002/remove-background \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "params": {
      "mode": "ai",
      "max_side": 1600
    }
  }'
```

## Требования

- Python 3.8+
- OpenCV 4.8+ (с contrib модулями)
- Flask 2.3+
- pydensecrf (опционально, для улучшения краев)

## Примечания

- Классический подход не требует AI моделей
- Для лучшего качества используйте изображения высокого разрешения
- CRF улучшает качество краев, но требует дополнительной зависимости
- Алгоритм работает стабильно на различных типах изображений
