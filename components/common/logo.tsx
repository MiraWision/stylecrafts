import React from 'react';
import styled from 'styled-components';

import { StarIcon } from '../icons/star';


interface Props {

}

const Logo: React.FC<Props> = () => {
  return (
    <Container>
      <Text>CSSCraft</Text>
      <PinkStar width={8} height={8} top={19} left={14} />
      <PinkStar width={5} height={5} top={7} left={169} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const Text = styled.span`
  font-family: 'Streamster', sans-serif;
  font-size: 30px;
  color: #f472b6;
`;

const PinkStar = styled(StarIcon)<{ top: number, left: number, width: number, height: number }>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};

  svg path {
    fill: #f472b6;
  }
`;

export { Logo };
