import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@/layouts/base-layout';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import ImageWithDownload from '@/components/ui/outputs/image-output';
import { Markdown } from '@/components/ui/markdown';
import { content } from '@/content/function-descriptions/base64-to-image';
import { PostContainer } from '@/components/ui/post';
import { MainContainer } from '@/components/ui/containers';

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
      <MainContainer>
        <Title>Base64 to Image Convertor</Title>
  
        <SingleColumnContainer>
          <StyledInputText placeholder="Paste Base64 here..." value={base64Text} onChange={(e) => handleImageInputChange(e.target.value)} />
          {image && 
            <ImageWithDownload image={image} onDownload={handleDownloadImage} />
          }
          {imageSize && <ImageSizeText>Image Size: {(imageSize / 1024).toFixed(2)} KB</ImageSizeText>}
        </SingleColumnContainer>
      </MainContainer>
      
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer>
      <Toast ref={toast} position="top-right" />
    </BaseLayout>
  );
};

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

const SingleColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ImageSizeText = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledInputText = styled(InputTextarea)`
  width: 50%;
  min-height: 100px;
  max-height: 300px;
`;

export default Base64ToImage;