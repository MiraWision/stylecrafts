import React from 'react';
import styled, { css } from 'styled-components';

import { useObserver } from '@/hooks/use-observer';

import { fadeInAnimation } from './common';

interface Props {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const ObservableSlider: React.FC<Props> = ({ as, children, className }) => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();
  
  return (
    <Container
      ref={observerRef}
      $isVisible={isVisible}
      as={as}
      className={className}
    >
      {children}
    </Container>
  );
}

const Container = styled.div<{ $isVisible: boolean }>`
  opacity: 0;

  ${({ $isVisible }) => $isVisible && css`
    ${fadeInAnimation}
  `}
`;

export { ObservableSlider };
