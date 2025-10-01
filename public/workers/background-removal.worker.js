/* public/workers/background-removal.worker.js */
/* global self, importScripts */

let cvInitPromise = null;

function loadOpenCV() {
  if (cvInitPromise) {
    console.log('[Background Removal Worker] Returning existing promise');
    return cvInitPromise;
  }

  console.log('[Background Removal Worker] Starting OpenCV initialization...');

  const origin = self.location.origin; // e.g. http://localhost:3000
  const basePath = ''; // если у Next есть basePath — укажи здесь, напр. '/app'

  console.log('[Background Removal Worker] Origin:', origin, 'BasePath:', basePath);

  // 1) Задаём Module и указываем где лежит wasm
  self.Module = self.Module || {};

  // locateFile: переназначаем путь к wasm
  self.Module.locateFile = (path) => {
    // если запрошен стандартный opencv_js.wasm — подсовываем наш opencv.wasm
    let finalPath = path === 'opencv_js.wasm' ? 'opencv.wasm' : path;
    const url = `${origin}${basePath}/opencv/${finalPath}`;

    console.log('[Background Removal Worker] locateFile called for:', path, '->', url);

    return url;
  };

  // базовые обработчики для логов Module
  self.Module.printErr = (msg) => {
    try {
      console.warn('[Background Removal Worker] Error:', msg);
    } catch {}
  };

  self.Module.onAbort = (reason) => {
    console.error('[Background Removal Worker] Aborted:', reason);
  };

  // 2) Грузим opencv.js
  try {
    const opencvUrl = `${origin}${basePath}/opencv/opencv.js`;
    console.log('[Background Removal Worker] Importing script from:', opencvUrl);
    importScripts(opencvUrl);
    console.log('[Background Removal Worker] Script imported successfully');

    // Проверяем, появился ли cv
    console.log('[Background Removal Worker] After import:', {
      hasCv: !!self.cv,
      cvType: typeof self.cv,
      hasMat: !!(self.cv && self.cv.Mat),
      cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
      hasOnRuntimeInitialized:
        !!(self.cv && typeof self.cv.onRuntimeInitialized === 'function'),
    });

    // Некоторые сборки OpenCV экспортируют функцию, которую надо вызвать
    if (typeof self.cv === 'function') {
      console.log('[Background Removal Worker] cv is a function, trying to call it...');
      try {
        self.cv = self.cv();
        console.log('[Background Removal Worker] After calling cv():', {
          hasCv: !!self.cv,
          cvType: typeof self.cv,
          hasMat: !!(self.cv && self.cv.Mat),
          cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
        });
      } catch (e) {
        console.error('[Background Removal Worker] Failed to call cv():', e);
      }
    }
  } catch (e) {
    console.error('[Background Removal Worker] Failed to import script:', e);
    throw new Error(
      'importScripts(opencv.js) failed: ' + (e && e.message ? e.message : e)
    );
  }

  // 3) Ждём готовности рантайма
  cvInitPromise = new Promise((resolve, reject) => {
    console.log('[Background Removal Worker] Creating Promise for OpenCV initialization...');

    const timeout = setTimeout(() => {
      console.error('[Background Removal Worker] Timeout waiting for OpenCV initialization');
      console.error('[Background Removal Worker] Current state:', {
        hasModule: !!self.Module,
        hasCv: !!self.cv,
        moduleKeys: self.Module ? Object.keys(self.Module) : [],
        cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
      });
      reject(new Error('OpenCV init timeout (wasm likely not found)'));
    }, 30000);

    self.Module.onRuntimeInitialized = () => {
      console.log('[Background Removal Worker] Module.onRuntimeInitialized called - OpenCV ready!');

      // Пытаемся определить корректный объект cv
      let cvObj = null;

      // 1) уже есть self.cv
      if (self.cv && typeof self.cv.Mat === 'function') {
        cvObj = self.cv;
        console.log('[Background Removal Worker] Found cv in self.cv');
      }
      // 2) сборка положила cv внутрь Module
      else if (self.Module && self.Module.cv && typeof self.Module.cv.Mat === 'function') {
        cvObj = self.Module.cv;
        self.cv = cvObj;
        console.log('[Background Removal Worker] Found cv in Module.cv');
      }
      // 3) глобальная переменная cv
      else if (typeof cv !== 'undefined' && typeof cv.Mat === 'function') {
        cvObj = cv; // eslint-disable-line no-undef
        self.cv = cvObj;
        console.log('[Background Removal Worker] Found cv in global cv');
      }
      // 4) крайний случай: функции доступны на Module (создаём псевдо-cv из Module)
      else if (self.Module && typeof self.Module.Mat === 'function') {
        cvObj = {
          // классы/функции
          Mat: self.Module.Mat,
          MatVector: self.Module.MatVector,
          Size: self.Module.Size,
          TermCriteria: self.Module.TermCriteria,

          // фабрики/алгоритмы
          matFromArray: self.Module.matFromArray,
          cvtColor: self.Module.cvtColor,
          GaussianBlur: self.Module.GaussianBlur,
          Canny: self.Module.Canny,
          findContours: self.Module.findContours,
          approxPolyDP: self.Module.approxPolyDP,
          contourArea: self.Module.contourArea,
          arcLength: self.Module.arcLength,
          morphologyEx: self.Module.morphologyEx,
          kmeans: self.Module.kmeans,
          floodFill: self.Module.floodFill,
          inRange: self.Module.inRange,
          bitwise_and: self.Module.bitwise_and,
          bitwise_not: self.Module.bitwise_not,
          threshold: self.Module.threshold,

          // константы
          CV_8UC4: self.Module.CV_8UC4,
          CV_32FC3: self.Module.CV_32FC3,
          CV_8U: self.Module.CV_8U,
          COLOR_RGBA2RGB: self.Module.COLOR_RGBA2RGB,
          COLOR_RGB2GRAY: self.Module.COLOR_RGB2GRAY,
          BORDER_DEFAULT: self.Module.BORDER_DEFAULT,
          TERM_CRITERIA_EPS: self.Module.TERM_CRITERIA_EPS,
          TERM_CRITERIA_MAX_ITER: self.Module.TERM_CRITERIA_MAX_ITER,
          KMEANS_PP_CENTERS: self.Module.KMEANS_PP_CENTERS,
          RETR_EXTERNAL: self.Module.RETR_EXTERNAL,
          CHAIN_APPROX_SIMPLE: self.Module.CHAIN_APPROX_SIMPLE,
          MORPH_CLOSE: self.Module.MORPH_CLOSE,
          THRESH_BINARY: self.Module.THRESH_BINARY,
          FLOODFILL_FIXED_RANGE: self.Module.FLOODFILL_FIXED_RANGE,
        };
        self.cv = cvObj;
        console.log('[Background Removal Worker] Created cv from Module functions');
      }

      if (cvObj && typeof cvObj.Mat === 'function') {
        console.log('[Background Removal Worker] cv.Mat is available!');
        clearTimeout(timeout);
        resolve();
      } else {
        // маленькая отсрочка на случай поздней инициализации
        setTimeout(() => {
          console.log('[Background Removal Worker] Final check (delayed)...', {
            hasCv: !!self.cv,
            hasMat: !!(self.cv && self.cv.Mat),
          });

          if (self.cv && typeof self.cv.Mat === 'function') {
            clearTimeout(timeout);
            resolve();
          } else {
            clearTimeout(timeout);
            reject(new Error('cv.Mat not available after initialization'));
          }
        }, 1000);
      }
    };

    // подчистка, логирование и heartbeat
    const originalOnAbort = self.Module.onAbort;
    self.Module.onAbort = (reason) => {
      console.error('[Background Removal Worker] Aborted:', reason);
      clearTimeout(timeout);
      reject(new Error('OpenCV aborted: ' + reason));
      if (originalOnAbort) originalOnAbort(reason);
    };

    let checkCount = 0;
    let locateFileCalled = false;
    const checkInterval = setInterval(() => {
      checkCount++;
      console.log(`[Background Removal Worker] Check ${checkCount}:`, {
        hasModule: !!self.Module,
        hasCv: !!self.cv,
        hasMat: !!(self.cv && self.cv.Mat),
        hasReady: !!(self.cv && self.cv.ready),
        hasOnRuntimeInitialized: !!(self.Module && self.Module.onRuntimeInitialized),
        locateFileCalled: locateFileCalled,
        moduleKeys: self.Module ? Object.keys(self.Module) : [],
        cvKeys: self.cv ? Object.keys(self.cv).slice(0, 5) : [],
      });

      if (checkCount >= 6) {
        clearInterval(checkInterval);
      }
    }, 5000);

    const originalLocateFile = self.Module.locateFile;
    self.Module.locateFile = (path) => {
      locateFileCalled = true;
      console.log('[Background Removal Worker] locateFile triggered for:', path);
      return originalLocateFile(path);
    };

    // Сброс интервала при завершении Promises
    const _resolve = resolve;
    const _reject = reject;
    resolve = (...args) => {
      clearInterval(checkInterval);
      _resolve(...args);
    };
    reject = (...args) => {
      clearInterval(checkInterval);
      _reject(...args);
    };
  });

  return cvInitPromise;
}

