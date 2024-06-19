import React from 'react';
import styled from 'styled-components';

import { Label } from '@/components/ui/texts/label';

interface Palette {
  name: string;
  colors: string[];
}

interface Props {
  palette: Palette;
  onClick: () => void;
}

const PaletteExample: React.FC<Props> = ({ palette, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Label>{palette.name}</Label>

      <ColorsContainer>
        {palette.colors.map((item) => (
          <ColorBox key={item} color={item} />
        ))}
      </ColorsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ColorsContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const ColorBox = styled.div<{ color: string }>`
  width: 1rem;
  height: 2rem;
  background-color: ${({ color }) => color};
`;

export { PaletteExample };

export type { Palette };
