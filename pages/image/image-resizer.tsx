import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { content } from '@/content/function-descriptions/image-optimization';

const ImageResizer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [imageType, setImageType] = useState<string>('image/png');
  const [imageWidth, setImageWidth] = useState<number>(300);
  const [imageHeight, setImageHeight] = useState<number>(300);
  const [imageQuality, setImageQuality] = useState<number>(100);
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
            const resizedImage = canvas.toDataURL(imageType, imageQuality / 100);
            setImageSize((resizedImage.length * 3) / 4); // Approximate size in bytes
          }
        }
      };
    }
  }, [image, imageWidth, imageHeight, imageType, imageQuality]);

  const handleImageChange = (image: string | null) => {
    setImage(image);
    if (image) {
      const byteString = atob(image.split(',')[1]);
      setImageSize(byteString.length);
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

  const imageTypes = [
    { label: 'PNG', value: 'image/png' },
    { label: 'JPEG', value: 'image/jpeg' },
    { label: 'WEBP', value: 'image/webp' }
  ];

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <MainContainer>
        <Title>Image Resizer</Title>
  
        <SingleColumnContainer>
          <ImageInput 
            width='50%'
            value={image} 
            onChange={handleImageChange} 
          />

          {image && 
            <>
              <ImagesContainer>
                <ImageWrapper>
                  <img src={image} alt="original" style={{ maxWidth: '100%', height: 'auto' }} />
                  <ImageLabel>
                    Original {originalWidth && originalHeight && `(${originalWidth}x${originalHeight}px)`}
                  </ImageLabel>
                </ImageWrapper>
                <ImageWrapper>
                  <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
                  <ImageLabel>
                    Resized {imageWidth && imageHeight && `(${imageWidth}x${imageHeight}px)`}
                  </ImageLabel>
                </ImageWrapper>
              </ImagesContainer>
              {imageSize && <ImageSizeText>Image Size: {(imageSize / 1024).toFixed(2)} KB</ImageSizeText>}
              <EditingForm>
                <FormField>
                  <label>Image Type:</label>
                  <Dropdown value={imageType} options={imageTypes} onChange={(e) => setImageType(e.value)} />
                </FormField>
                <FormField>
                  <label>Width:</label>
                  <InputNumber value={imageWidth} onValueChange={(e) => setImageWidth(e.value || 0)} />
                </FormField>
                <FormField>
                  <label>Height:</label>
                  <InputNumber value={imageHeight} onValueChange={(e) => setImageHeight(e.value || 0)} />
                </FormField>
                {imageType === 'image/jpeg' && (
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
                <Button label="Download Image" icon="pi pi-download" onClick={handleDownloadImage} />
              </EditingForm>
            </>
          }
        </SingleColumnContainer>
      </MainContainer>  

      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer> 
    </BaseLayout>
  );
}

export default ImageResizer;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;



const ImagesContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  border: 2px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const ImageLabel = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  font-size: 0.9rem;
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
  width: 50%;
  margin-top: 1rem;
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
