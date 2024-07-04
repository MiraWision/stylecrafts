import React from 'react';
import styled from 'styled-components';

interface Props {
  isLoading?: boolean;
  className?: string;
}

const ImagePlaceholder: React.FC<Props> = ({ isLoading, className }) => {
  return (
    <Container className={className}>
      <Icon 
        className={isLoading ? 'pi pi-spin pi-spinner-dotted' : 'pi pi-image'}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 20rem;
  height: 10rem;
  border: 0.0625rem dashed var(--primary-color);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 8rem;
  }
`;

const Icon = styled.i`
  font-size: 2rem;
  color: var(--primary-color);  
`;

export { ImagePlaceholder };