self.onmessage = async (e) => {
  const { type, payload } = e.data || {};

  console.log('[Background Removal Worker] Received message:', type);

  if (type === 'init') {
    try {
      console.log('[Background Removal Worker] Starting OpenCV initialization...');
      await loadOpenCV();
      console.log('[Background Removal Worker] Initialization complete, sending inited message');
      self.postMessage({ type: 'inited' });
    } catch (err) {
      console.error('[Background Removal Worker] Initialization failed:', err);
      self.postMessage({
        type: 'error',
        message: 'OpenCV load failed: ' + (err?.message || err),
      });
    }
    return;
  }

  if (type === 'removeBackground') {
    console.log('[Background Removal Worker] Starting background removal...', payload);
    
    // Таймаут для обработки (30 секунд)
    const timeout = setTimeout(() => {
      console.error('[Background Removal Worker] Processing timeout');
      self.postMessage({
        type: 'error',
        message: 'Processing timeout - image too large or complex',
      });
    }, 30000);
    
    try {
      await loadOpenCV();
    } catch (err) {
      console.error('[Background Removal Worker] OpenCV load failed:', err);
      clearTimeout(timeout);
      self.postMessage({
        type: 'error',
        message: 'OpenCV not ready: ' + (err?.message || err),
      });
      return;
    }

    // используем именно self.cv, который мы гарантированно настроили в loadOpenCV
    const cv = self.cv;

    const {
      width,
      height,
      buffer,
      colorQuantization,
      edgeThreshold,
      centerProtection,
      replacementType,
      replacementColor,
    } = payload;

    console.log('[Background Removal Worker] Processing image:', { width, height, colorQuantization, edgeThreshold, centerProtection });

    let src, rgb, blurred, samples, labels, centers, mask, result;

    try {
      self.postMessage({ type: 'progress', value: 0.05 });

      // RGBA → Mat
      const rgba = new Uint8ClampedArray(buffer);
      src = cv.matFromArray(height, width, cv.CV_8UC4, rgba);

      // RGBA → RGB
      rgb = new cv.Mat();
      cv.cvtColor(src, rgb, cv.COLOR_RGBA2RGB);

      self.postMessage({ type: 'progress', value: 0.15 });

      // Предобработка: уменьшаем шум
      const blurred = new cv.Mat();
      cv.GaussianBlur(rgb, blurred, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT);

      // K-means для квантования цветов с улучшенными параметрами
      const rgbData = new Uint8ClampedArray(blurred.data);
      const samplesData = new Float32Array(width * height * 3);

      for (let i = 0; i < width * height; i++) {
        samplesData[i * 3] = rgbData[i * 3]; // R
        samplesData[i * 3 + 1] = rgbData[i * 3 + 1]; // G
        samplesData[i * 3 + 2] = rgbData[i * 3 + 2]; // B
      }

      samples = cv.matFromArray(width * height, 1, cv.CV_32FC3, samplesData);

      labels = new cv.Mat();
      centers = new cv.Mat();

      // Оптимизированные параметры для k-means (быстрее)
      const criteria = new cv.TermCriteria(
        cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER,
        20, // меньше итераций для скорости
        0.1  // умеренная точность
      );

      console.log('[Background Removal Worker] Running k-means...');
      cv.kmeans(samples, colorQuantization, labels, criteria, 3, cv.KMEANS_PP_CENTERS, centers);
      console.log('[Background Removal Worker] K-means completed');

      self.postMessage({ type: 'progress', value: 0.35 });

      // Улучшенная логика определения фона
      const clusterAreas = new Array(colorQuantization).fill(0);
      const clusterEdgePresence = new Array(colorQuantization).fill(0);
      const labels32 = labels.data32S;
      
      // Подсчитываем площади и присутствие на краях
      for (let i = 0; i < width * height; i++) {
        const clusterId = labels32[i];
        clusterAreas[clusterId]++;
        
        // Проверяем, находится ли пиксель на краю
        const x = i % width;
        const y = Math.floor(i / width);
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          clusterEdgePresence[clusterId]++;
        }
      }

      // Находим лучший кандидат на фон
      let bestBackgroundCluster = -1;
      let bestScore = -1;
      
      for (let i = 0; i < colorQuantization; i++) {
        const area = clusterAreas[i];
        const edgePresence = clusterEdgePresence[i];
        const areaRatio = area / (width * height);
        const edgeRatio = edgePresence / (2 * width + 2 * height - 4); // периметр
        
        // Комбинированный score: большая площадь + присутствие на краях
        const score = areaRatio * 0.6 + edgeRatio * 0.4; // Больше веса краям
        
        if (score > bestScore && areaRatio > 0.03) { // минимум 3% от изображения (более агрессивно)
          bestScore = score;
          bestBackgroundCluster = i;
        }
      }

      const backgroundCluster = bestBackgroundCluster >= 0 ? bestBackgroundCluster : clusterAreas.indexOf(Math.max(...clusterAreas));
      console.log('[Background Removal] Background cluster:', backgroundCluster, 'Score:', bestScore, 'Areas:', clusterAreas, 'Edge presence:', clusterEdgePresence);

      self.postMessage({ type: 'progress', value: 0.5 });

      // Создаем маску фона
      mask = new cv.Mat(height, width, cv.CV_8U);
      const maskData = mask.data; // Прямая работа с Uint8Array
      
      for (let i = 0; i < width * height; i++) {
        maskData[i] = labels32[i] === backgroundCluster ? 255 : 0;
      }

      // Упрощенные морфологические операции для скорости
      console.log('[Background Removal Worker] Applying morphological operations...');
      
      // Создаем только одно ядро для быстрой обработки
      const kernel5x5 = createEllipticalKernel(5, 5);
      
      // Простое закрытие для сглаживания
      morphologyClose(maskData, width, height, kernel5x5);
      
      console.log('[Background Removal Worker] Morphological operations completed');

      // Проверяем, что фон тянется от краев (edge-connected)
      const isEdgeConnected = checkEdgeConnectivity(maskData, width, height, edgeThreshold);
      
      if (!isEdgeConnected) {
        console.log('[Background Removal] Background cluster is not edge-connected, skipping removal');
        // Если фон не тянется от краев, возвращаем исходное изображение
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext('2d');
        const imageData = new ImageData(new Uint8ClampedArray(rgba), width, height);
        ctx.putImageData(imageData, 0, 0);
        const blob = await canvas.convertToBlob({ type: 'image/png' });
        const resultUrl = URL.createObjectURL(blob);
        self.postMessage({ type: 'result', result: resultUrl });
        return;
      }

      // Защита центра изображения
      const protectedMask = protectCenter(maskData, width, height, centerProtection);
      
      self.postMessage({ type: 'progress', value: 0.7 });

      // Применяем маску
      result = new cv.Mat(height, width, cv.CV_8UC4);
      const resultData = result.data; // Прямая работа с Uint8Array
      
      for (let i = 0; i < width * height; i++) {
        const pixelIdx = i * 4;
        const maskIdx = i;
        
        if (protectedMask[maskIdx] === 0) {
          // Копируем исходный пиксель
          resultData[pixelIdx] = rgba[pixelIdx];     // R
          resultData[pixelIdx + 1] = rgba[pixelIdx + 1]; // G
          resultData[pixelIdx + 2] = rgba[pixelIdx + 2]; // B
          resultData[pixelIdx + 3] = rgba[pixelIdx + 3]; // A
        } else {
          // Удаляем фон
          if (replacementType === 'transparent') {
            resultData[pixelIdx] = 0;     // R
            resultData[pixelIdx + 1] = 0; // G
            resultData[pixelIdx + 2] = 0; // B
            resultData[pixelIdx + 3] = 0; // A (прозрачный)
          } else {
            // Заменяем на выбранный цвет
            const color = hexToRgb(replacementColor);
            resultData[pixelIdx] = color.r;     // R
            resultData[pixelIdx + 1] = color.g; // G
            resultData[pixelIdx + 2] = color.b; // B
            resultData[pixelIdx + 3] = 255;     // A (непрозрачный)
          }
        }
      }

      self.postMessage({ type: 'progress', value: 0.9 });

      // Конвертируем результат в PNG
      console.log('[Background Removal Worker] Converting to PNG...');
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const imageData = new ImageData(new Uint8ClampedArray(result.data), width, height);
      ctx.putImageData(imageData, 0, 0);
      
      const blob = await canvas.convertToBlob({ type: 'image/png' });
      const resultUrl = URL.createObjectURL(blob);
      
      console.log('[Background Removal Worker] Sending result...');
      self.postMessage({ type: 'result', result: resultUrl });
      
      clearTimeout(timeout);

    } catch (err) {
      console.error('[Background Removal] Error:', err);
      clearTimeout(timeout);
      self.postMessage({
        type: 'error',
        message: String(err?.message || err),
      });
    } finally {
      [src, rgb, blurred, samples, labels, centers, mask, result].forEach(
        (m) => {
          try {
            m && m.delete && m.delete();
          } catch {}
        }
      );
      self.postMessage({ type: 'progress', value: 1 });
    }
  }
};

