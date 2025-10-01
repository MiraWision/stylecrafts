import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { Label } from '@/components/ui/texts/label';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';
import { useImageResizer, ResizeSettings, ResizePreset } from '@/hooks/use-image-resizer';

// ===== Types =====

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};

// ===== Component =====

const ResizeMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });

  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

  const [settings, setSettings] = useState<ResizeSettings>({
    maintainAspectRatio: true,
    format: 'png',
    quality: 0.9,
  });

  const { isProcessing: hookProcessing, error, result, resizeImage, reset, presets } = useImageResizer();
  const previewUrlRef = useRef<string | null>(null);

  // Быстрые шаблоны размеров
  const quickTemplates = [
    { label: '1:1 (Square)', width: 512, height: 512 },
    { label: '16:9 (Widescreen)', width: 1920, height: 1080 },
    { label: '4:3 (Standard)', width: 1024, height: 768 },
    { label: '3:2 (Photo)', width: 1200, height: 800 },
    { label: 'Instagram Post', width: 1080, height: 1080 },
    { label: 'Instagram Story', width: 1080, height: 1920 },
    { label: 'Facebook Cover', width: 1200, height: 630 },
    { label: 'Twitter Header', width: 1500, height: 500 },
    { label: 'LinkedIn Banner', width: 1584, height: 396 },
    { label: 'YouTube Thumbnail', width: 1280, height: 720 },
    { label: 'Favicon', width: 32, height: 32 },
    { label: 'A4 (300 DPI)', width: 2480, height: 3508 },
  ];

  const formatOptions = [
    { label: 'PNG', value: 'png' },
    { label: 'JPG', value: 'jpg' },
    { label: 'WebP', value: 'webp' },
  ];

  // Mount flag for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Обработка результата
  useEffect(() => {
    if (result?.success) {
      setResizedImage(result.resizedImage || null);
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
      setResizedImage(null);
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

  const updateSetting = <K extends keyof ResizeSettings>(key: K, value: ResizeSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleTemplateSelect = (template: { width: number; height: number }) => {
    setSettings(prev => ({
      ...prev,
      width: template.width,
      height: template.height,
      maintainAspectRatio: false,
    }));
  };

  const handleResize = async () => {
    if (!originalImage.file) return;

    try {
      setIsProcessing(true);
      await resizeImage(originalImage.file, settings);
    } catch (err) {
      console.error('Error resizing image:', err);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.download = `resized-image.${settings.format || 'png'}`;
      link.href = resizedImage;
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

            {error && <ErrorMessage>Error: {error}</ErrorMessage>}
          </ImageContainer>

          <ImageContainer>
            {resizedImage ? (
              <ImagePreviewWrapper>
                <ImagePreview src={resizedImage} alt="Resized" />
                {result?.success && (
                  <>
                    <ImageInfoOverlay>
                      <ImageInfoText>
                        {result.newSize?.width} × {result.newSize?.height}
                        {result.newSize?.width && result.newSize?.height && getAspectRatio(result.newSize.width, result.newSize.height) && (
                          ` (${getAspectRatio(result.newSize.width, result.newSize.height)})`
                        )}
                      </ImageInfoText>
                    </ImageInfoOverlay>
                    <ImageFileSizeOverlay>
                      <ImageInfoText>
                        {result.fileSize ? formatFileSize(result.fileSize) : 'Unknown'}
                      </ImageInfoText>
                    </ImageFileSizeOverlay>
                  </>
                )}
              </ImagePreviewWrapper>
            ) : (
              <Placeholder>No resized image</Placeholder>
            )}
          </ImageContainer>
        </ImagesContainer>

        <ButtonsRow>
          <ButtonColumn>
            {(originalImage.previewUrl || originalImage.dataUrl) && (
              <BaseTextButton
                text={isProcessing ? 'Resizing...' : 'Resize Image'}
                onClick={handleResize}
                disabled={isProcessing}
                isPrimary={true}
              />
            )}
          </ButtonColumn>
          <ButtonColumn>
            {resizedImage && (
              <DownloadTextButton text="Download Resized Image" onClick={handleDownload} />
            )}
          </ButtonColumn>
        </ButtonsRow>

        <ControlsSection>
          <TopControlsRow>
            <ControlGroup>
              <Label>Custom Size</Label>
              <SizeInputsWithToggle>
                <SizeInput
                  type="number"
                  placeholder="Width"
                  value={settings.width || ''}
                  onChange={(e) => updateSetting('width', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                />
                <SizeInput
                  type="number"
                  placeholder="Height"
                  value={settings.height || ''}
                  onChange={(e) => updateSetting('height', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                />
                <AspectRatioIconButton 
                  $active={settings.maintainAspectRatio || false}
                  onClick={() => updateSetting('maintainAspectRatio', !settings.maintainAspectRatio)}
                  title={settings.maintainAspectRatio ? 'Keep Aspect Ratio' : 'Custom Size'}
                >
                  🔗
                </AspectRatioIconButton>
              </SizeInputsWithToggle>
            </ControlGroup>

            <ControlGroup>
              <Label>Output Format</Label>
              <FormatGrid>
                {formatOptions.map((format, index) => (
                  <FormatButtonWrapper key={format.value} $isFirst={index === 0} $isLast={index === formatOptions.length - 1}>
                    <BaseTextButton
                      text={format.label}
                      onClick={() => updateSetting('format', format.value as 'jpg' | 'png' | 'webp')}
                      isPrimary={settings.format === format.value}
                    />
                  </FormatButtonWrapper>
                ))}
              </FormatGrid>
            </ControlGroup>
          </TopControlsRow>

          <ControlGroup>
            <Label>Quick Templates</Label>
            <TemplateGrid>
              {quickTemplates.map((template, index) => (
                <TemplateButton
                  key={index}
                  $selected={settings.width === template.width && settings.height === template.height}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <TemplateName>{template.label}</TemplateName>
                  <TemplateSize>{template.width} × {template.height}</TemplateSize>
                </TemplateButton>
              ))}
            </TemplateGrid>
          </ControlGroup>
        </ControlsSection>
      </Form>

      <ToolCrossLinks toolKey="image-resize" />
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

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const TemplateButton = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.$selected ? 'var(--primary-color)' : 'var(--surface-300)'};
  border-radius: 0.5rem;
  background: ${props => props.$selected ? 'var(--primary-50)' : 'white'};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  min-height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    border-color: var(--primary-color);
    background: ${props => props.$selected ? 'var(--primary-50)' : 'var(--surface-50)'};
  }
`;

const TemplateName = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TemplateSize = styled.div`
  font-size: 0.6875rem;
  color: var(--surface-600);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FormatGrid = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormatButtonWrapper = styled.div<{ $isFirst: boolean; $isLast: boolean }>`
  display: flex;
`;


const SizeInputsWithToggle = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const SizeInput = styled.input`
  flex: 1;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--surface-300);
  border-radius: 0.4rem;
  background: white;
  font-size: 0.875rem;
  height: 2rem;
  min-height: 2rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const AspectRatioIconButton = styled.button<{ $active: boolean }>`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${props => props.$active ? 'var(--primary-color)' : 'var(--surface-300)'};
  border-radius: 0.4rem;
  background: ${props => props.$active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--surface-700)'};
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: var(--primary-color);
    background: ${props => props.$active ? 'var(--primary-color)' : 'var(--primary-50)'};
  }
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

export default ResizeMain;
