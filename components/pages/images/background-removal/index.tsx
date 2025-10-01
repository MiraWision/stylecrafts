import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';
import { usePythonBackgroundRemover, PythonBgRemovalSettings } from '@/hooks/use-python-background-remover';

// ===== Types =====

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};

// Удаляем старый интерфейс, используем PythonBgRemovalSettings из хука

// ===== Component =====

const BackgroundRemovalMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });

  const [processedImage, setProcessedImage] = useState<string | null>(null);

  // Настройки Python сервера (OpenCV режим)
  const settings: PythonBgRemovalSettings = {
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

  const { isProcessing, error, result, removeBackground, reset } = usePythonBackgroundRemover();
  const previewUrlRef = useRef<string | null>(null);

  // Mount flag for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Обработка результата
  useEffect(() => {
    if (result?.success && result.rgba) {
      setProcessedImage(result.rgba);
    }
  }, [result]);

  const handleFileSelect = async (file: File) => {
    try {
      const dataUrl = URL.createObjectURL(file);
      
      setOriginalImage({
        file,
        previewUrl: dataUrl,
        dataUrl: dataUrl,
      });

      // Очищаем предыдущий URL
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = dataUrl;

      // Сбрасываем результат
      setProcessedImage(null);
      reset();
    } catch (err) {
      console.error('Error processing file:', err);
    }
  };

  const handleImageInputChange = (imageData: any) => {
    if (imageData?.fileMetaData) {
      // Конвертируем data URL в File
      fetch(imageData.content)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], imageData.fileMetaData.name, {
            type: imageData.fileMetaData.type,
            lastModified: imageData.fileMetaData.lastModified,
          });
          handleFileSelect(file);
        })
        .catch(err => console.error('Error converting data URL to file:', err));
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage.file) return;

    try {
      await removeBackground(originalImage.file, settings);
    } catch (err) {
      console.error('Error processing image:', err);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'background-removed.png';
      link.href = processedImage;
      link.click();
    }
  };


  if (!mounted) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Form>
        <ImagesContainer>
          <ImageContainer>
            <ImageInputStyled 
              value={originalImage.previewUrl || originalImage.dataUrl} 
              onChange={handleImageInputChange} 
            />

            {(originalImage.previewUrl || originalImage.dataUrl) && (
              <BaseTextButton
                text={isProcessing ? 'Processing...' : 'Remove Background'}
                onClick={handleRemoveBackground}
                disabled={isProcessing}
                isPrimary={true}
              />
            )}

            {error && <ErrorMessage>Error: {error}</ErrorMessage>}
          </ImageContainer>

          <ImageContainer>
            {processedImage ? (
              <PreviewImage src={processedImage} alt="Processed" />
            ) : (
              <Placeholder>No result</Placeholder>
            )}

            {processedImage && (
              <DownloadTextButton text="Download PNG" onClick={handleDownload} />
            )}
          </ImageContainer>
        </ImagesContainer>
      </Form>

      <ToolCrossLinks toolKey="background-removal" />
    </Container>
  );
};

// ===== Styles =====

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageInputStyled = styled(ImageInput)`
  width: 100%;
  min-height: 12rem;
  border: 2px dashed var(--surface-300);
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
  }

  @media (max-width: 600px) {
    min-height: 10rem;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 0.75rem;
  border: 1px solid var(--surface-200);
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  background: var(--surface-100);
  border: 2px dashed var(--surface-300);
  border-radius: 0.75rem;
  color: var(--surface-500);
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  color: var(--error-500);
  background-color: var(--error-50);
  border: 1px solid var(--error-200);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

export { BackgroundRemovalMain };