// Вспомогательные функции
function checkEdgeConnectivity(maskData, width, height, threshold) {
  // Создаем копию маски для BFS
  const maskCopy = new Uint8ClampedArray(maskData);
  const visited = new Array(width * height).fill(false);
  const queue = [];
  let edgePixels = 0;
  
  // Находим пиксели фона на краях (расширенная граница)
  const borderWidth = Math.max(2, Math.min(width, height) / 50); // адаптивная ширина границы
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < borderWidth; y++) {
      const idx = y * width + x;
      if (maskCopy[idx] === 255 && !visited[idx]) {
        queue.push(idx);
        visited[idx] = true;
        edgePixels++;
      }
    }
    for (let y = height - borderWidth; y < height; y++) {
      const idx = y * width + x;
      if (maskCopy[idx] === 255 && !visited[idx]) {
        queue.push(idx);
        visited[idx] = true;
        edgePixels++;
      }
    }
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < borderWidth; x++) {
      const idx = y * width + x;
      if (maskCopy[idx] === 255 && !visited[idx]) {
        queue.push(idx);
        visited[idx] = true;
        edgePixels++;
      }
    }
    for (let x = width - borderWidth; x < width; x++) {
      const idx = y * width + x;
      if (maskCopy[idx] === 255 && !visited[idx]) {
        queue.push(idx);
        visited[idx] = true;
        edgePixels++;
      }
    }
  }
  
  // BFS для подсчета связанных пикселей
  let connectedPixels = 0;
  while (queue.length > 0) {
    const pixel = queue.shift();
    connectedPixels++;
    
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    
    // Проверяем соседние пиксели
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const neighbor = ny * width + nx;
          
          if (!visited[neighbor] && maskCopy[neighbor] === 255) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
    }
  }
  
  // Проверяем, достаточно ли пикселей связано с краями
  const totalBackgroundPixels = maskCopy.reduce((sum, pixel) => sum + (pixel === 255 ? 1 : 0), 0);
  const connectivityRatio = totalBackgroundPixels > 0 ? connectedPixels / totalBackgroundPixels : 0;
  
  // Очень мягкий порог для edge connectivity (более агрессивное удаление)
  const adjustedThreshold = Math.max(0.05, threshold * 0.3);
  
  console.log('[Background Removal] Edge connectivity:', {
    edgePixels,
    connectedPixels,
    totalBackgroundPixels,
    connectivityRatio,
    threshold: adjustedThreshold,
    borderWidth
  });
  
  return connectivityRatio >= adjustedThreshold;
}

