import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

import { Label } from '@/components/ui/texts/label';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { RemoveIconButton } from '@/components/ui/icon-buttons/remove-icon-button';

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
              <RemoveIconButton
                onClick={() => onRemoveColor(index)}
                disabled={selectedColors.length <= 2}
              />
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
  gap: 0.5rem;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export { ColorSelector };
