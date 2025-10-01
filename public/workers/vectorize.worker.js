/* public/workers/vectorize.worker.js */
/* global self, importScripts */

let cvInitPromise = null;

function loadOpenCV() {
  if (cvInitPromise) {
    console.log('[OpenCV Worker] Returning existing promise');
    return cvInitPromise;
  }

  console.log('[OpenCV Worker] Starting OpenCV initialization...');

  const origin = self.location.origin; // e.g. http://localhost:3000
  const basePath = ''; // если у Next есть basePath — укажи здесь, напр. '/app'

  console.log('[OpenCV Worker] Origin:', origin, 'BasePath:', basePath);

  // 1) Задаём Module и указываем где лежит wasm
  self.Module = self.Module || {};

  // locateFile: переназначаем путь к wasm
  self.Module.locateFile = (path) => {
    // если запрошен стандартный opencv_js.wasm — подсовываем наш opencv.wasm
    let finalPath = path === 'opencv_js.wasm' ? 'opencv.wasm' : path;
    const url = `${origin}${basePath}/opencv/${finalPath}`;

    console.log('[OpenCV Worker] locateFile called for:', path, '->', url);

    // Мини-проверка доступности файла (не обязательно, но помогает в отладке)
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', url, false);
      xhr.send();
      console.log('[OpenCV Worker] File check:', url, 'Status:', xhr.status);
      if (xhr.status !== 200) {
        console.error('[OpenCV Worker] File not accessible:', url);
      }
    } catch (err) {
      console.error('[OpenCV Worker] File check failed:', url, err);
    }

    return url;
  };

  // базовые обработчики для логов Module
  self.Module.printErr = (msg) => {
    try {
      console.warn('[OpenCV Worker] Error:', msg);
    } catch {}
  };

  self.Module.onAbort = (reason) => {
    console.error('[OpenCV Worker] Aborted:', reason);
  };

  // 2) Грузим opencv.js
  try {
    const opencvUrl = `${origin}${basePath}/opencv/opencv.js`;
    console.log('[OpenCV Worker] Importing script from:', opencvUrl);
    importScripts(opencvUrl);
    console.log('[OpenCV Worker] Script imported successfully');

    // Проверяем, появился ли cv
    console.log('[OpenCV Worker] After import:', {
      hasCv: !!self.cv,
      cvType: typeof self.cv,
      hasMat: !!(self.cv && self.cv.Mat),
      cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
      hasOnRuntimeInitialized:
        !!(self.cv && typeof self.cv.onRuntimeInitialized === 'function'),
    });

    // Некоторые сборки OpenCV экспортируют функцию, которую надо вызвать
    if (typeof self.cv === 'function') {
      console.log('[OpenCV Worker] cv is a function, trying to call it...');
      try {
        self.cv = self.cv();
        console.log('[OpenCV Worker] After calling cv():', {
          hasCv: !!self.cv,
          cvType: typeof self.cv,
          hasMat: !!(self.cv && self.cv.Mat),
          cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
        });
      } catch (e) {
        console.error('[OpenCV Worker] Failed to call cv():', e);
      }
    }
  } catch (e) {
    console.error('[OpenCV Worker] Failed to import script:', e);
    throw new Error(
      'importScripts(opencv.js) failed: ' + (e && e.message ? e.message : e)
    );
  }

  // 3) Ждём готовности рантайма
  cvInitPromise = new Promise((resolve, reject) => {
    console.log('[OpenCV Worker] Creating Promise for OpenCV initialization...');

    const timeout = setTimeout(() => {
      console.error('[OpenCV Worker] Timeout waiting for OpenCV initialization');
      console.error('[OpenCV Worker] Current state:', {
        hasModule: !!self.Module,
        hasCv: !!self.cv,
        moduleKeys: self.Module ? Object.keys(self.Module) : [],
        cvKeys: self.cv ? Object.keys(self.cv).slice(0, 10) : [],
      });
      reject(new Error('OpenCV init timeout (wasm likely not found)'));
    }, 30000);

    self.Module.onRuntimeInitialized = () => {
      console.log('[OpenCV Worker] Module.onRuntimeInitialized called - OpenCV ready!');

      // Пытаемся определить корректный объект cv
      let cvObj = null;

      // 1) уже есть self.cv
      if (self.cv && typeof self.cv.Mat === 'function') {
        cvObj = self.cv;
        console.log('[OpenCV Worker] Found cv in self.cv');
      }
      // 2) сборка положила cv внутрь Module
      else if (self.Module && self.Module.cv && typeof self.Module.cv.Mat === 'function') {
        cvObj = self.Module.cv;
        self.cv = cvObj;
        console.log('[OpenCV Worker] Found cv in Module.cv');
      }
      // 3) глобальная переменная cv
      else if (typeof cv !== 'undefined' && typeof cv.Mat === 'function') {
        cvObj = cv; // eslint-disable-line no-undef
        self.cv = cvObj;
        console.log('[OpenCV Worker] Found cv in global cv');
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
        };
        self.cv = cvObj;
        console.log('[OpenCV Worker] Created cv from Module functions');
      }

      if (cvObj && typeof cvObj.Mat === 'function') {
        console.log('[OpenCV Worker] cv.Mat is available!');
        clearTimeout(timeout);
        resolve();
      } else {
        // маленькая отсрочка на случай поздней инициализации
        setTimeout(() => {
          console.log('[OpenCV Worker] Final check (delayed)...', {
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
      console.error('[OpenCV Worker] Aborted:', reason);
      clearTimeout(timeout);
      reject(new Error('OpenCV aborted: ' + reason));
      if (originalOnAbort) originalOnAbort(reason);
    };

    let checkCount = 0;
    let locateFileCalled = false;
    const checkInterval = setInterval(() => {
      checkCount++;
      console.log(`[OpenCV Worker] Check ${checkCount}:`, {
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
      console.log('[OpenCV Worker] locateFile triggered for:', path);
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

  console.log('[OpenCV Worker] Received message:', type);

  if (type === 'init') {
    try {
      console.log('[OpenCV Worker] Starting OpenCV initialization...');
      await loadOpenCV();
      console.log('[OpenCV Worker] Initialization complete, sending inited message');
      self.postMessage({ type: 'inited' });
    } catch (err) {
      console.error('[OpenCV Worker] Initialization failed:', err);
      self.postMessage({
        type: 'error',
        message: 'OpenCV load failed: ' + (err?.message || err),
      });
    }
    return;
  }

  if (type === 'vectorize') {
    try {
      await loadOpenCV();
    } catch (err) {
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
      k,
      epsilonRatio,
      minAreaRatio,
      blur,
      cannyLow,
      cannyHigh,
      animation = true,
    } = payload;

    const totalArea = width * height;
    const minArea = totalArea * (minAreaRatio ?? 0.004);

    let src, rgb, gray, edges, samples, labels, centers, hierarchy, contours;

    try {
      self.postMessage({ type: 'progress', value: 0.05 });

      // RGBA → Mat
      const rgba = new Uint8ClampedArray(buffer);
      src = cv.matFromArray(height, width, cv.CV_8UC4, rgba);

      // RGBA → RGB
      rgb = new cv.Mat();
      cv.cvtColor(src, rgb, cv.COLOR_RGBA2RGB);

      // сглаживание (опционально)
      if (blur > 0) {
        const ksize = new cv.Size(2 * blur + 1, 2 * blur + 1);
        cv.GaussianBlur(rgb, rgb, ksize, 0, 0, cv.BORDER_DEFAULT);
      }

      self.postMessage({ type: 'progress', value: 0.15 });

      // Готовим данные для k-means
      const rgbData = new Uint8ClampedArray(rgb.data);
      const samplesData = new Float32Array(width * height * 3);

      for (let i = 0; i < width * height; i++) {
        samplesData[i * 3] = rgbData[i * 3]; // R
        samplesData[i * 3 + 1] = rgbData[i * 3 + 1]; // G
        samplesData[i * 3 + 2] = rgbData[i * 3 + 2]; // B
      }

      samples = cv.matFromArray(width * height, 1, cv.CV_32FC3, samplesData);

      labels = new cv.Mat();
      centers = new cv.Mat();

      const criteria = new cv.TermCriteria(
        cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER,
        15,
        0.5
      );

      cv.kmeans(samples, k, labels, criteria, 1, cv.KMEANS_PP_CENTERS, centers);

      // Перекрашиваем изображение центрами кластеров
      const rgbData2 = new Uint8ClampedArray(rgb.data);
      for (let i = 0; i < width * height; i++) {
        const ci = labels.intAt(i, 0);
        rgbData2[i * 3] = Math.round(centers.floatAt(ci, 0)); // R
        rgbData2[i * 3 + 1] = Math.round(centers.floatAt(ci, 1)); // G
        rgbData2[i * 3 + 2] = Math.round(centers.floatAt(ci, 2)); // B
      }

      self.postMessage({ type: 'progress', value: 0.35 });

      // Canny по серому
      gray = new cv.Mat();
      cv.cvtColor(rgb, gray, cv.COLOR_RGB2GRAY);

      edges = new cv.Mat();
      cv.Canny(gray, edges, cannyLow, cannyHigh);

      // Лёгкое замыкание дырок в краях
      const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
      cv.morphologyEx(edges, edges, cv.MORPH_CLOSE, kernel);
      kernel.delete();

      self.postMessage({ type: 'progress', value: 0.55 });

      // Контуры
      contours = new cv.MatVector();
      hierarchy = new cv.Mat();
      cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      self.postMessage({ type: 'progress', value: 0.7 });

      // Аппроксимация и построение SVG path
      const paths = [];
      for (let i = 0; i < contours.size(); i++) {
        const cnt = contours.get(i);
        const area = cv.contourArea(cnt);
        if (area < minArea) {
          cnt.delete();
          continue;
        }

        const peri = cv.arcLength(cnt, true);
        const eps = Math.max(1, peri * epsilonRatio);

        const approx = new cv.Mat();
        cv.approxPolyDP(cnt, approx, eps, true);

        if (approx.rows >= 3) {
          const p0 = approx.intPtr(0, 0);
          let d = `M ${p0[0]} ${p0[1]}`;
          for (let j = 1; j < approx.rows; j++) {
            const p = approx.intPtr(j, 0);
            d += ` L ${p[0]} ${p[1]}`;
          }
          d += ' Z';
          paths.push(d);
        }

        approx.delete();
        cnt.delete();
      }

      self.postMessage({ type: 'progress', value: 0.9 });

      // Сборка SVG
      const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`;
      const animCSS = animation
        ? `
  <style>
    @keyframes pulseIn {
      0%   { transform: scale(.8);  opacity: 0; }
      60%  { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1);   opacity: 1; }
    }
    .pulse { transform-origin: center; animation: pulseIn 450ms ease-out both; }
  </style>`
        : '';

      const body = paths
        .map((d, idx) => {
          const ci = idx % k;
          const r = Math.round(centers.floatAt(ci, 0));
          const g = Math.round(centers.floatAt(ci, 1));
          const b = Math.round(centers.floatAt(ci, 2));
          const delay = (idx * 60) % 1200;
          const cls = animation ? ` class="pulse"` : '';
          const st = animation ? ` style="animation-delay:${delay}ms"` : '';
          return `<path d="${d}" fill="rgb(${r},${g},${b})"${cls}${st} />`;
        })
        .join('\n');

      const out = `${svgHeader}${animCSS}
${body}
</svg>`;

      self.postMessage({ type: 'result', svg: out });
    } catch (err) {
      self.postMessage({
        type: 'error',
        message: String(err?.message || err),
      });
    } finally {
      [src, rgb, gray, edges, samples, labels, centers, hierarchy, contours].forEach(
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
