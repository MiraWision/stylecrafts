import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { Label } from '@/components/ui/texts/label';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';
import { ImageType } from '@/types/image-types';
import { usePythonVectorizer } from '@/hooks/use-python-vectorizer';
import { getImageFromFile } from '@/utils/image-downscale';

// ===== Types =====

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};


interface SvgSettings {
  // Автоматические настройки - не показываем пользователю
  smooth: 'bilateral' | 'edgepreserve';
  slic_region: number;
  slic_ruler: number;
  min_element_size: number;
  color_thresh: number;
  min_region_px: number;
  with_text_preserve: boolean;
  with_lines_preserve: boolean;
  stroke_outline: boolean;
  smoothing_level: number;
  with_animation: boolean;
}


// ===== Component =====

const RasterToSvgMain: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });

  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [settings, setSettings] = useState<SvgSettings>({
    smooth: 'bilateral',
    slic_region: 18,
    slic_ruler: 12.0,
    min_element_size: 25,
    color_thresh: 7.0,
    min_region_px: 600,
    with_text_preserve: true,
    with_lines_preserve: true,
    stroke_outline: false,
    smoothing_level: 1,
    with_animation: true,
  });

  // Функция автоматического подбора параметров на основе изображения
  const getOptimalSettings = (imageData: ImageData): SvgSettings => {
    const { width, height } = imageData;
    const totalPixels = width * height;
    
    // Определяем размер изображения
    let baseRegionSize = 18;
    let baseRuler = 12.0;
    let baseMinElement = 25;
    let baseColorThresh = 7.0;
    let baseMinRegion = 600;
    let smoothingLevel = 1;
    
    // Адаптируем под размер изображения с более агрессивным слиянием
    if (totalPixels < 100000) { // Маленькое изображение (например, иконка)
      baseRegionSize = 12;  // Увеличили для лучшего слияния
      baseRuler = 8.0;      // Увеличили
      baseMinElement = 15;  // Увеличили
      baseColorThresh = 2.0; // Более строгое слияние
      baseMinRegion = 200;   // Увеличили минимальный размер
      smoothingLevel = 0;    // Без сглаживания для точности
    } else if (totalPixels < 500000) { // Среднее изображение
      baseRegionSize = 16;   // Увеличили
      baseRuler = 10.0;      // Увеличили
      baseMinElement = 20;   // Увеличили
      baseColorThresh = 4.0; // Более строгое слияние
      baseMinRegion = 400;   // Увеличили
      smoothingLevel = 1;
    } else if (totalPixels > 2000000) { // Большое изображение
      baseRegionSize = 28;   // Увеличили
      baseRuler = 18.0;      // Увеличили
      baseMinElement = 40;   // Увеличили
      baseColorThresh = 6.0; // Более строгое слияние
      baseMinRegion = 1000;  // Увеличили
      smoothingLevel = 2;
    }
    
    // Адаптируем под соотношение сторон
    const aspectRatio = width / height;
    if (aspectRatio > 2 || aspectRatio < 0.5) { // Широкое или высокое изображение
      baseRegionSize = Math.round(baseRegionSize * 1.2);
      baseRuler *= 1.1;
    }
    
    return {
      smooth: 'bilateral',
      slic_region: baseRegionSize,
      slic_ruler: baseRuler,
      min_element_size: baseMinElement,
      color_thresh: baseColorThresh,
      min_region_px: baseMinRegion,
      with_text_preserve: true,
      with_lines_preserve: true,
      stroke_outline: false,
      smoothing_level: smoothingLevel,
      with_animation: true,
    };
  };

  const { mounted, ready, progress, result, error, vectorize } = usePythonVectorizer();
  const previewUrlRef = useRef<string | null>(null);

  // Обработка результата
  useEffect(() => {
    if (result) {
      setSvgResult(result);
      setIsProcessing(false);
    }
  }, [result]);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setIsProcessing(false);
    }
  }, [error]);

  const handleFileSelect = async (file: File) => {
    console.log('handleFileSelect called with file:', file);
    
    try {
      console.log('Processing file with getImageFromFile...');
      const imageData = await getImageFromFile(file);
      console.log('ImageData created:', imageData);
      
      // Автоматически подбираем оптимальные настройки
      const optimalSettings = getOptimalSettings(imageData);
      setSettings(optimalSettings);
      console.log('Optimal settings applied:', optimalSettings);
      
      const dataUrl = URL.createObjectURL(file);
      console.log('DataURL created:', dataUrl);
      
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
      setSvgResult(null);
      
      console.log('File processing completed successfully');
    } catch (err) {
      console.error('Error processing file:', err);
    }
  };

  const handleImageInputChange = (imageData: any) => {
    console.log('ImageInput onChange called with:', imageData);
    
    if (imageData?.fileMetaData) {
      console.log('Converting data URL to file...');
      // Конвертируем data URL в File
      fetch(imageData.content)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], imageData.fileMetaData.name, {
            type: imageData.fileMetaData.type,
            lastModified: imageData.fileMetaData.lastModified,
          });
          console.log('File created:', file);
          handleFileSelect(file);
        })
        .catch(err => console.error('Error converting data URL to file:', err));
    } else {
      console.log('No fileMetaData found in imageData');
    }
  };


  const handleConvertToSvg = async () => {
    if (!originalImage.file) return;

    try {
      setIsProcessing(true);
      const imageData = await getImageFromFile(originalImage.file);
      
      await vectorize(imageData, settings);
    } catch (err) {
      console.error('Error converting to SVG:', err);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (svgResult) {
      const blob = new Blob([svgResult], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'converted.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
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
                text={!ready ? 'Loading OpenCV...' : isProcessing ? `Processing... ${Math.round(progress * 100)}%` : 'Convert to SVG'}
                onClick={handleConvertToSvg}
                disabled={!ready || isProcessing}
                isPrimary={true}
              />
            )}

            {isProcessing && (
              <ProgressBar>
                <ProgressFill progress={progress * 100} />
              </ProgressBar>
            )}

            {error && <ErrorMessage>Error: {error}</ErrorMessage>}
          </ImageContainer>

          <ImageContainer>
            {svgResult ? (
              <SvgPreview dangerouslySetInnerHTML={{ __html: svgResult }} />
            ) : (
              <Placeholder>No SVG result</Placeholder>
            )}

            {svgResult && (
              <DownloadTextButton text="Download SVG" onClick={handleDownload} />
            )}
          </ImageContainer>
        </ImagesContainer>

      </Form>

      <ToolCrossLinks toolKey="raster-to-svg" />
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

const SvgPreview = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid var(--surface-200);
  border-radius: 0.75rem;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }
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



const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: var(--surface-200);
  border-radius: 0.25rem;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: var(--primary-500);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
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

export { RasterToSvgMain };