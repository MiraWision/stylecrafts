import { useState, useRef } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/common/image-input';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

const ImageToBase64 = () => {
  const [image, setImage] = useState<string | null>(null);
  const [conversionSuccess, setConversionSuccess] = useState(false); 
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: 'Download image' },
    { label: 'Press process' },
    { label: 'Copy result' },
  ];

  const toast = useRef<Toast>(null);

  const onProcess = () => {
    setActiveIndex(1); 
    let progressValue = 0;
    setConversionSuccess(false);
    const interval = setInterval(() => {
      progressValue += 10;
      if (progressValue >= 100) {
        clearInterval(interval);
        setConversionSuccess(true);
        setActiveIndex(2); 
        toast.current?.show({
          severity: 'success',
          summary: 'Processing Complete',
          detail: 'Image has been successfully converted.',
          life: 3000
        });
      }
    }, 1000); 
  };  

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
      <Title>Base64 to Image</Title>
      <ContentContainer>
        <Grid>
          <FlexContainer>
            <ImageInput value={image} onChange={setImage} />
          </FlexContainer>
          <FlexContainer>
          <ColumnContainer>
            <Button onClick={onProcess} disabled={!image}>Process</Button> 
          </ColumnContainer>
          </FlexContainer>
          { conversionSuccess && (
            <ColumnContainer>
              <FormatButton icon="pi pi-copy" onClick={copyBase64}>Copy base64</FormatButton>
              <FormatButton icon="pi pi-copy" onClick={copyHTMLImage}>Copy to HTML</FormatButton>
              <FormatButton icon="pi pi-copy" onClick={copyCSSImage}>Copy to CSS</FormatButton>
            </ColumnContainer>
          )}
        </Grid>
        <StyledSteps model={items} activeIndex={activeIndex} />
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 50px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FormatButton = styled(Button)`
  margin-top: 0.5rem;
  width: 11rem;
  background: none;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;

  .p-button-label {
    padding: 0.5rem;
  }

  .pi {
    margin-right: 0.5rem; 
  }
`;

const StyledSteps = styled(Steps)`
  .p-steps-item {
    width: calc(100% / 3);
  }

`;