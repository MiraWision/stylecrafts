import { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/ui/inputs/image-input';
import { ColorsOutput } from '@/components/ui/outputs/colors-output';

const ColorsConverter = () => {
  const [image, setImage] = useState<string | null>(null);

  const onProcess = () => {
    console.error('PROC', image);
  };

  return (
    <BaseLayout>
      <Title>Colors Palette</Title>
      <ContentContainer>
        <Grid>
          <div>
            <ImageInput value={image} onChange={setImage} />
          </div>

          <div>
            <Button onClick={onProcess}>Process</Button>
          </div>

          <ColorsOutput 
            colors={['#abcdef', '#456789', '#246086']}
          />
        </Grid>
      </ContentContainer>   
    </BaseLayout>
  );
}

const Grid = styled.div`
  display: grid;
  width: 640px;
  grid-template-columns: 4fr 1fr 1fr;
  grid-column-gap: 8px;
`;

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


export default ColorsConverter;
