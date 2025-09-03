import React from 'react';
import styled from 'styled-components';

import { Label } from '@/components/ui/texts/label';

interface GradientColors {
  name: string;
  colors: string[];
}

interface Props {
  gradient: GradientColors;
  onClick: () => void;
}

const GradientExample: React.FC<Props> = ({ gradient, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Label>{gradient.name}</Label>

      <ColorsContainer>
        {gradient.colors.map((item) => (
          <ColorBox key={item} $backgroundColor={item} />
        ))}
      </ColorsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
`;

const ColorsContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const ColorBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 1rem;
  height: 2rem;
`;

export { GradientExample };

export type { GradientColors };
