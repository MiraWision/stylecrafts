import { useEffect, useMemo, useRef, useState } from 'react';

export type BgRemovalSettings = {
  colorQuantization: number;     // 4..32
  edgeThreshold: number;         // 0.1..0.5 (доля связности)
  centerProtection: number;      // 0.2..0.6 (радиус как доля min(width,height))
  replacementType: 'transparent' | 'color';
  replacementColor: string;      // #rrggbb
};

type RemovePayload = {
  width: number;
  height: number;
  buffer: ArrayBuffer;
} & BgRemovalSettings;

type WorkerMessage =
  | { type: 'inited' }
  | { type: 'progress'; value: number }
  | { type: 'result'; result: string }       // objectURL/png
  | { type: 'error'; message: string };

export function useBackgroundRemover() {
  const workerRef = useRef<Worker | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Инициализация воркера (Next.js-friendly способ)
  const workerUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return new URL('/workers/background-removal.worker.js', window.location.origin);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !workerUrl) return;
    
    const w = new Worker(workerUrl, { type: 'classic' });
    workerRef.current = w;

    const onMessage = (e: MessageEvent<WorkerMessage>) => {
      const msg = e.data;
      console.log('[useBackgroundRemover] Received message:', msg);
      
      if (!msg || !msg.type) return;

      switch (msg.type) {
        case 'inited':
          console.log('[useBackgroundRemover] Worker initialized');
          setReady(true);
          setError(null);
          break;
        case 'progress':
          console.log('[useBackgroundRemover] Progress:', msg.value);
          setProgress(msg.value ?? 0);
          break;
        case 'result':
          console.log('[useBackgroundRemover] Result received');
          setResult((prev) => {
            // чистим предыдущий objectURL
            if (prev && prev.startsWith('blob:')) {
              try { URL.revokeObjectURL(prev); } catch {}
            }
            return msg.result;
          });
          setError(null);
          break;
        case 'error':
          console.error('[useBackgroundRemover] Error:', msg.message);
          setError(msg.message);
          setReady(false);
          break;
      }
    };

    const onError = (e: ErrorEvent) => {
      setError(e.message || 'Worker error');
      setReady(false);
    };

    w.addEventListener('message', onMessage);
    w.addEventListener('error', onError);

    // сказать воркеру инициализироваться (поднимет OpenCV)
    w.postMessage({ type: 'init' });

    return () => {
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
      w.terminate();
      workerRef.current = null;
    };
  }, [workerUrl]);

  const removeBackground = (imageData: ImageData, settings: BgRemovalSettings) => {
    console.log('[useBackgroundRemover] Starting background removal...', {
      width: imageData.width,
      height: imageData.height,
      settings
    });
    
    if (!workerRef.current) {
      console.error('[useBackgroundRemover] Worker not ready');
      setError('Worker not ready');
      return;
    }
    
    setProgress(0);
    setResult(null);
    setError(null);

    // Важно: передаем именно ArrayBuffer, а не сам Uint8ClampedArray
    const payload: RemovePayload = {
      width: imageData.width,
      height: imageData.height,
      buffer: imageData.data.buffer.slice(0), // копия
      ...settings,
    };

    console.log('[useBackgroundRemover] Sending message to worker...');
    workerRef.current.postMessage(
      { type: 'removeBackground', payload },
      // Трансферим буфер, чтобы не копировался второй раз
      [payload.buffer as unknown as Transferable]
    );
  };

  return { ready, progress, result, error, removeBackground };
}
