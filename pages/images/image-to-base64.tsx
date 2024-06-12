import { useState, useRef } from 'react';
import styled from 'styled-components';

import { content } from '@/content/function-descriptions/image-to-base64';

import { Toast } from 'primereact/toast';
import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { Title } from '@/components/ui/typography';
import { TextareaWithCopy } from '@/components/ui/textarea-with-copy';

const ImageToBase64ToolPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);

  const callback = {
    onSuccess: (message: string) => toast?.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 }),
    onFail: () => toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to copy', life: 3000 }),
  }

  return (
    <BaseLayout>
      <Toast ref={toast} />
      
      <MainContainer>
        <Title>Image to Base64 Converter</Title>
  
        <SingleColumnContainer>
          <ImageInputStyled 
            value={image}
            onChange={setImage} 
          />

          <TextareaWithCopy
            value={image ?? ''}
            copyOptions={[
              { 
                name: 'Copy base64', 
                getValue: (text) => text, 
                onSuccess: () => callback.onSuccess('Base64 Content copied to clipboard'),
                onFail: callback.onFail,
              },
              { 
                name: 'Copy to HTML', 
                getValue: (text) => `<img src="${text}" alt="Image"/>`, 
                onSuccess: () => callback.onSuccess('HTML Image copied to clipboard'),
                onFail: callback.onFail,
              },
              { 
                name: 'Copy to CSS', 
                getValue: (text) => `background-image: url('${text}');`, 
                onSuccess: () => callback.onSuccess('CSS Style copied to clipboard'),
                onFail: callback.onFail,
              },
            ]}
          />          
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

export default ImageToBase64ToolPage;
