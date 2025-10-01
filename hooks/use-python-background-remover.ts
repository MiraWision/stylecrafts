import { useState, useCallback } from 'react';

export type PythonBgRemovalSettings = {
  // AI mode parameters
  mode?: 'ai' | 'classic';
  model?: 'auto' | 'u2net' | 'u2net_human_seg' | 'isnet-general-use';
  alpha_matting?: boolean;
  am_foreground_threshold?: number;
  am_background_threshold?: number;
  am_erosion_size?: number;
  post_shrink_px?: number;
  max_side?: number;
  prefer_human?: boolean;
  scene_hint?: 'human' | 'object' | null;
  // Classic mode parameters
  saliency_threshold?: number;    // 0.25-0.45
  inner_margin?: number;          // 4-10
  outer_margin?: number;          // 8-16
  grabcut_iters?: number;         // 3-7
  alpha_feather?: number;         // 4-10
};

export type PythonBgRemovalResult = {
  success: boolean;
  rgba?: string;                 // PNG с прозрачным фоном
  alpha?: string;                // Только альфа-канал
  mask?: string;                 // Жесткая маска
  params_used?: PythonBgRemovalSettings;
  error?: string;
};

export function usePythonBackgroundRemover() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PythonBgRemovalResult | null>(null);

  const removeBackground = useCallback(async (
    imageFile: File,
    settings: Partial<PythonBgRemovalSettings> = {}
  ): Promise<PythonBgRemovalResult> => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Конвертируем файл в base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      // Параметры по умолчанию (OpenCV режим)
      const defaultSettings: PythonBgRemovalSettings = {
        mode: 'ai',
        model: 'auto',
        alpha_matting: true,
        am_foreground_threshold: 255,
        am_background_threshold: 10,
        am_erosion_size: 5,
        post_shrink_px: 1,
        max_side: 1600,
        prefer_human: true,
        scene_hint: null,  // авто-определение сцены
        // Classic fallback параметры
        saliency_threshold: 0.08,
        inner_margin: 18,
        outer_margin: 30,
        grabcut_iters: 10,
        alpha_feather: 18,
      };

      const finalSettings = { ...defaultSettings, ...settings };

      // Отправляем запрос на Python сервер
      const response = await fetch('http://localhost:5005/remove-background', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          params: finalSettings,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PythonBgRemovalResult = await response.json();

      if (data.success) {
        setResult(data);
        return data;
      } else {
        throw new Error(data.error || 'Background removal failed');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      const errorResult: PythonBgRemovalResult = {
        success: false,
        error: errorMessage,
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
    setIsProcessing(false);
  }, []);

  return {
    isProcessing,
    error,
    result,
    removeBackground,
    reset,
  };
}
