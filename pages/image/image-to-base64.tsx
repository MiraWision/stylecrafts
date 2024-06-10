import { useState, useRef } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';

import { content } from '@/content/function-descriptions/image-to-base64';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';

const ImageToBase64Page = () => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);

  const callback = {
    onSuccess: (message: string) => toast?.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 }),
    onFail: () => toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to copy', life: 3000 }),
  }

  const copyBase64 = () => copyToClipboard(image || '', {
    onSuccess: () => callback.onSuccess('Base64 copied to clipboard'),
    onFail: callback.onFail,
  });
  const copyHTMLImage = () => copyToClipboard(`<img src="${image}" alt="Image"/>`, {
    onSuccess: () => callback.onSuccess('HTML tag copied to clipboard'),
    onFail: callback.onFail,
  });
  const copyCSSImage = () => copyToClipboard(`background-image: url('${image}');`, {
    onSuccess: () => callback.onSuccess('CSS copied to clipboard'),
    onFail: callback.onFail,
  });

  return (
    <BaseLayout>
      <Toast ref={toast} />
      
      <MainContainer>
        <Title>Image to Base64 Converter</Title>
  
        <SingleColumnContainer>
          <ImageInput 
            width='50%'
            value={image}
            onChange={setImage} 
          />
          <OutputContainer>
            <ButtonsContainer show={!!image}>
              <FormatButton icon='pi pi-copy' onClick={copyBase64}>Copy base64</FormatButton>

              <FormatButton icon='pi pi-copy' onClick={copyHTMLImage}>Copy to HTML</FormatButton>
              
              <FormatButton icon='pi pi-copy' onClick={copyCSSImage}>Copy to CSS</FormatButton>
            </ButtonsContainer>

            {image}
          </OutputContainer>
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

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
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
  padding: 0.625rem;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 0.3125rem;
  width: 50%;
  max-height: 12.5rem;
  overflow-y: auto;
  word-wrap: break-word;
  position: relative;
  z-index: 1;

  &:hover ${ButtonsContainer} {
    opacity: 1;
  }
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

export default ImageToBase64Page;
