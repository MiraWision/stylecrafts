import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@/layouts/base-layout';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

const Base64ToImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [base64Text, setBase64Text] = useState<string>('');
  const [imageSize, setImageSize] = useState<number | null>(null);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (image) {
      const size = calculateImageSize(image);
      setImageSize(size);
    }
  }, [image]);

  const calculateImageSize = (base64Str: string) => {
    let padding, inBytes, base64StringLength;
    if (base64Str.endsWith("==")) padding = 2;
    else if (base64Str.endsWith("=")) padding = 1;
    else padding = 0;
  
    base64StringLength = base64Str.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    return inBytes;
  }

  const handleDownloadImage = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleImageInputChange = (value: string | null) => {
    if (value !== null) {
      setBase64Text(value);
      setImage(value); 
    }
  };

  return (
    <BaseLayout>
      <Title>Base64 to Image Convertor</Title>
      <ContentContainer>
        <SingleColumnContainer>
          <StyledInputText placeholder="Paste Base64 here..." value={base64Text} onChange={(e) => handleImageInputChange(e.target.value)} />
            {image && 
              <ImageContainer>
                <StyledImage src={image} alt="Uploaded Image" />
              </ImageContainer>
            }
             {imageSize && <ImageSizeText>Image Size: {(imageSize / 1024).toFixed(2)} KB</ImageSizeText>}
          <ButtonsContainer>
            <FormatButton icon="pi pi-download" onClick={handleDownloadImage} disabled={!image}>Download Image</FormatButton>
          </ButtonsContainer>
        </SingleColumnContainer>
      </ContentContainer>
      <Toast ref={toast} position="top-right" />
    </BaseLayout>
  );
};

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

const ContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const SingleColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
`;

const ImageSizeText = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledInputText = styled(InputTextarea)`
  min-width: 300px;
  max-width: 400px;
  min-height: 100px;
  max-height: 600px;
`;

const StyledImage = styled.img`
  max-width: 100%; 
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FormatButton = styled(Button)`
  background: none;
  color: var(--primary-color);

  .p-button-label {
    padding: 0.5rem;
  }

  .pi {
    margin-right: 0.5rem;
  }
`;

export default Base64ToImage;