import React from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

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
  const generateShades = (color: string) => {
    try {
      const baseColor = new Color(color);
      return {
        lightest: baseColor.withBrightness(25),
        lighter: baseColor.withBrightness(15),
        main: color,
        darker: baseColor.withBrightness(-15),
        darkest: baseColor.withBrightness(-25)
      };
    } catch {
      return {
        lightest: color,
        lighter: color,
        main: color,
        darker: color,
        darkest: color
      };
    }
  };

  return (
    <Container onClick={onClick}>
      <Label>{palette.name}</Label>

      <ColorsRow>
        {palette.colors.map((color, index) => {
          const shades = generateShades(color);
          return (
            <ColorColumn key={index}>
              <ShadeBox $backgroundColor={shades.lighter} />
              <ShadeBox $backgroundColor={shades.main} />
              <ShadeBox $backgroundColor={shades.darker} />
            </ColorColumn>
          );
        })}
      </ColorsRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
`;

const ColorsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShadeBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 1.5rem;
  height: 1rem;
`;

export { PaletteExample };

export type { Palette };
