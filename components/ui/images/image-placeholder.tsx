import React from 'react';
import styled from 'styled-components';

import { ImageIcon } from '@/components/icons/image';
import { ImageAnimatedIcon } from '@/components/icons/image-animated';

interface Props {
  isLoading?: boolean;
  className?: string;
}

const ImagePlaceholder: React.FC<Props> = ({ isLoading, className }) => {
  return (
    <Container className={className}>
      {isLoading ? (
        <ImageAnimatedIcon width='48' height='48' />
      ) : (
        <ImageIcon width='48' height='48' />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 20rem;
  height: 10rem;
  border: 0.0625rem dashed var(--surface-border);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon * {
    stroke: var(--surface-500);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 8rem;
  }
`;

export { ImagePlaceholder };