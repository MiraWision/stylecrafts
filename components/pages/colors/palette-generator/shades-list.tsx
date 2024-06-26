import React from 'react';
import styled from 'styled-components';

import { PaletteColor, Shade } from './types';


const generateShades = (color: string) => {
  return [
    { shade: 50, hex: color },
    { shade: 100, hex: color },
    { shade: -50, hex: color },
    { shade: -100, hex: color },
  ];
};

interface Props {
  selectedColors: PaletteColor[];
  onAddShade: (colorIndex: number, shade: Shade) => void;
}

const ShadesList: React.FC<Props> = ({ selectedColors, onAddShade }) => {
  return (
    <div>
      {selectedColors.map((color, index) => (
        <div key={index}>
          <h3>{color.title}</h3>
          <ShadeContainer>
            {generateShades(color.baseColor).map((shade, shadeIndex) => (
              <ShadeBox
                key={shadeIndex}
                color={shade.hex}
                onClick={() => onAddShade(index, shade)}
              />
            ))}
          </ShadeContainer>
        </div>
      ))}
    </div>
  );
};

const ShadeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ShadeBox = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
`;

export { ShadesList };
