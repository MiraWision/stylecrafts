import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '@mirawision/colorize';

import { PaletteColor, Shade } from './types';


const generateShades = (color: string): Shade[] => {
  const baseColor = new Color(color);
  
  try {
    return [
      { shade: -200, hex: baseColor.withTint(0.2) },
      { shade: -100, hex: baseColor.withTint(0.1) },
      { shade: 0, hex: baseColor.get() },
      { shade: 100, hex: baseColor.withShade(0.1) },
      { shade: 200, hex: baseColor.withShade(0.2) },
    ];
  } catch (error) {
    return [
      { shade: -200, hex: baseColor.get() },
      { shade: -100, hex: baseColor.get() },
      { shade: 0, hex: baseColor.get() },
      { shade: 100, hex: baseColor.get() },
      { shade: 200, hex: baseColor.get() },
    ];
  }
};

interface Props {
  selectedColors: PaletteColor[];
  onAddShade: (colorIndex: number, shade: Shade) => void;
}

const ShadesList: React.FC<Props> = ({ selectedColors, onAddShade }) => {
  const shades = useMemo(() => {
    return selectedColors.map((color) => {
      return generateShades(color.baseColor);
    });
  }, [selectedColors]);
  
  return (
    <Container>
      {shades.map((colors, index) => (
        <ShadesRow key={index}>
          {colors.map((shade, shadeIndex) => (
            <ShadeBox
              key={shadeIndex}
              color={shade.hex}
              onClick={() => shade.shade === 0 ? undefined : onAddShade(index, shade)}
              isCurrent={shade.shade === 0}
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

const ShadeBox = styled.div<{ color: string, isCurrent: boolean }>`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  cursor: pointer;

  ${({ isCurrent }) => isCurrent && css`
    border: 0.0625rem solid var(--primary-color);
    cursor: default;
  `}
`;

export { ShadesList };
