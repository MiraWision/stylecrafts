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
        lighter: baseColor.withBrightness(15),
        main: color,
        darker: baseColor.withBrightness(-15)
      };
    } catch {
      return {
        lighter: color,
        main: color,
        darker: color
      };
    }
  };

  const generateHash = () => {
    return palette.colors.map(color => color.replace('#', '')).join('-');
  };

  return (
    <Container onClick={onClick}>
      <Label>{palette.name}</Label>

      <ColorsContainer>
        <HashDisplay>#{generateHash()}</HashDisplay>
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
      </ColorsContainer>
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

const ColorsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  overflow: hidden;
  border: 1px solid var(--surface-border);
`;

const HashDisplay = styled.div`
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--text-color);
  background: var(--surface-100);
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--surface-border);
`;

const ColorsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.5rem;
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const ShadeBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 1.5rem;
  height: 1rem;
  border-radius: 0.125rem;
`;

export { PaletteExample };

export type { Palette };
