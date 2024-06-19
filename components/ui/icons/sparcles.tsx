import React from 'react';
import styled from 'styled-components';

import { StarIcon } from './star';

interface Props {
}

const SparklesIcon: React.FC<Props> = ({}) => {
  return (
    <Container>
      <PinkStar width={0.75} height={0.75} top={0} left={0.5} />
      <PinkStar width={0.5} height={0.5} top={0.375} left={0} />
      <PinkStar width={0.375} height={0.375} top={0.875} left={0.375} />
    </Container>
  );
}

const Container = styled.div`
  width: 1rem;
  height: 1rem;
  position: relative;
`;

const PinkStar = styled(StarIcon)<{ top: number, left: number, width: number, height: number }>`
  position: absolute;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  top: ${({ top }) => `${top}rem`};
  left: ${({ left }) => `${left}rem`};

  svg path {
    fill: var(--primary-color);
  }
`;

export { SparklesIcon };