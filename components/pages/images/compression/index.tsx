import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { compressImage } from '@/api/images';
import { ImageWithDownload } from '@/components/ui/images/image-with-download';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { ImageType } from '@/types/image-types';
import { Label } from '@/components/ui/texts/label';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { UploadTextButton } from '@/components/ui/text-buttons/upload-text-button';

interface CompressedImage {
  content: string;
  size: number;
}

const CompressionOptions: {
  value: CompressionLevel;
  label: string;
  compression: string;
}[] = [
  { 
    value: 'minimal',
    label: 'Minimal',
    compression: '10-20',
  },
  { 
    label: 'Optimal', 
    value: 'optimal',
    compression: '30-50',
  },
  { 
    label: 'Maximum',
    value: 'maximum',
    compression: '50-70',
  },
];

type CompressionLevel = 'minimal' | 'optimal' | 'maximum';

const IMAGE_BOX_SIZE = '20rem';

const ImageCompressionMain: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('optimal');
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
      handleImageCompression(compressionLevel);
    }
  }, [originalImage]);

  useEffect(() => {
    if (originalImage) {
      setCompressedImage(null);
      handleImageCompression(compressionLevel);
    }
  }, [compressionLevel]);

  const handleImageCompression = async (compressionLevel: string) => {
    if (!originalImage) return;
    const imageFile = convertImageToFile();
    if (!imageFile) return;
    
    try {
      setLoading(true);
      const response = await compressImage(imageFile, originalImage.fileMetaData?.type as ImageType, compressionLevel);
      setLoading(false);
      const { image, size } = response;
      const content = `data:${originalImage.fileMetaData?.type};base64,${image}`;
      setCompressedImage({ content, size });
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const convertImageToFile = (): File | null => {
    if (!originalImage || !originalImage.content || !originalImage.fileMetaData?.type) return null;
    const byteString = atob(originalImage.content.split(',')[1]);
    const mimeString = originalImage.content.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], originalImage?.fileMetaData?.name, { type: originalImage?.fileMetaData?.type });
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
  
        if (Object.values(ImageType).includes(file.type as ImageType)) {
          setOriginalImage({
            content,
            fileMetaData: {
              name: file.name,
              size: file.size,
              type: file.type as ImageType, 
              lastModified: file.lastModified,
            },
          });
        } else {
          console.error("Unsupported file type:", file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  const handleDownloadImage = () => {
    if (!compressedImage?.content) return;
    const link = document.createElement('a');
    link.href = compressedImage.content;
    link.download = originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-compressed$&') ?? 'compressed-image';
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
              $selected={compressionLevel === option.value}
              onClick={() => setCompressionLevel(option.value)}
            >
              <h4>{option.label}</h4>
              <p>~{option.compression}% Compression</p>
              <RadioCircle 
                $checked={compressionLevel === option.value}
              />
            </CompressionOption>
          ))}
        </CompressionContainer>

        <ImageLabel>
          Supported formats:<br />JPEG, PNG, WEBP, GIF or AVIF 
        </ImageLabel>

        <ImagesContainer>
          <ImageContainer>
            <ImageInputStyled 
              value={originalImage?.content ?? null} 
              onChange={setOriginalImage} 
            />
            {originalImage?.content && (
              <>
                <TextOverlayTop>{originalImage?.fileMetaData?.size ? `${(originalImage?.fileMetaData?.size / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayTop>
              </>
            )}
          </ImageContainer>
          
          <ImageContainer>
            {compressedImage ? (
              <>
                <ImageWithDownloadStyled
                  image={compressedImage.content}
                  fileName={originalImage?.fileMetaData?.name.replace(/\.[^.]+$/, '-compressed$&')}
                />
                <TextOverlayTop>{compressedImage.size ? `${(compressedImage.size / 1024).toFixed(2)} KB` : 'N/A'}</TextOverlayTop>
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
          <DownloadButtonContainer>
            <UploadTextButton 
              text='Upload Image'
              onFileSelect={handleFileSelect}
            />
            {compressedImage?.content && (
              <DownloadTextButton
                text='Download Image'
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
  padding: 1rem 0;

  @media (max-width: 600px) {
    padding: 0.5rem 0;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 600px) {
    gap: 0.5rem;
    max-width: 100vw;
  }
`;

const ImageLabel = styled(Label)`
  width: 48%;
  line-height: 1.5;
  color: var(--text-color);

  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 48%;

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    margin-bottom: 0.5rem;
  }
`;

const ImagePlaceholderStyled = styled(ImagePlaceholder)`
  width: ${IMAGE_BOX_SIZE};
  height: ${IMAGE_BOX_SIZE};
  max-width: 100%;
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    min-height: 10rem;
  }
`;

const DownloadButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
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
  top: -1.5rem;
`;

const ImageInputStyled = styled(ImageInput)`
  width: ${IMAGE_BOX_SIZE};
  height: ${IMAGE_BOX_SIZE};
  min-height: ${IMAGE_BOX_SIZE};
  max-width: 100%;
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    min-height: 10rem;
  }
`;

const ImageWithDownloadStyled = styled(ImageWithDownload)`
  width: ${IMAGE_BOX_SIZE};
  height: ${IMAGE_BOX_SIZE};
  max-width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    img {
      height: auto;
      min-height: 10rem;
    }
  }
`;

const CompressionTag = styled.div`
  background: var(--primary-color);
  color: var(--gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  position: absolute;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
`;

const CompressionLabel = styled(Label)`
  text-align: left;
  width: 100%;
  font-size: 1rem;
`;

const CompressionContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

const CompressionOption = styled.div.attrs<{ $selected?: boolean }>(({ $selected }) => ({
  className: $selected ? 'selected' : '',
}))`
  position: relative;
  color: var(--text-color);
  border: 0.0625rem solid var(--gray-300);
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }

  &.selected {
    border-color: var(--primary-color);
  }

  h4 {
    margin: 0 0 0 1.75rem;
    font-size: 0.75rem;
  }

  p {
    margin: 0 0 0 1.75rem;
    font-size: 0.75rem;
  }

  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
`;

const RadioCircle = styled.div.attrs<{ $checked?: boolean }>(({ $checked }) => ({
  className: $checked ? 'checked' : '',
}))`
  position: absolute;
  top: 1rem;
  left: 0.75rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 0.0625rem solid var(--surface-border);
  background: var(--surface-ground);
  transition: all 0.3s ease-in-out;

  &.checked {
    background: var(--primary-color);
    border-color: var(--primary-color);
  }

  &::after {
    content: '';
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--gray-50);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export { ImageCompressionMain };