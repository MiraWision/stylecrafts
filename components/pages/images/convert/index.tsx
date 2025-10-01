import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { Label } from '@/components/ui/texts/label';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';

// ===== Types =====

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};

interface ConvertSettings {
  outputFormat: 'png' | 'jpg' | 'webp' | 'avif';
  quality: number;
  backgroundColor: string;
}

// ===== Component =====

const ConvertMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });

  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

  const [settings, setSettings] = useState<ConvertSettings>({
    outputFormat: 'png',
    quality: 90,
    backgroundColor: '#ffffff'
  });

  const previewUrlRef = useRef<string | null>(null);

  // Mount flag for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileSelect = async (file: File) => {
    try {
      const dataUrl = URL.createObjectURL(file);
      
      setOriginalImage({
        file,
        previewUrl: dataUrl,
        dataUrl: dataUrl,
      });

      // Загружаем размеры изображения
      loadImageDimensions(file);

      // Очищаем предыдущий URL
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = dataUrl;

      // Сбрасываем результат
      setConvertedImage(null);
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

  const updateSetting = <K extends keyof ConvertSettings>(key: K, value: ConvertSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleConvert = async () => {
    if (!originalImage.file) return;

    try {
      setIsProcessing(true);
      // Здесь будет логика конвертации
      // Пока что просто копируем изображение
      setConvertedImage(originalImage.dataUrl);
    } catch (err) {
      console.error('Error converting image:', err);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.download = `converted-image.${settings.outputFormat || 'png'}`;
      link.href = convertedImage;
      link.click();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getImageDimensions = (file: File): string => {
    if (!imageDimensions) return 'Loading...';
    const { width, height } = imageDimensions;
    
    const aspectRatio = getAspectRatio(width, height);
    return `${width} × ${height}${aspectRatio ? ` (${aspectRatio})` : ''}`;
  };

  const getFileSize = (file: File) => {
    return formatFileSize(file.size);
  };

  const getAspectRatio = (width: number, height: number) => {
    const ratio = width / height;
    
    if (Math.abs(ratio - 1) < 0.01) {
      return '1:1';
    } else if (Math.abs(ratio - 16/9) < 0.01) {
      return '16:9';
    } else if (Math.abs(ratio - 4/3) < 0.01) {
      return '4:3';
    } else if (Math.abs(ratio - 3/2) < 0.01) {
      return '3:2';
    } else if (Math.abs(ratio - 5/4) < 0.01) {
      return '5:4';
    } else if (Math.abs(ratio - 2/1) < 0.01) {
      return '2:1';
    } else if (Math.abs(ratio - 1/2) < 0.01) {
      return '1:2';
    } else if (Math.abs(ratio - 9/16) < 0.01) {
      return '9:16';
    } else if (Math.abs(ratio - 3/4) < 0.01) {
      return '3:4';
    } else if (Math.abs(ratio - 2/3) < 0.01) {
      return '2:3';
    }
    
    return '';
  };

  const loadImageDimensions = (file: File) => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  };

  if (!mounted) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  const formatOptions = [
    { label: 'PNG', value: 'png' },
    { label: 'JPG', value: 'jpg' },
    { label: 'WebP', value: 'webp' },
    { label: 'AVIF', value: 'avif' },
  ];

  return (
    <Container>
      <Form>
        <ImagesContainer>
          <ImageContainer>
            <ImageInputWrapper>
              <ImageInputStyled 
                value={originalImage.previewUrl || originalImage.dataUrl} 
                onChange={handleImageInputChange} 
              />
              {originalImage.file && (
                <>
                  <ImageInfoOverlay>
                    <ImageInfoText>
                      {originalImage.file && getImageDimensions(originalImage.file)}
                    </ImageInfoText>
                  </ImageInfoOverlay>
                  <ImageFileSizeOverlay>
                    <ImageInfoText>
                      {originalImage.file && getFileSize(originalImage.file)}
                    </ImageInfoText>
                  </ImageFileSizeOverlay>
                </>
              )}
            </ImageInputWrapper>
          </ImageContainer>

          <ImageContainer>
            {convertedImage ? (
              <ImagePreviewWrapper>
                <ImagePreview src={convertedImage} alt="Converted" />
                <ImageInfoOverlay>
                  <ImageInfoText>
                    {originalImage.file && getImageDimensions(originalImage.file)}
                  </ImageInfoText>
                </ImageInfoOverlay>
                <ImageFileSizeOverlay>
                  <ImageInfoText>
                    {originalImage.file && getFileSize(originalImage.file)}
                  </ImageInfoText>
                </ImageFileSizeOverlay>
              </ImagePreviewWrapper>
            ) : (
              <Placeholder>No converted image</Placeholder>
            )}
          </ImageContainer>
        </ImagesContainer>

        <ButtonsRow>
          <ButtonColumn>
            {(originalImage.previewUrl || originalImage.dataUrl) && (
              <BaseTextButton
                text={isProcessing ? 'Converting...' : 'Convert Image'}
                onClick={handleConvert}
                disabled={isProcessing}
                isPrimary={true}
              />
            )}
          </ButtonColumn>
          <ButtonColumn>
            {convertedImage && (
              <DownloadTextButton text="Download Converted Image" onClick={handleDownload} />
            )}
          </ButtonColumn>
        </ButtonsRow>

        <ControlsSection>
          <TopControlsRow>
            <ControlGroup>
              <Label>Output Format</Label>
              <FormatGrid>
                {formatOptions.map((format, index) => (
                  <FormatButtonWrapper key={format.value} $isFirst={index === 0} $isLast={index === formatOptions.length - 1}>
                    <BaseTextButton
                      text={format.label}
                      onClick={() => updateSetting('outputFormat', format.value as 'png' | 'jpg' | 'webp' | 'avif')}
                      isPrimary={settings.outputFormat === format.value}
                    />
                  </FormatButtonWrapper>
                ))}
              </FormatGrid>
            </ControlGroup>

            <ControlGroup>
              <Label>Quality Settings</Label>
              <QualityRow>
                <QualitySlider
                  type="range"
                  min="10"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => updateSetting('quality', parseInt(e.target.value))}
                />
                <QualityLabel>{settings.quality}%</QualityLabel>
              </QualityRow>
            </ControlGroup>
          </TopControlsRow>

          {settings.outputFormat === 'jpg' && (
            <ControlGroup>
              <Label>Background Color (for transparency)</Label>
              <BackgroundRow>
                <BackgroundInput
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                />
                <BackgroundText>{settings.backgroundColor}</BackgroundText>
              </BackgroundRow>
            </ControlGroup>
          )}
        </ControlsSection>
      </Form>

      <ToolCrossLinks toolKey="image-convert" />
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
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 12rem;

  @media (max-width: 600px) {
    min-height: 10rem;
  }
`;

const ImageInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ImageInputStyled = styled(ImageInput)`
  width: 100%;
  height: 100%;
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

const ImageInfoOverlay = styled.div`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const ImageFileSizeOverlay = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const ImageInfoText = styled.span`
  color: white;
  font-family: monospace;
  white-space: nowrap;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    min-height: 10rem;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  min-height: 12rem;
  border: 1px solid var(--surface-200);
  border-radius: 0.75rem;
  object-fit: contain;
  background: white;

  @media (max-width: 600px) {
    min-height: 10rem;
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

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TopControlsRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormatGrid = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormatButtonWrapper = styled.div<{ $isFirst: boolean; $isLast: boolean }>`
  display: flex;
`;

const QualityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QualityLabel = styled.span`
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
`;

const QualitySlider = styled.input`
  flex: 1;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: var(--surface-200);
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }
`;

const BackgroundRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackgroundInput = styled.input`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const BackgroundText = styled.span`
  font-family: monospace;
  font-size: 1rem;
  color: var(--text-color);
`;

export default ConvertMain;