import React from 'react';
import styled from 'styled-components';

import { StarIcon } from './star';

interface Props {
}

const SparklesIcon: React.FC<Props> = ({}) => {
  return (
    <Container>
      <PinkStar width={12} height={12} top={0} left={8} />
      <PinkStar width={8} height={8} top={6} left={0} />
      <PinkStar width={6} height={6} top={14} left={6} />
    </Container>
  );
}

const Container = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
`;

const PinkStar = styled(StarIcon)<{ top: number, left: number, width: number, height: number }>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};

  svg path {
    fill: var(--primary-color);
  }
`;

export { SparklesIcon };