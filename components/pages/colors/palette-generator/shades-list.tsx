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

// Компонент ShadesList для отображения списка оттенков
const ShadesList: React.FC<Props> = ({ selectedColors, onAddShade }) => {
  const shadesList = useMemo(() => {
    return selectedColors.map((color) => generateShades(color.baseColor));
  }, [selectedColors]);

  return (
    <Container>
      {shadesList.map((colors, index) => (
        <ShadesRow key={index}>
          {colors.map((shade, shadeIndex) => (
            <ShadeBox
              key={shadeIndex}
              $color={shade.hex}
              onClick={() => onAddShade(index, shade)}
              title={`Shade: ${shade.shade}`}
            />
          ))}
        </ShadesRow>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShadesRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 3.125rem;
`;

const ShadeBox = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    backgroundColor: $color,
    borderColor: 'var(--surface-border)',
    cursor: 'pointer',
  },
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid;
`;

export { ShadesList };
