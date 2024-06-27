import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

import { Label } from '@/components/ui/texts/label';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { RemoveButton } from '@/components/ui/buttons/remove-button';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';

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
    <>
      {selectedColors.map((color, index) => (
        <ColorPickerContainer key={index}>
          <Label>{color.title}</Label>

          <ColorInputContainer>
            <ColorInput
              value={color.baseColor}
              onChange={(newColor) => onColorChange(index, newColor)}
            />

            {index > 3 && (
              <RemoveButton 
                onClick={() => onRemoveColor(index)}
              />
            )}
          </ColorInputContainer>
        </ColorPickerContainer>
      ))}

      <PrimaryButton icon='pi pi-plus' onClick={onAddColor}>
          Add Color
      </PrimaryButton>
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

export { ColorSelector };
