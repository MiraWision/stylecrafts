import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { Label } from '@/components/ui/texts/label';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';

// ===== Types =====

interface FaviconSettings {
  padding: number;
  quality: number;
}

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};

interface IconSize {
  name: string;
  size: number;
  description: string;
  category: 'favicon' | 'web' | 'apple';
}

// ===== Component =====

const FaviconMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<{ [key: string]: string }>({});

  const [settings, setSettings] = useState<FaviconSettings>({
    padding: 10,
    quality: 0.9,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Mount flag for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSetting = <K extends keyof FaviconSettings>(key: K, value: FaviconSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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
      setGeneratedIcons({});
    } catch (err) {
      console.error('Error processing file:', err);
    }
  };

  const handleImageInputChange = (imageData: ImageData) => {
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

  const iconSizes: IconSize[] = [
    // Favicon набор
    { name: 'favicon-16', size: 16, description: 'Favicon 16×16', category: 'favicon' },
    { name: 'favicon-32', size: 32, description: 'Favicon 32×32', category: 'favicon' },
    { name: 'favicon-48', size: 48, description: 'Favicon 48×48', category: 'favicon' },
    
    // Web/PWA набор
    { name: 'web-64', size: 64, description: 'Web Icon 64×64', category: 'web' },
    { name: 'web-128', size: 128, description: 'Web Icon 128×128', category: 'web' },
    { name: 'web-192', size: 192, description: 'PWA Icon 192×192', category: 'web' },
    { name: 'web-256', size: 256, description: 'Web Icon 256×256', category: 'web' },
    { name: 'web-512', size: 512, description: 'PWA Icon 512×512', category: 'web' },
    
    // Apple Touch
    { name: 'apple-180', size: 180, description: 'Apple Touch 180×180', category: 'apple' },
  ];

  const generateIcon = async (size: number, name: string) => {
    if (!originalImage.file || !canvasRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Загружаем изображение
      const img = new Image();
      img.onload = () => {
        // Рассчитываем размеры с padding
        const padding = (settings.padding / 100) * size;
        const contentSize = size - (padding * 2);
        
        canvas.width = size;
        canvas.height = size;

        // Очищаем canvas
        ctx.clearRect(0, 0, size, size);

        // Рисуем фон (прозрачный)
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, size, size);

        // Рассчитываем размеры для fit/cover
        const aspectRatio = img.width / img.height;
        let drawWidth = contentSize;
        let drawHeight = contentSize;

        if (aspectRatio > 1) {
          // Широкое изображение
          drawHeight = contentSize / aspectRatio;
        } else {
          // Высокое изображение
          drawWidth = contentSize * aspectRatio;
        }

        // Центрируем изображение
        const x = padding + (contentSize - drawWidth) / 2;
        const y = padding + (contentSize - drawHeight) / 2;

        // Рисуем изображение
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Конвертируем в blob
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setGeneratedIcons(prev => ({ ...prev, [name]: url }));
          }
        }, 'image/png', settings.quality);
      };

      img.src = originalImage.dataUrl!;
    } catch (err) {
      console.error('Error generating icon:', err);
    }
  };

  const generateAllIcons = async () => {
    if (!originalImage.file) return;

    setIsProcessing(true);
    setGeneratedIcons({});

    try {
      // Генерируем все иконки последовательно
      for (const iconSize of iconSizes) {
        await generateIcon(iconSize.size, iconSize.name);
        // Небольшая задержка для UI
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (err) {
      console.error('Error generating all icons:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadIcon = (name: string, size: number) => {
    const url = generatedIcons[name];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}-${size}x${size}.png`;
      link.click();
    }
  };

  const downloadAllIcons = async () => {
    // Для простоты скачиваем все иконки по отдельности
    // В будущем можно добавить JSZip для архива
    for (const iconSize of iconSizes) {
      if (generatedIcons[iconSize.name]) {
        downloadIcon(iconSize.name, iconSize.size);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
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
        {/* Превью и загрузка */}
        <PreviewSection>
          <ImageInputWrapper>
            <ImageInputStyled 
              value={originalImage.previewUrl || originalImage.dataUrl} 
              onChange={handleImageInputChange} 
            />
            {originalImage.file && (
              <PreviewOverlay>
                <PreviewText>
                  {originalImage.file.name}
                </PreviewText>
              </PreviewOverlay>
            )}
          </ImageInputWrapper>
        </PreviewSection>

        {/* Настройки */}
        <SettingsSection>
          <ControlGroup>
            <Label>Padding: {settings.padding}%</Label>
            <QualitySlider
              type="range"
              min="0"
              max="30"
              value={settings.padding}
              onChange={(e) => updateSetting('padding', parseInt(e.target.value))}
            />
          </ControlGroup>

          <ControlGroup>
            <Label>Quality: {Math.round(settings.quality * 100)}%</Label>
            <QualitySlider
              type="range"
              min="0.5"
              max="1"
              step="0.1"
              value={settings.quality}
              onChange={(e) => updateSetting('quality', parseFloat(e.target.value))}
            />
          </ControlGroup>

          <GenerateButton>
            <BaseTextButton
              text={isProcessing ? 'Generating...' : 'Generate All Icons'}
              onClick={generateAllIcons}
              disabled={!originalImage.file || isProcessing}
              isPrimary={true}
            />
          </GenerateButton>
        </SettingsSection>

        {/* Результаты */}
        {Object.keys(generatedIcons).length > 0 && (
          <ResultsSection>
            <ResultsHeader>
              <h3>Generated Icons</h3>
              <BaseTextButton
                text="Download All"
                onClick={downloadAllIcons}
                isPrimary={false}
              />
            </ResultsHeader>

            <IconsGrid>
              {iconSizes.map((iconSize) => (
                <IconCard key={iconSize.name}>
                  <IconPreview>
                    {generatedIcons[iconSize.name] ? (
                      <img 
                        src={generatedIcons[iconSize.name]} 
                        alt={`${iconSize.size}x${iconSize.size}`}
                        width={64}
                        height={64}
                      />
                    ) : (
                      <PlaceholderIcon />
                    )}
                  </IconPreview>
                  <IconInfo>
                    <IconName>{iconSize.description}</IconName>
                    <IconSize>{iconSize.size}×{iconSize.size}px</IconSize>
                  </IconInfo>
                  <IconActions>
                    <BaseTextButton
                      text="Download"
                      onClick={() => downloadIcon(iconSize.name, iconSize.size)}
                      disabled={!generatedIcons[iconSize.name]}
                      isPrimary={false}
                    />
                  </IconActions>
                </IconCard>
              ))}
            </IconsGrid>
          </ResultsSection>
        )}
      </Form>

      <ToolCrossLinks toolKey="favicon" />
      <HiddenCanvas ref={canvasRef} />
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

const PreviewSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ImageInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const ImageInputStyled = styled(ImageInput)`
  width: 100%;
  height: 20rem;
  border: 2px dashed var(--surface-300);
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const PreviewOverlay = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const PreviewText = styled.span`
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SettingsSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  padding: 1.5rem;
  background: var(--surface-50);
  border-radius: 0.75rem;
  border: 1px solid var(--surface-200);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const QualitySlider = styled.input`
  width: 100%;
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

const GenerateButton = styled.div`
  display: flex;
  align-items: center;
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: var(--text-color);
  }
`;

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const IconCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: var(--surface-0);
  border: 1px solid var(--surface-200);
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const IconPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin-bottom: 0.75rem;
  background: var(--surface-50);
  border-radius: 0.375rem;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PlaceholderIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: var(--surface-200);
  border-radius: 0.25rem;
`;

const IconInfo = styled.div`
  margin-bottom: 0.75rem;
`;

const IconName = styled.div`
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

const IconSize = styled.div`
  font-size: 0.875rem;
  color: var(--surface-500);
`;

const IconActions = styled.div`
  display: flex;
  justify-content: center;
`;

const HiddenCanvas = styled.canvas`
  display: none;
`;

export default FaviconMain;
