import { useEffect, useRef, useState } from 'react';

export function useVectorizer() {
  const workerRef = useRef<Worker | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useVectorizer] Creating worker...');
    // Если у тебя есть basePath, добавь его здесь:
    const basePath = ''; // например '/app'
    const w = new Worker(`${basePath}/workers/vectorize.worker.js`);
    workerRef.current = w;

    w.onmessage = (e: MessageEvent) => {
      const { type, value, svg, message } = e.data || {};
      console.log('[useVectorizer] Received message:', type, { value, svg, message });
      if (type === 'inited') setReady(true);
      if (type === 'progress') setProgress(value ?? 0);
      if (type === 'result') setSvg(svg ?? null);
      if (type === 'error') setError(message ?? 'Unknown error');
    };

    w.onerror = (error) => {
      console.error('[useVectorizer] Worker error:', error);
      setError(`Worker error: ${error.message || 'Unknown worker error'}`);
    };

    console.log('[useVectorizer] Sending init message...');
    w.postMessage({ type: 'init' });

    return () => {
      console.log('[useVectorizer] Terminating worker...');
      w.terminate();
    };
  }, []);

  const vectorize = (imageData: ImageData, options?: Partial<{
    k: number; epsilonRatio: number; minAreaRatio: number; blur: number; cannyLow: number; cannyHigh: number; animation: boolean;
  }>) => {
    setError(null); setSvg(null); setProgress(0);
    const { width, height, data } = imageData;
    workerRef.current?.postMessage({
      type: 'vectorize',
      payload: {
        width, height,
        buffer: data.buffer,
        k: Math.min(8, Math.max(3, options?.k ?? 6)),
        epsilonRatio: options?.epsilonRatio ?? 0.02,
        minAreaRatio: options?.minAreaRatio ?? 0.004,
        blur: Math.max(0, Math.min(2, options?.blur ?? 1)),
        cannyLow: options?.cannyLow ?? 70,
        cannyHigh: options?.cannyHigh ?? 140,
        animation: options?.animation ?? true,
      }
    }, [data.buffer]);
  };

  return { ready, progress, svg, error, vectorize };
}
