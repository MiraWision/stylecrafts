import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { optimizeImage } from '@/api/images';

import { Button } from 'primereact/button';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { ImageType } from '@/types/image-types';
import { Label } from '@/components/ui/texts/label';

interface OptimizedImage {
  content: string;
  size: number;
}

const OptimizationOptions = [
  { 
    value: 'minimal',
    label: 'Minimal',
    optimization: '10-20',
  },
  { 
    label: 'Optimal', 
    value: 'optimal',
    optimization: '30-50',
    best: true,
  },
  { 
    label: 'Maximum',
    value: 'maximum',
    optimization: '50-70',
  },
];

const ImageOptimizer: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);

  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const optimizationPercentage = useMemo(() => {
    if (originalImage?.fileMetaData?.size && optimizedImage?.size) {
      return Math.round((1 - (optimizedImage.size / originalImage.fileMetaData.size)) * 100);
    }

    return null;
  }, [originalImage, optimizedImage]);

  useEffect(() => {
    if (originalImage) {
      setOptimizedImage(null);
    }
  }, [originalImage]);

  const handleImageOptimization = async (optimizationLevel: string) => {
    if (!originalImage) {
      return;
    }

    const imageFile = convertImageToFile();

    if (!imageFile) {
      return;
    }

    try {
      setLoading(true);

      const response = await optimizeImage(
        imageFile,
        originalImage.fileMetaData?.type as ImageType,
        optimizationLevel,
      );

      setLoading(false);

      const { image, size } = response;

      const content = `data:${originalImage.fileMetaData?.type};base64,${image}`;

      setOptimizedImage({ content, size });
    } catch (error) {
      console.error('Error optimizing image:', error);
    }
  };

  const convertImageToFile = (): File | null => {
    if (!originalImage || !originalImage.content || !originalImage.fileMetaData?.type) {
      return null;
    }

    const byteString = atob(originalImage.content.split(',')[1]);

    const mimeString = originalImage.content.split(',')[0].split(':')[1].split(';')[0];
    
    const ab = new ArrayBuffer(byteString.length);
    
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });

    const file = new File([blob], originalImage?.fileMetaData?.name, { type: originalImage?.fileMetaData?.type });
    
    return file;
  };

  const handleDownloadImage = () => {
    if (!optimizedImage?.content) {
      return;
    }

    const link = document.createElement('a');

    link.href = optimizedImage.content;

    link.download = originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-optimized$&') ?? 'optimized-image';

    link.click();
  };

  return (
    <Container>
      <Form>
        <ImagesContainer>
          <ImageLabel>
            Upload Image in one of the following formats:<br />JPEG, PNG, WEBP, TIFF, GIF, AVIF, or HEIF
          </ImageLabel>

          <DownloadButtonContainer>
            {optimizedImage?.content && (
              <DownloadButton
                label='Download Image'
                icon='pi pi-download'
                onClick={handleDownloadImage}
              />
            )}
          </DownloadButtonContainer>
        </ImagesContainer>

        <ImagesContainer>
          <ImageContainer>
            <ImageInputStyled 
              value={originalImage?.content ?? null} 
              onChange={setOriginalImage} 
            />

            {originalImage?.content && (
              <>
                <TextOverlayTop>Original</TextOverlayTop>

                <TextOverlayBottom>{originalImage?.fileMetaData?.size ? `${(originalImage?.fileMetaData?.size / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayBottom>
              </>
            )}
          </ImageContainer>
          
          <ImageContainer>
            {optimizedImage ? (
              <>
                <ImageWithDownloadStyled
                  image={optimizedImage.content}
                  fileName={originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-optimized$&')}
                />

                <TextOverlayTop>Optimized</TextOverlayTop>
                
                <TextOverlayBottom>{optimizedImage.size ? `${(optimizedImage.size / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayBottom>
                
                {optimizationPercentage !== null && (
                  <OptimizationTag>{optimizationPercentage}% Optimized</OptimizationTag>
                )}
              </>
            ) : (
              <ImagePlaceholderStyled isLoading={loading} />
            )}
          </ImageContainer>
        </ImagesContainer>

        <OptimizationLabel>Select Optimization Level</OptimizationLabel> 

        <OptimizationContainer>
          {OptimizationOptions.map((option) => (
            <OptimizationOption 
              key={option.value}
              $best={option.best}
              onClick={() => handleImageOptimization(option.value)}
            >
              <h4>{option.label}</h4>

              <p>~{option.optimization}% Optimization</p>
            </OptimizationOption>
          ))}
        </OptimizationContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageLabel = styled(Label)`
  margin-top: 1rem;
  text-align: center;
  width: 48%;
  line-height: 1.5;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImagePlaceholderStyled = styled(ImagePlaceholder)`
  height: 100%;
`;

const DownloadButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const DownloadButton = styled(Button)`
  width: fit-content;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--primary-color);
  background: transparent;
  border: 0.0625rem solid var(--primary-color);
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
  width: 100%;
  min-height: 10rem;
`;

const ImageWithDownloadStyled = styled(ImageWithDownload)`
  img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
`;

const OptimizationTag = styled.div`
  background: var(--primary-color);
  color: var(--gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const OptimizationLabel = styled(Label)`
  margin-top: 1rem;
  text-align: center;
  width: 100%;
`;

const OptimizationContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
`;

const OptimizationOption = styled.div.attrs<{ $best?: boolean }>(({ $best }) => ({
  className: $best ? 'best' : '',
}))`
  color: var(--text-color-secondary);
  border: 0.0625rem solid var(--gray-300);
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }

  &.best {
    color: var(--primary-color);
    border-color: var(--primary-color);
    transform: scale(1.1);

    &:hover {
      transform: scale(1.15);
    }

    &:active {
      transform: scale(1.1);
    }
  }

  h4 {
    margin: 0;
    font-size: 0.75rem;
    text-transform: uppercase;  
  }

  p {
    margin: 0;
    font-size: 0.75rem;
  }
`;

export { ImageOptimizer };