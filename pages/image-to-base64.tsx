import { useState, useRef } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/common/image-input';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ImageToBase64 = () => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);

  const copyToClipboard = (content: string, message: string) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 }))
      .catch(() => toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to copy', life: 3000 }));
  };

  const copyBase64 = () => copyToClipboard(image || '', 'Base64 copied to clipboard');
  const copyHTMLImage = () => copyToClipboard(`<img src="${image}" alt="Image"/>`, 'HTML tag copied to clipboard');
  const copyCSSImage = () => copyToClipboard(`background-image: url('${image}');`, 'CSS copied to clipboard');

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <Title>Image to Base64 Convertor</Title>
      <ContentContainer>
        <SingleColumnContainer>
          <ImageInput 
          width='50%'
          value={image} 
          onChange={setImage} 
        />
          <OutputContainer>{image}</OutputContainer>
          <ButtonsContainer>
            <FormatButton icon="pi pi-copy" onClick={copyBase64} disabled={!image}>Copy base64</FormatButton>
            <FormatButton icon="pi pi-copy" onClick={copyHTMLImage} disabled={!image}>Copy to HTML</FormatButton>
            <FormatButton icon="pi pi-copy" onClick={copyCSSImage} disabled={!image}>Copy to CSS</FormatButton>
          </ButtonsContainer>
        </SingleColumnContainer>
      </ContentContainer>   
    </BaseLayout>
  );
}

export default ImageToBase64;

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

const OutputContainer = styled.div`
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  width: 55%;
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word;
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
