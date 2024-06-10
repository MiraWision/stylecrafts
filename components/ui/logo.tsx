import React from 'react';
import styled from 'styled-components';

import { StarIcon } from './icons/star';


interface Props {

}

const Logo: React.FC<Props> = () => {
  return (
    <Container>
      <Text>CssCraft</Text>
      <PinkStar widthw={8} height={8} top={20} left={17} />
      <PinkStar width={5} height={5} top={7} left={117} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const Text = styled.span`
  font-family: 'Delius Swash Caps', cursive;
  font-size: 30px;
  color: var(--primary-color);
  user-select: none;
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

export { Logo };
