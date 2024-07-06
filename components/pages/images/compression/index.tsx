import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { compressImage } from '@/api/images';

import { Button } from 'primereact/button';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { ImageType } from '@/types/image-types';
import { Label } from '@/components/ui/texts/label';

interface CompressedImage {
  content: string;
  size: number;
}

const CompressionOptions = [
  { 
    value: 'minimal',
    label: 'Minimal',
    compression: '10-20',
  },
  { 
    label: 'Optimal', 
    value: 'optimal',
    compression: '30-50',
    best: true,
  },
  { 
    label: 'Maximum',
    value: 'maximum',
    compression: '50-70',
  },
];

const ImageCompressionMain: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);

  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const compressionPercentage = useMemo(() => {
    if (originalImage?.fileMetaData?.size && compressedImage?.size) {
      return Math.round((1 - (compressedImage.size / originalImage.fileMetaData.size)) * 100);
    }

    return null;
  }, [originalImage, compressedImage]);

  useEffect(() => {
    if (originalImage) {
      setCompressedImage(null);
    }
  }, [originalImage]);

  const handleImageCompression = async (compressionLevel: string) => {
    if (!originalImage) {
      return;
    }

    const imageFile = convertImageToFile();

    if (!imageFile) {
      return;
    }

    try {
      setLoading(true);

      const response = await compressImage(
        imageFile,
        originalImage.fileMetaData?.type as ImageType,
        compressionLevel,
      );

      setLoading(false);

      const { image, size } = response;

      const content = `data:${originalImage.fileMetaData?.type};base64,${image}`;

      setCompressedImage({ content, size });
    } catch (error) {
      console.error('Error compressing image:', error);
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
    if (!compressedImage?.content) {
      return;
    }

    const link = document.createElement('a');

    link.href = compressedImage.content;

    link.download = originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-compressd$&') ?? 'compressd-image';

    link.click();
  };

  return (
    <Container>
      <Form>
        <CompressionLabel>Select Compression Level</CompressionLabel> 

        <CompressionContainer>
          {CompressionOptions.map((option) => (
            <CompressionOption 
              key={option.value}
              $best={option.best}
              onClick={() => handleImageCompression(option.value)}
            >
              <h4>{option.label}</h4>

              <p>~{option.compression}% Compression</p>
            </CompressionOption>
          ))}
        </CompressionContainer>

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
            {compressedImage ? (
              <>
                <ImageWithDownloadStyled
                  image={compressedImage.content}
                  fileName={originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-compressd$&')}
                />

                <TextOverlayTop>Compressed</TextOverlayTop>
                
                <TextOverlayBottom>{compressedImage.size ? `${(compressedImage.size / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayBottom>
                
                {compressionPercentage !== null && (
                  <CompressionTag>{compressionPercentage}% Saved</CompressionTag>
                )}
              </>
            ) : (
              <ImagePlaceholderStyled isLoading={loading} />
            )}
          </ImageContainer>
        </ImagesContainer>

        <ImagesContainer>
          <ImageLabel>
            Upload Image in one of the following formats:<br />JPEG, PNG, WEBP, TIFF, GIF, AVIF, or HEIF
          </ImageLabel>

          <DownloadButtonContainer>
            {compressedImage?.content && (
              <DownloadButton
                label='Download Image'
                icon='pi pi-download'
                onClick={handleDownloadImage}
              />
            )}
          </DownloadButtonContainer>
        </ImagesContainer>
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

const CompressionTag = styled.div`
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

const CompressionLabel = styled(Label)`
  text-align: center;
  width: 100%;
`;

const CompressionContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const CompressionOption = styled.div.attrs<{ $best?: boolean }>(({ $best }) => ({
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

export { ImageCompressionMain };