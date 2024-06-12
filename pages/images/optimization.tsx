import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { content } from '@/content/function-descriptions/image-optimization';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { Title } from '@/components/ui/typography';
import { LinkToggleButton } from '@/components/ui/buttons/link-unlink';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';

const ImageOptimizationToolPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [imageType, setImageType] = useState<string>('image/png');
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [imageQuality, setImageQuality] = useState<number>(100);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [linkedDimensions, setLinkedDimensions] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const toast = useRef<Toast>(null);

  const loadImageAndSetSize = (src: string, width: number, height: number, type: string, quality: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL(type, quality / 100);
          setImageSize((resizedImage.length * 3) / 4);
        };
      }
    }
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setImageWidth(img.width);
        setImageHeight(img.height);
        loadImageAndSetSize(image, img.width, img.height, imageType, imageQuality);
      };
    }
  }, [image]);

  useEffect(() => {
    if (image && originalWidth && originalHeight) {
      loadImageAndSetSize(image, imageWidth || originalWidth, imageHeight || originalHeight, imageType, imageQuality);
    }
  }, [imageType, imageQuality]);

  useEffect(() => {
    if (image && originalWidth && originalHeight && imageWidth && imageHeight) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        loadImageAndSetSize(image, imageWidth, imageHeight, imageType, imageQuality);
      }, 2000);
    }
  }, [imageWidth, imageHeight]);

  const handleImageChange = (image: string | null) => {
    setImage(image);
    if (image) {
      const byteString = atob(image.split(',')[1]);
      setImageSize(byteString.length);
      setImageQuality(100);
    }
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL(imageType, imageQuality / 100);
      link.download = `resized-image.${imageType.split('/')[1]}`;
      link.click();
    }
  };

  const handleWidthChange = (value: number) => {
    setImageWidth(value);
    if (linkedDimensions && originalWidth && originalHeight) {
      setImageHeight(Math.round((value / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (value: number) => {
    setImageHeight(value);
    if (linkedDimensions && originalWidth && originalHeight) {
      setImageWidth(Math.round((value / originalHeight) * originalWidth));
    }
  };

  const handleToggleDimensions = () => {
    setLinkedDimensions(!linkedDimensions);
  };

  const imageTypes = [
    { label: 'PNG', value: 'image/png' },
    { label: 'JPEG', value: 'image/jpeg' },
    { label: 'WEBP', value: 'image/webp' }
  ];

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <MainContainer>
        <Title>Image Optimization</Title>
  
        <SingleColumnContainer>
          <InputAndImageContainer>
            <ImageInputStyled 
              value={image} 
              onChange={handleImageChange} 
            />
            
            {image 
              ? (
                <>
                  <ImageWithDownload
                    image={image}
                    fileName={`resized-image.${imageType.split('/')[1]}`}
                  />
                  <TextOverlayTop>Modified</TextOverlayTop>
                  <TextOverlayBottom>{imageWidth && imageHeight ? `${imageWidth}x${imageHeight}px` : ''}</TextOverlayBottom>
                  <OptimizationTag>x45 Optimize</OptimizationTag>
                </>
              )
              : (
                <ImagePlaceholder />
              )
            }
          </InputAndImageContainer>

          {image && (
            <>
              {imageSize && <ImageSizeText>Image Size: {(imageSize / 1024).toFixed(2)} KB</ImageSizeText>}
              
              <EditingForm>
                <FormFieldsRow>
                  <FormField>
                    <label>Width:</label>
                    <InputNumber value={imageWidth} onValueChange={(e) => handleWidthChange(e.value || 0)} />
                  </FormField>

                  <ToggleContainer>
                    <LinkToggleButton linked={linkedDimensions} onToggle={handleToggleDimensions} />
                  </ToggleContainer>

                  <FormField>
                    <label>Height:</label>
                    <InputNumber value={imageHeight} onValueChange={(e) => handleHeightChange(e.value || 0)} />
                  </FormField>
                </FormFieldsRow>

                <FormFieldsRow>
                  <FormField>
                    <label>Image Type:</label>
                    <Dropdown value={imageType} options={imageTypes} onChange={(e) => setImageType(e.value)} />
                  </FormField>

                  {(imageType === 'image/jpeg' || imageType === 'image/webp') && (
                    <FormField>
                      <label>Quality:</label>

                      <SliderContainer>
                        <QualityLabels>
                          <span>0</span>

                          <StyledSlider value={imageQuality} onChange={(e) => setImageQuality(e.value as number)} />
                          
                          <span>100</span>
                        </QualityLabels>

                        <QualityValue>{imageQuality}</QualityValue>
                      </SliderContainer>
                    </FormField>
                  )}
                </FormFieldsRow>
              </EditingForm>
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

const ImageInputStyled = styled(ImageInput)`
  width: 20rem;
  min-height: 10rem;
`;

const TextOverlayTop = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 10;
  font-size: 1rem;
`;

const TextOverlayBottom = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 10;
  font-size: 1rem;
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

const EditingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const FormFieldsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem; 
  width: 100%;

  label {
    font-weight: bold;
  }

  input, select, .p-dropdown, .p-inputnumber, .p-slider {
    width: 100%;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-bottom: 0.5rem;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const QualityLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin: 0 auto; 
`;

const StyledSlider = styled(Slider)`
  width: 80%;
  margin: 0 0.5rem;
`;

const QualityValue = styled.span`
  margin-top: 0.5rem;
`;

export default ImageOptimizationToolPage;