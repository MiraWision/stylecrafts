import React from 'react';
import styled from 'styled-components';

import { ColorInput } from '@/components/ui/inputs/color-input';

import { PaletteColor } from './types';

interface Props {
  selectedColors: PaletteColor[];
  onColorChange: (index: number, newBaseColor: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
}

const ColorSelector: React.FC<Props> = ({
  selectedColors,
  onColorChange,
  onAddColor,
  onRemoveColor
}) => {

  return (
    <div>
      {selectedColors.map((color, index) => (
        <ColorPickerContainer key={index}>
          <ColorInput
            value={color.baseColor}
            onChange={(newColor) => onColorChange(index, newColor)}
          />
          {index > 3 && <button onClick={() => onRemoveColor(index)}>Remove</button>}
        </ColorPickerContainer>
      ))}
      <button onClick={onAddColor}>Add Color</button>
    </div>
  );
};

const ColorPickerContainer = styled.div`
  margin-bottom: 20px;
`;

export { ColorSelector };
