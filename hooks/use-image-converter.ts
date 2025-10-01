import { useState } from 'react';

interface ConvertSettings {
  format: 'png' | 'jpg' | 'webp' | 'avif';
  quality: number;
  backgroundColor: string;
}

interface ConvertResult {
  success: boolean;
  dataUrl: string;
  fileSize: number;
  originalSize: { width: number; height: number };
  newSize: { width: number; height: number };
  format: string;
}

export const useImageConverter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const convertImage = async (file: File, settings: ConvertSettings): Promise<ConvertResult> => {
    setIsLoading(true);

    try {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;

          // Handle background color for PNG to JPG conversion
          if (settings.format === 'jpg' && file.type === 'image/png') {
            // Fill with background color
            ctx.fillStyle = settings.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // Draw the image
          ctx.drawImage(img, 0, 0);

          // Convert to desired format
          const mimeType = getMimeType(settings.format);
          const quality = settings.format === 'png' ? undefined : settings.quality / 100;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to convert image'));
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                
                resolve({
                  success: true,
                  dataUrl,
                  fileSize: blob.size,
                  originalSize: { width: img.width, height: img.height },
                  newSize: { width: img.width, height: img.height },
                  format: settings.format.toUpperCase(),
                });
              };
              reader.onerror = () => reject(new Error('Failed to read converted image'));
              reader.readAsDataURL(blob);
            },
            mimeType,
            quality
          );
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMimeType = (format: string): string => {
    switch (format) {
      case 'png':
        return 'image/png';
      case 'jpg':
        return 'image/jpeg';
      case 'webp':
        return 'image/webp';
      case 'avif':
        return 'image/avif';
      default:
        return 'image/png';
    }
  };

  return {
    convertImage,
    isLoading,
  };
};

