import React from 'react';
import styled from 'styled-components';

interface Props {
}

const ImagePlaceholder: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Icon className='pi pi-image' />
    </Container>
  );
};

const Container = styled.div`
  width: 20rem;
  height: 10rem;
  border: 1px dashed var(--primary-color);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 2rem;
  color: var(--primary-color);  
`;

export { ImagePlaceholder };