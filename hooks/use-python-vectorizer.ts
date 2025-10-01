import { useEffect, useRef, useState } from 'react';

export type PythonVectorizerSettings = {
  smooth: 'bilateral' | 'edgepreserve';
  slic_region: number;        // 12-28
  slic_ruler: number;         // 8-20
  min_element_size: number;   // 20-50
  color_thresh: number;       // 6-10
  min_region_px: number;      // 300-1200
  with_text_preserve: boolean;
  with_lines_preserve: boolean;
  stroke_outline: boolean;
  smoothing_level: number;    // 0-2 (0=нет, 1=легкое, 2=сильное)
  with_animation: boolean;    // включить анимацию SVG
};

type VectorizePayload = {
  image: string;  // base64 data URL
  params: PythonVectorizerSettings;
};

type PythonWorkerMessage =
  | { type: 'inited' }
  | { type: 'progress'; value: number }
  | { type: 'result'; svg: string }
  | { type: 'error'; message: string };

export function usePythonVectorizer() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vectorize = async (imageData: ImageData, settings: PythonVectorizerSettings) => {
    try {
      setProgress(0);
      setResult(null);
      setError(null);

      // Конвертируем ImageData в base64
      const canvas = new OffscreenCanvas(imageData.width, imageData.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      ctx.putImageData(imageData, 0, 0);
      const blob = await canvas.convertToBlob({ type: 'image/png' });
      const base64 = await blobToBase64(blob);

      // Отправляем запрос на Python сервер
      const response = await fetch('http://localhost:5005/vectorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          params: settings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
      }

      const data = await response.json();
      
      if (data.success) {
        setResult(data.svg);
        setProgress(1);
      } else {
        throw new Error(data.message || 'Vectorization failed');
      }

    } catch (err) {
      console.error('Python vectorization error:', err);
      setError(String(err?.message || err));
      setProgress(0);
    }
  };

  // Проверяем доступность Python сервера только на клиенте
  useEffect(() => {
    setMounted(true);
    
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:5005/health');
        if (response.ok) {
          setReady(true);
          setError(null);
        } else {
          setReady(false);
          setError('Python server not responding');
        }
      } catch (err) {
        setReady(false);
        setError('Python server not available. Please start it with: ./python-server/start-server.sh');
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 5000); // Проверяем каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return { mounted, ready, progress, result, error, vectorize };
}

// Утилита для конвертации blob в base64
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
