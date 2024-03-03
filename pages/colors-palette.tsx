import { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/common/image-input';
import { ColorsOutput } from '@/components/common/colors-output';

const ColorsConverter = () => {
  const [image, setImage] = useState<string | null>(null);

  const onProcess = () => {
    console.error('PROC', image);
  };

  return (
    <BaseLayout>
      <Grid>
        <ImageInput value={image} onChange={setImage} />

        <div>
          <Button onClick={onProcess}>Process</Button>
        </div>

        <ColorsOutput 
          colors={['#abcdef', '#456789', '#246086']}
        />
      </Grid>
    </BaseLayout>
  );
}

const Grid = styled.div`
  display: grid;
  width: 640px;
  grid-template-columns: 258px 108px 258px;
  grid-column-gap: 8px;
`;

export default ColorsConverter;
