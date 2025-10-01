import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { Label } from '@/components/ui/texts/label';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';

// ===== Types =====

interface ExifData {
  make?: string;
  model?: string;
  dateTimeOriginal?: string;
  iso?: number;
  exposureTime?: string;
  fNumber?: string;
  focalLength?: string;
  gps?: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
  };
  width?: number;
  height?: number;
  orientation?: number;
  software?: string;
  artist?: string;
  copyright?: string;
}

type OriginalImage = {
  file: File | null;
  previewUrl: string | null;
  dataUrl: string | null;
};

// ===== Component =====

const ExifMain: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [originalImage, setOriginalImage] = useState<OriginalImage>({
    file: null,
    previewUrl: null,
    dataUrl: null,
  });
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanImageUrl, setCleanImageUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

      // Очищаем предыдущий URL
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = dataUrl;

      // Загружаем размеры изображения
      loadImageDimensions(file);

      // Сбрасываем результат
      setExifData(null);
      setCleanImageUrl(null);

      // Парсим EXIF данные
      await parseExifData(file);
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

  const parseExifData = async (file: File) => {
    try {
      setIsProcessing(true);
      
      // Динамически импортируем exifr
      const exifr = await import('exifr');
      
      const exif = await exifr.parse(file);
      
      if (exif) {
        const processedData: ExifData = {
          make: exif.make,
          model: exif.model,
          dateTimeOriginal: exif.dateTimeOriginal ? new Date(exif.dateTimeOriginal).toLocaleString() : undefined,
          iso: exif.iso,
          exposureTime: exif.exposureTime ? `1/${Math.round(1/exif.exposureTime)}s` : undefined,
          fNumber: exif.fNumber ? `f/${exif.fNumber}` : undefined,
          focalLength: exif.focalLength ? `${exif.focalLength}mm` : undefined,
          gps: exif.latitude && exif.longitude ? {
            latitude: exif.latitude,
            longitude: exif.longitude,
            altitude: exif.altitude
          } : undefined,
          width: exif.imageWidth,
          height: exif.imageHeight,
          orientation: exif.orientation,
          software: exif.software,
          artist: exif.artist,
          copyright: exif.copyright
        };
        
        setExifData(processedData);
      } else {
        setExifData(null);
      }
    } catch (err) {
      console.error('Error parsing EXIF data:', err);
      setExifData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeMetadata = async () => {
    if (!originalImage.file || !canvasRef.current) return;

    try {
      setIsProcessing(true);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Загружаем изображение
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем изображение (это удаляет все метаданные)
        ctx.drawImage(img, 0, 0);

        // Конвертируем в blob
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCleanImageUrl(url);
          }
        }, 'image/jpeg', 0.9);
      };

      img.src = originalImage.dataUrl!;
    } catch (err) {
      console.error('Error removing metadata:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCleanImage = () => {
    if (cleanImageUrl && originalImage.file) {
      const link = document.createElement('a');
      link.href = cleanImageUrl;
      link.download = `clean_${originalImage.file.name}`;
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

  const formatGpsCoordinate = (coord: number, isLatitude: boolean) => {
    const abs = Math.abs(coord);
    const degrees = Math.floor(abs);
    const minutes = Math.floor((abs - degrees) * 60);
    const seconds = ((abs - degrees) * 60 - minutes) * 60;
    
    const direction = isLatitude 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    
    return `${degrees}°${minutes}'${seconds.toFixed(2)}"${direction}`;
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
        </ImagesContainer>

        {/* EXIF данные */}
        {exifData && (
          <ExifSection>
            <ExifHeader>
              <h3>EXIF Metadata</h3>
              <BaseTextButton
                text={isProcessing ? 'Removing...' : 'Remove Metadata'}
                onClick={removeMetadata}
                disabled={isProcessing}
                isPrimary={true}
              />
            </ExifHeader>

            <ExifGrid>
              <ExifGroup>
                <ExifLabel>Camera</ExifLabel>
                <ExifValue>
                  {exifData.make && exifData.model 
                    ? `${exifData.make} ${exifData.model}`
                    : exifData.make || exifData.model || 'Unknown'
                  }
                </ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>Date Taken</ExifLabel>
                <ExifValue>{exifData.dateTimeOriginal || 'Unknown'}</ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>Dimensions</ExifLabel>
                <ExifValue>
                  {exifData.width && exifData.height 
                    ? `${exifData.width} × ${exifData.height}`
                    : 'Unknown'
                  }
                </ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>ISO</ExifLabel>
                <ExifValue>{exifData.iso || 'Unknown'}</ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>Exposure Time</ExifLabel>
                <ExifValue>{exifData.exposureTime || 'Unknown'}</ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>Aperture</ExifLabel>
                <ExifValue>{exifData.fNumber || 'Unknown'}</ExifValue>
              </ExifGroup>

              <ExifGroup>
                <ExifLabel>Focal Length</ExifLabel>
                <ExifValue>{exifData.focalLength || 'Unknown'}</ExifValue>
              </ExifGroup>

              {exifData.gps && (
                <ExifGroup>
                  <ExifLabel>GPS Location</ExifLabel>
                  <ExifValue>
                    <GpsContainer>
                      <div>Lat: {formatGpsCoordinate(exifData.gps.latitude!, true)}</div>
                      <div>Lon: {formatGpsCoordinate(exifData.gps.longitude!, false)}</div>
                      {exifData.gps.altitude && (
                        <div>Alt: {exifData.gps.altitude.toFixed(1)}m</div>
                      )}
                    </GpsContainer>
                  </ExifValue>
                </ExifGroup>
              )}

              {exifData.software && (
                <ExifGroup>
                  <ExifLabel>Software</ExifLabel>
                  <ExifValue>{exifData.software}</ExifValue>
                </ExifGroup>
              )}

              {exifData.artist && (
                <ExifGroup>
                  <ExifLabel>Artist</ExifLabel>
                  <ExifValue>{exifData.artist}</ExifValue>
                </ExifGroup>
              )}

              {exifData.copyright && (
                <ExifGroup>
                  <ExifLabel>Copyright</ExifLabel>
                  <ExifValue>{exifData.copyright}</ExifValue>
                </ExifGroup>
              )}
            </ExifGrid>
          </ExifSection>
        )}

        {/* Результат очистки */}
        {cleanImageUrl && (
          <CleanImageSection>
            <CleanImageHeader>
              <h3>Clean Image (No Metadata)</h3>
              <BaseTextButton
                text="Download Clean Image"
                onClick={downloadCleanImage}
                isPrimary={true}
              />
            </CleanImageHeader>
            
            <CleanImagePreview>
              <img 
                src={cleanImageUrl} 
                alt="Clean image without metadata"
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
            </CleanImagePreview>
          </CleanImageSection>
        )}

        {/* Сообщение если нет EXIF */}
        {originalImage.file && !exifData && !isProcessing && (
          <NoExifMessage>
            <h3>No EXIF Data Found</h3>
            <p>This image doesn't contain any EXIF metadata.</p>
          </NoExifMessage>
        )}
      </Form>

      <ToolCrossLinks toolKey="exif" />
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

const ImagesContainer = styled.div`
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

const ExifSection = styled.div`
  margin-top: 2rem;
`;

const ExifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: var(--text-color);
  }
`;

const ExifGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: var(--surface-50);
  border-radius: 0.75rem;
  border: 1px solid var(--surface-200);
`;

const ExifGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ExifLabel = styled.div`
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.875rem;
`;

const ExifValue = styled.div`
  color: var(--surface-600);
  font-size: 0.875rem;
  word-break: break-word;
`;

const GpsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: monospace;
  font-size: 0.8rem;
`;

const CleanImageSection = styled.div`
  margin-top: 2rem;
`;

const CleanImageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: var(--text-color);
  }
`;

const CleanImagePreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  background: var(--surface-50);
  border-radius: 0.75rem;
  border: 1px solid var(--surface-200);
`;

const NoExifMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: var(--surface-50);
  border-radius: 0.75rem;
  border: 1px solid var(--surface-200);

  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-color);
  }

  p {
    margin: 0;
    color: var(--surface-600);
  }
`;

const HiddenCanvas = styled.canvas`
  display: none;
`;

export default ExifMain;
