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
  onSelectShade: (colorIndex: number, shade: Shade) => void;
}

const ShadesList: React.FC<Props> = ({ selectedColors, onSelectShade }) => {
  const shadesList = useMemo(() => {
    return selectedColors.map((color) => generateShades(color.baseColor));
  }, [selectedColors]);

  return (
    <Container>
      {shadesList.map((colors, index) => (
        <ShadesRow key={index}>
          <ShadesContainer>
            {colors.map((shade, shadeIndex) => (
              <ShadeBox
                key={shadeIndex}
                $color={shade.hex}
                onClick={() => onSelectShade(index, shade)}
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
  align-items: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

const ShadesRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShadesContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  height: 3.25rem;
  overflow-x: auto;
  padding: 0.125rem;
  max-width: 100%;
`;

const ShadeBox = styled.div.attrs<{ $color: string; $isBase: boolean }>(({ $color, $isBase }) => ({
  style: {
    backgroundColor: $color,
    borderColor: $isBase ? 'var(--surface-500)' : 'var(--surface-border)',
    cursor: 'pointer',
  },
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 1.75rem;
    height: 1.75rem;
    
    &:nth-child(1), &:nth-child(2), &:nth-child(8), &:nth-child(9) {
      display: none;
    }
  }
`;

export { ShadesList };
