import { useState, useCallback } from 'react';

export type ResizePreset = {
  name: string;
  width: number;
  height: number;
  description: string;
  category: 'social' | 'print' | 'web' | 'icon';
};

export type ResizeSettings = {
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  quality?: number; // 0-1 для JPG/WebP
  format?: 'jpg' | 'png' | 'webp';
  preset?: ResizePreset;
};

export type ResizeResult = {
  success: boolean;
  resizedImage?: string;
  originalSize?: { width: number; height: number };
  newSize?: { width: number; height: number };
  fileSize?: number;
  error?: string;
};

export const useImageResizer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResizeResult | null>(null);

  // Популярные пресеты размеров
  const presets: ResizePreset[] = [
    // Social Media
    { name: 'Instagram Post', width: 1080, height: 1080, description: 'Квадратный пост для Instagram', category: 'social' },
    { name: 'Instagram Story', width: 1080, height: 1920, description: 'Вертикальная история Instagram', category: 'social' },
    { name: 'Facebook Post', width: 1200, height: 630, description: 'Пост для Facebook', category: 'social' },
    { name: 'LinkedIn Post', width: 1200, height: 627, description: 'Пост для LinkedIn', category: 'social' },
    { name: 'Twitter/X Post', width: 1200, height: 675, description: 'Пост для Twitter/X', category: 'social' },
    { name: 'TikTok Video', width: 1080, height: 1920, description: 'Вертикальное видео TikTok', category: 'social' },
    
    // E-commerce
    { name: 'Amazon Product', width: 1000, height: 1000, description: 'Товар для Amazon', category: 'web' },
    { name: 'Etsy Product', width: 1000, height: 1000, description: 'Товар для Etsy', category: 'web' },
    
    // Web & Icons
    { name: 'Favicon', width: 32, height: 32, description: 'Иконка сайта 32x32', category: 'icon' },
    { name: 'Apple Touch Icon', width: 180, height: 180, description: 'Иконка для iOS', category: 'icon' },
    { name: 'Web Banner', width: 1920, height: 1080, description: 'Баннер для сайта', category: 'web' },
    { name: 'Thumbnail', width: 300, height: 300, description: 'Миниатюра', category: 'web' },
    
    // Print
    { name: 'A4 Print', width: 2480, height: 3508, description: 'A4 для печати (300 DPI)', category: 'print' },
    { name: 'A5 Print', width: 1748, height: 2480, description: 'A5 для печати (300 DPI)', category: 'print' },
    { name: 'Business Card', width: 1050, height: 600, description: 'Визитка (300 DPI)', category: 'print' },
  ];

  const resizeImage = useCallback(async (imageFile: File, settings: ResizeSettings): Promise<ResizeResult> => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Создаем изображение из файла
      const img = new Image();
      const imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      // Определяем размеры
      let targetWidth = settings.width || originalWidth;
      let targetHeight = settings.height || originalHeight;

      // Если используется пресет
      if (settings.preset) {
        targetWidth = settings.preset.width;
        targetHeight = settings.preset.height;
      }

      // Поддерживаем пропорции если нужно
      if (settings.maintainAspectRatio !== false) {
        const aspectRatio = originalWidth / originalHeight;
        if (settings.width && !settings.height) {
          targetHeight = Math.round(targetWidth / aspectRatio);
        } else if (settings.height && !settings.width) {
          targetWidth = Math.round(targetHeight * aspectRatio);
        }
      }

      // Создаем canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Не удалось получить контекст Canvas');
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Рисуем изображение
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Конвертируем в нужный формат
      const format = settings.format || 'png';
      const quality = settings.quality || 0.9;

      let mimeType: string;
      let fileExtension: string;

      switch (format) {
        case 'jpg':
          mimeType = 'image/jpeg';
          fileExtension = 'jpg';
          break;
        case 'webp':
          mimeType = 'image/webp';
          fileExtension = 'webp';
          break;
        case 'png':
        default:
          mimeType = 'image/png';
          fileExtension = 'png';
          break;
      }

      const dataUrl = canvas.toDataURL(mimeType, quality);
      
      // Вычисляем размер файла
      const fileSize = Math.round((dataUrl.length * 3) / 4); // Примерный размер в байтах

      const result: ResizeResult = {
        success: true,
        resizedImage: dataUrl,
        originalSize: { width: originalWidth, height: originalHeight },
        newSize: { width: targetWidth, height: targetHeight },
        fileSize,
      };

      setResult(result);
      return result;

    } catch (err: any) {
      const errorResult: ResizeResult = {
        success: false,
        error: err.message || 'Ошибка при изменении размера изображения',
      };
      setError(err.message);
      return errorResult;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setError(null);
    setResult(null);
  }, []);

  return {
    isProcessing,
    error,
    result,
    resizeImage,
    reset,
    presets,
  };
};
