import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { ImageType } from '@/types/image-types';

import { ImageData, ImageInput } from '@/components/ui/inputs/image-input';
import { SingleColumnContainer } from '@/components/ui/containers';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { DefaultQuality, ImageSettings, Settings } from '@/components/pages/images/optimization/image-settings';

interface OriginalImage {
  content: string;
  fileName: string;
  size: number;
  type: ImageType;
  width: number;
  height: number;
}

interface OptimizedImage {
  content: string;
  size: number;
}

const Key = 'image-settings';

interface Props {
}

const ImageOptimization: React.FC<Props> = ({}) => {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  const imageRatio = useMemo(() => (originalImage?.width ?? 1) / (originalImage?.height ?? 1), [originalImage]);
  const optimizationPercentage = useMemo(() => Math.floor((1 - ((optimizedImage?.size ?? 1) / (originalImage?.size ?? 1))) * 100), [optimizedImage, originalImage]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (settings !== null) {
      saveSettingsToStorage();
    }

    GAService.logEvent(analyticsEvents.imageOptimization.optimizationSettingsChanged(JSON.stringify(settings)));

    if (!originalImage) {
      return;
    }

    const imageElement = new Image();

    imageElement.onload = () => {
      renderCanvas(imageElement, settings?.width ?? 0, settings?.height ?? 0);
    };

    imageElement.src = originalImage.content;

    generateOptimizedImage();
  }, [settings]);

  const handleImageChange = (image: ImageData) => {
    if (!image || !image.content) {
      return;
    }

    const imageElement = new Image();

    imageElement.onload = () => {
      setOriginalImage({
        content: image.content ?? '',
        fileName: image.fileMetaData?.name ?? ImageType.JPEG,
        size: image.fileMetaData?.size ?? 0,
        type: image.fileMetaData?.type ?? ImageType.JPEG,
        width: imageElement.width,
        height: imageElement.height,
      });

      if (!settings) {
        let originalSettings = getSettingsFromStorage();

        if (originalSettings) {
          originalSettings.height = Math.round((imageElement.height / imageElement.width) * originalSettings.width);
        } else {
          originalSettings = {
            width: imageElement.width,
            height: imageElement.height,
            type: image.fileMetaData?.type ?? ImageType.JPEG,
            quality: DefaultQuality,
          };
        }
        
        setSettings(originalSettings);
      }

      renderCanvas(
        imageElement, 
        settings?.width ?? imageElement.width, 
        settings?.height ?? imageElement.height,
      );

      GAService.logEvent(analyticsEvents.imageOptimization.imageUploadedForOptimization(`Image Uploaded: ${image.fileMetaData?.name}`));
    };

    imageElement.src = image.content;
  };

  const renderCanvas = (imageElement: HTMLImageElement, width: number, height: number) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    canvas.width = width;
    
    canvas.height = height;
    
    ctx.drawImage(imageElement, 0, 0, width, height);

    generateOptimizedImage();
  }

  const generateOptimizedImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const content = canvas.toDataURL(settings?.type, (settings?.quality ?? 100) / 100);
    const size = content.length * 0.75;

    setOptimizedImage({ content, size });

    GAService.logEvent(analyticsEvents.imageOptimization.imageOptimizedAndDownloaded(`Optimized Image Size: ${(size / 1024).toFixed(2)} KB`));
  }

  const getSettingsFromStorage = (): Settings | null => {
    const savedSettings = localStorage.getItem(Key);

    if (!savedSettings) {
      return null;
    }

    const settings = JSON.parse(savedSettings);

    return settings as Settings;
  }

  const saveSettingsToStorage = () => {
    localStorage.setItem(Key, JSON.stringify(settings));
  }

  return (
    <SingleColumnContainer>
      <InputAndImageContainer>
        <ImageContainer>
          <ImageInputStyled 
            value={originalImage?.content ?? null} 
            onChange={handleImageChange} 
          />

          {originalImage && (
            <>
              <TextOverlayTop>Original</TextOverlayTop>

              <TextOverlayBottom>{`${originalImage.width}x${originalImage.height}px`}</TextOverlayBottom>
            </>  
          )}
        </ImageContainer>
        
        <ImageContainer>
          <Canvas ref={canvasRef} />

          {optimizedImage?.content 
            ? (
              <>
                <ImageWithDownloadStyled
                  image={optimizedImage?.content ?? ''}
                  fileName={`${originalImage?.fileName?.split('.')[0]}-optimized.${settings?.type?.split('/')[1]}`}
                />

                <TextOverlayTop>Optimized</TextOverlayTop>
                
                <TextOverlayBottom>{`${settings?.width}x${settings?.height}px`}</TextOverlayBottom>
              </>
            )
            : (
              <ImagePlaceholder />
            )
          }
        </ImageContainer>
      </InputAndImageContainer>

      {originalImage && optimizedImage && (
        <SizeContainer>
          <div>
            <ImageSizeText>Size: {(originalImage.size / 1024).toFixed(2)} KB</ImageSizeText>
          </div>

          <div>
            <ImageSizeText>Size: {(optimizedImage.size / 1024).toFixed(2)} KB</ImageSizeText>
                
            {optimizationPercentage > 0 && (
              <OptimizationTag>{optimizationPercentage}% Optimized</OptimizationTag>
            )}
          </div>
        </SizeContainer> 
      )}

      {optimizedImage && settings && (
        <ImageSettings 
          settings={settings}
          onChange={setSettings}
          originalRatio={imageRatio}
        />
      )}
    </SingleColumnContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: -1;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;

const TextOverlay = styled.div`
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 10;
  font-size: 0.75rem;
`;

const TextOverlayTop = styled(TextOverlay)`
  top: 0.25rem;
`;

const TextOverlayBottom = styled(TextOverlay)`
  bottom: 0.25rem;
`;

const ImageInputStyled = styled(ImageInput)`
  width: 20rem;
  min-height: 10rem;
`;

const ImageWithDownloadStyled = styled(ImageWithDownload)`
  img {
    width: 20rem;
  }
`;

const OptimizationTag = styled.div`
  background: var(--primary-color);
  color: var(--gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
`;

const InputAndImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const SizeContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 1.5rem;

  > div {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
  }
`;

const ImageSizeText = styled.div`
  font-size: 0.75rem;
`;

export { ImageOptimization };