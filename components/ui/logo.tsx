import React from 'react';
import styled from 'styled-components';

import { StarIcon } from './icons/star';


interface LogoProps {
  onClick?: () => void;
}


const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Text>CssCraft</Text>

      <PinkStar width={0.5} height={0.5} top={1.25} left={1.0625} />
      
      <PinkStar width={0.3125} height={0.3125} top={0.4375} left={7.3125} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const Text = styled.span`
  font-family: 'Delius Swash Caps', cursive;
  font-size: 1.875rem;
  color: var(--primary-color);
  user-select: none;
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

export { Logo };
