import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from './types';

interface PaletteProps {
  selectedColors: PaletteColor[];
  onRemoveColor: (colorIndex: number, shadeIndex?: number) => void;
}

const Palette: React.FC<PaletteProps> = ({ selectedColors, onRemoveColor }) => {
  return (
    <PaletteContainer>
      {selectedColors.map((color, colorIndex) => (
        <React.Fragment key={colorIndex}>
          <ColorBox color={color.baseColor} onDoubleClick={() => onRemoveColor(colorIndex)} />
          
          {color.shades.map((shade, shadeIndex) => (
            <ColorBox key={shadeIndex} color={shade.hex} onDoubleClick={() => onRemoveColor(colorIndex, shadeIndex)} />
          ))}
        </React.Fragment>
      ))}
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ColorBox = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
`;

export { Palette };
