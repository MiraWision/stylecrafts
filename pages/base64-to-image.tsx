import { useState } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/common/image-input';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const Base64ToImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const onProcess = () => {
    console.error('PROC', image);
  };

  return (
    <BaseLayout>
      <Title>Base64 to Image</Title>
      <ContentContainer>
        <Grid>
          <ImageInput value={image} onChange={setImage} />
          <FlexContainer>
            <Button onClick={onProcess}>Process</Button>
          </FlexContainer>
       
        </Grid>
      
      </ContentContainer>   
    </BaseLayout>
  );
}

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.h2`
`;

const ContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  width: 640px;
  grid-template-columns: 2fr 1fr 2fr;
  grid-column-gap: 30px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Base64ToImage;