function protectCenter(maskData, width, height, protectionRatio) {
  const protectedMask = new Uint8ClampedArray(maskData);
  const centerX = width / 2;
  const centerY = height / 2;
  const protectionRadius = Math.min(width, height) * protectionRatio / 2;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      
      if (distance <= protectionRadius) {
        protectedMask[y * width + x] = 0; // Защищаем от удаления
      }
    }
  }
  
  return protectedMask;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

// Создание эллиптического ядра
function createEllipticalKernel(width, height) {
  const kernel = [];
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const radiusX = centerX;
  const radiusY = centerY;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy <= 1.0) {
        kernel.push({ x, y });
      }
    }
  }
  
  return kernel;
}

// Морфологическое закрытие (заполнение дыр)
function morphologyClose(maskData, width, height, kernel) {
  const temp = new Uint8Array(maskData.length);
  
  // Дилатация
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (maskData[idx] === 255) {
        // Применяем ядро
        for (const { x: kx, y: ky } of kernel) {
          const nx = x + kx - Math.floor(kernel[0].x);
          const ny = y + ky - Math.floor(kernel[0].y);
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nidx = ny * width + nx;
            temp[nidx] = 255;
          }
        }
      }
    }
  }
  
  // Эрозия
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      let allWhite = true;
      
      for (const { x: kx, y: ky } of kernel) {
        const nx = x + kx - Math.floor(kernel[0].x);
        const ny = y + ky - Math.floor(kernel[0].y);
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (temp[nidx] !== 255) {
            allWhite = false;
            break;
          }
        }
      }
      
      maskData[idx] = allWhite ? 255 : 0;
    }
  }
}

// Морфологическое открытие (удаление мелких объектов)
function morphologyOpen(maskData, width, height, kernel) {
  const temp = new Uint8Array(maskData.length);
  
  // Эрозия
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      let allWhite = true;
      
      for (const { x: kx, y: ky } of kernel) {
        const nx = x + kx - Math.floor(kernel[0].x);
        const ny = y + ky - Math.floor(kernel[0].y);
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (maskData[nidx] !== 255) {
            allWhite = false;
            break;
          }
        }
      }
      
      temp[idx] = allWhite ? 255 : 0;
    }
  }
  
  // Дилатация
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (temp[idx] === 255) {
        // Применяем ядро
        for (const { x: kx, y: ky } of kernel) {
          const nx = x + kx - Math.floor(kernel[0].x);
          const ny = y + ky - Math.floor(kernel[0].y);
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nidx = ny * width + nx;
            maskData[nidx] = 255;
          }
        }
      }
    }
  }
}
