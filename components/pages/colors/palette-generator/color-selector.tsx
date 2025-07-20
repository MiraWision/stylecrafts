import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

import { Label } from '@/components/ui/texts/label';
import { ColorInput } from '@/components/ui/inputs/color-input';

interface Props {
  selectedColors: PaletteColor[];
  onColorChange: (index: number, newBaseColor: string) => void;
  onRemoveColor: (index: number) => void;
}

const ColorSelector: React.FC<Props> = ({
  selectedColors,
  onColorChange,
  onRemoveColor,
}) => {
  return (
    <>
      {selectedColors.map((color, index) => (
        <ColorPickerContainer key={index}>
          <Label>{color.title}</Label>

          <ColorInputContainer>
            <ColorInput
              value={color.baseColor}
              onChange={(newColor) => onColorChange(index, newColor)}
            />

            {color.title === 'Additional Color' && (
              <RemoveButton onClick={() => onRemoveColor(index)}>
                x
              </RemoveButton>
            )}
          </ColorInputContainer>
        </ColorPickerContainer>
      ))}
    </>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  border: none;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export { ColorSelector };
