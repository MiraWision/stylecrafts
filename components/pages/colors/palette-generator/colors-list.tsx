import React from 'react';
import styled from 'styled-components';

import { ColorInput } from '@/components/ui/inputs/color-input';
import { StepNumberInput } from '@/components/ui/inputs/step-number-input';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { RemoveButton } from '@/components/ui/buttons/remove-button';

interface Props {
  baseColorsWeights: { color: string; weight: number }[];
  onColorChange: (index: number, color: string) => void;
  onWeightChange: (index: number, weight: number) => void;
  onAddBaseColor: (color: string) => void;
  onDeleteBaseColor: (index: number) => void;
}

const ColorsList: React.FC<Props> = ({ 
  baseColorsWeights, 
  onColorChange, 
  onWeightChange, 
  onAddBaseColor,
  onDeleteBaseColor,
}) => {
  return (
    <ColorListContainer>
      {baseColorsWeights.map((item, index) => (
        <ColorItem key={index}>
          <ColorInputStyled
            value={item.color}
            onChange={(value) => onColorChange(index, value)}
          />

          <StepNumberInputStyled
            value={item.weight}
            onChange={(value) => onWeightChange(index, value)}
            min={0}
            max={100}
            step={1}
            showButtons
          />

          <RemoveButton onClick={() => onDeleteBaseColor(index)} />
        </ColorItem>
      ))}

      <PrimaryButton icon='pi pi-plus' onClick={() => onAddBaseColor('#ffffff')}>
        Add Color
      </PrimaryButton>
    </ColorListContainer>
  );
};

const ColorListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorInputStyled = styled(ColorInput)`
  width: 10rem;

  > input {
    width: 8rem;
    border-right: 0;
    border-radius: 0;
  }
`;

const StepNumberInputStyled = styled(StepNumberInput)`
  width: 5rem;
  margin-left: -0.5rem;

  input {
    width: 3rem;
    border-radius: 0;
  }
`;

export { ColorsList };
