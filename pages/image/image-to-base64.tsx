import { useState, useRef } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ImageToBase64 = () => {
  const [image, setImage] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
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
          <OutputContainer 
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
          >
            <ButtonsContainer show={showButtons && !!image}>
              <FormatButton icon="pi pi-copy" onClick={copyBase64} disabled={!image}>Copy base64</FormatButton>
              <FormatButton icon="pi pi-copy" onClick={copyHTMLImage} disabled={!image}>Copy to HTML</FormatButton>
              <FormatButton icon="pi pi-copy" onClick={copyCSSImage} disabled={!image}>Copy to CSS</FormatButton>
            </ButtonsContainer>
            {image}
          </OutputContainer>
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

const ButtonsContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  gap: 0.8rem;
  position: absolute;
  right: 0.8rem;
  top: 0.5rem;
  z-index: 10;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const OutputContainer = styled.div`
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  width: 50%;
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word;
  position: relative;
  z-index: 1;
`;

const FormatButton = styled(Button)`
  width: 7.2rem;
  font-size: 0.75rem;
  padding: 0.3rem 0.2rem;

  .p-button-label {
    padding: 0.5rem;
  }

  .pi {
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;