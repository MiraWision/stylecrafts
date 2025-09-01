import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { PaletteColor, Shade } from './types';

const generateShades = (color: string): Shade[] => {
  const baseColor = new Color(color);
  
  try {
    return [
      { shade: -300, hex: baseColor.withBrightness(-30) },
      { shade: -200, hex: baseColor.withBrightness(-20) },
      { shade: -100, hex: baseColor.withBrightness(-10) },
      { shade: -50, hex: baseColor.withBrightness(-5) },
      { shade: 0, hex: baseColor.get() },
      { shade: 50, hex: baseColor.withBrightness(5) },
      { shade: 100, hex: baseColor.withBrightness(10) },
      { shade: 200, hex: baseColor.withBrightness(20) },
      { shade: 300, hex: baseColor.withBrightness(30) },
    ];
  } catch (error) {
    return [
      { shade: -300, hex: baseColor.get() },
      { shade: -200, hex: baseColor.get() },
      { shade: -100, hex: baseColor.get() },
      { shade: -50, hex: baseColor.get() },
      { shade: 0, hex: baseColor.get() },
      { shade: 50, hex: baseColor.get() },
      { shade: 100, hex: baseColor.get() },
      { shade: 200, hex: baseColor.get() },
      { shade: 300, hex: baseColor.get() },
    ];
  }
};

interface Props {
  selectedColors: PaletteColor[];
  onAddShade: (colorIndex: number, shade: Shade) => void;
}

const ShadesList: React.FC<Props> = ({ selectedColors, onAddShade }) => {
  const shadesList = useMemo(() => {
    return selectedColors.map((color) => generateShades(color.baseColor));
  }, [selectedColors]);

  return (
    <Container>
      <ShadesTitle>Color Shades</ShadesTitle>
      {shadesList.map((colors, index) => (
        <ShadesRow key={index}>
          <ColorLabel>{selectedColors[index].title}</ColorLabel>
          <ShadesContainer>
            {colors.map((shade, shadeIndex) => (
              <ShadeBox
                key={shadeIndex}
                $color={shade.hex}
                onClick={() => onAddShade(index, shade)}
                title={`Shade: ${shade.shade}`}
                $isBase={shadeIndex === 4}
              />
            ))}
          </ShadesContainer>
        </ShadesRow>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const ShadesTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ShadesRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ColorLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
`;

const ShadesContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  height: 3.125rem;
  overflow-x: auto;
  padding: 0.25rem;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 0.125rem;
    height: 2.5rem;
  }
`;

const ShadeBox = styled.div.attrs<{ $color: string; $isBase: boolean }>(({ $color, $isBase }) => ({
  style: {
    backgroundColor: $color,
    borderColor: $isBase ? 'var(--text-color)' : 'var(--surface-border)',
    cursor: 'pointer',
  },
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.125rem solid;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export { ShadesList };
