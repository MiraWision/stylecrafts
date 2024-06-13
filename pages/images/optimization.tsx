import React, { useState, useRef, useEffect, useMemo, use } from 'react';
import styled from 'styled-components';

import { content } from '@/content/function-descriptions/image-optimization';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import { ImageData, ImageInput } from '@/components/ui/inputs/image-input';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { Title } from '@/components/ui/typography';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ImageSettings, Settings } from '@/components/pages/optimization/image-settings';
import { ImageType } from '@/types/image-types';

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

const ImageOptimizationToolPage = () => {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  const imageRatio = useMemo(() => (originalImage?.width ?? 1) / (originalImage?.height ?? 1), [originalImage]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    generateOptimizedImage();
  }, [settings]);

  const handleImageChange = (image: ImageData) => {
    if (!image || !image.content) {
      return;
    }

    const imageElement = new Image();

    imageElement.src = image.content;

    imageElement.onload = () => {
      setOriginalImage({
        content: image.content ?? '',
        fileName: image.fileMetaData?.name ?? ImageType.JPEG,
        size: image.fileMetaData?.size ?? 0,
        type: image.fileMetaData?.type ?? ImageType.JPEG,
        width: imageElement.width,
        height: imageElement.height,
      });

      loadCanvas(imageElement, imageElement.width, imageElement.height);
    };
  };

  const loadCanvas = (imageElement: HTMLImageElement, width: number, height: number) => {
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
  }

  const generateOptimizedImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const content = canvas.toDataURL(settings?.type, (settings?.quality ?? 100) / 100);

    const size = content.length * 0.75;

    setOptimizedImage({ content, size });
  }

  return (
    <BaseLayout>
      <Toast ref={toast} />

      <MainContainer>
        <Title>Image Optimization</Title>
  
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
              {optimizedImage 
                ? (
                  <>
                    <Сanvas ref={canvasRef} />

                    <ImageWithDownloadStyled
                      image={optimizedImage?.content ?? ''}
                      fileName={`${originalImage?.fileName.split('.')[0]}-optimized.${settings?.type.split('/')[1]}`}
                    />

                    <TextOverlayTop>Optimized</TextOverlayTop>

                    <TextOverlayBottom>{`${settings?.width}x${settings?.height}px`}</TextOverlayBottom>
                    
                    <OptimizationTag>x45 Optimize</OptimizationTag>
                  </>
                )
                : (
                  <ImagePlaceholder />
                )
              }
            </ImageContainer>
          </InputAndImageContainer>

          {image && (
            <>
              {imageSize && <ImageSizeText>Image Size: {(imageSize / 1024).toFixed(2)} KB</ImageSizeText>}
              
              <ImageSettings 
                settings={settings}
                onChange={setSettings}
                originalRatio={imageRatio}
              />
            </>
          )}
        </SingleColumnContainer>
      </MainContainer>  

      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer> 
    </BaseLayout>
  );
};

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Сanvas = styled.canvas`
  position: absolute;
  z-index: -1;
`;

const TextOverlay = styled.div`
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  z-index: 10;
  font-size: 1rem;
`;

const TextOverlayTop = styled(TextOverlay)`
  top: 10px;
`;

const TextOverlayBottom = styled(TextOverlay)`
  bottom: 10px;
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
  position: absolute;
  top: 4.5rem;
  left: -1.7rem;
  background: var(--primary-color);
  color: var(--gray-50);
  padding: 0.5rem 2rem;
  border-radius: 0 0 5px 0;
  z-index: 10;
  font-size: 0.9rem;
  transform: rotate(-40deg);
  transform-origin: 0 0;
`;

const InputAndImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const ImageSizeText = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default ImageOptimizationToolPage;