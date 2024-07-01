import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { ImageType } from '@/types/image-types';

const ImageOptimizer: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [format, setFormat] = useState<string>('jpeg');
  const [optimizationLevel, setOptimizationLevel] = useState<string>('optimal');
  const [stripMetadata, setStripMetadata] = useState<boolean>(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [optimizedImageUrl, setOptimizedImageUrl] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [optimizedSize, setOptimizedSize] = useState<number | null>(null);
  const [reductionPercentage, setReductionPercentage] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = useCallback((imageData: ImageData) => {
    if (imageData && imageData.content && imageData.fileMetaData) {
      const byteString = atob(imageData.content.split(',')[1]);
      const mimeString = imageData.content.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], imageData.fileMetaData.name, { type: imageData.fileMetaData.type });
      setImage(file);
      setOriginalImageUrl(imageData.content);
      setOriginalSize(imageData.fileMetaData.size ?? null);
    }
  }, []);

  const handleFormatChange = (e: { value: string }) => {
    setFormat(e.value);
  };

  const handleOptimizationLevelChange = (e: { value: string }) => {
    setOptimizationLevel(e.value);
  };

  const handleStripMetadataChange = (e: CheckboxChangeEvent) => {
    setStripMetadata(e.checked as boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('format', format);
    formData.append('optimizationLevel', optimizationLevel);
    formData.append('stripMetadata', stripMetadata.toString());

    const response = await fetch('/api/optimize', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const { optimizedImage, originalSize, optimizedSize, reductionPercentage } = data;
      const url = `data:image/${format};base64,${optimizedImage}`;

      setOptimizedImageUrl(url);
      setOriginalSize(originalSize);
      setOptimizedSize(optimizedSize);
      setReductionPercentage(Math.round(reductionPercentage));
    } else {
      const errorData = await response.json();
      console.error('Failed to optimize image', errorData);
    }
  };

  const formatOptions = [
    { label: 'JPEG', value: 'jpeg' },
    { label: 'PNG', value: 'png' },
    { label: 'WebP', value: 'webp' },
    { label: 'TIFF', value: 'tiff' },
  ];

  const optimizationOptions = [
    { label: 'Minimal', value: 'minimal' },
    { label: 'Optimal', value: 'optimal' },
    { label: 'Maximum', value: 'maximum' },
  ];

  return (
    <Container>
      <Title>Image Optimization</Title>

      <Form onSubmit={handleSubmit}>
        <ImagesContainer>
          <ImageContainer>
            <ImageInputStyled 
              value={originalImageUrl ?? null} 
              onChange={handleImageChange} 
            />
            {originalImageUrl && (
              <>
                <TextOverlayTop>Original</TextOverlayTop>
                <TextOverlayBottom>{originalSize ? `${(originalSize / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayBottom>
              </>
            )}
          </ImageContainer>
          
          <ImageContainer>
            <Canvas ref={canvasRef} />
            {optimizedImageUrl ? (
              <>
                <ImageWithDownloadStyled
                  image={optimizedImageUrl}
                  fileName={`optimized.${format}`}
                />
                <TextOverlayTop>Optimized</TextOverlayTop>
                <TextOverlayBottom>{optimizedSize ? `${(optimizedSize / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayBottom>
                {reductionPercentage !== null && (
                  <OptimizationTag>{reductionPercentage}% Optimized</OptimizationTag>
                )}
              </>
            ) : (
              <ImagePlaceholder />
            )}
          </ImageContainer>
        </ImagesContainer>
        <Dropdown
          value={format}
          options={formatOptions}
          onChange={handleFormatChange}
          placeholder="Select Format"
        />
        <Dropdown
          value={optimizationLevel}
          options={optimizationOptions}
          onChange={handleOptimizationLevelChange}
          placeholder="Select Optimization Level"
        />
        <Button label="Optimize" type="submit" />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 48%;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

export { ImageOptimizer };