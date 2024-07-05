import React from 'react';
import styled, { css } from 'styled-components';

import { InputNumber } from 'primereact/inputnumber';

interface ColorWeight {
  color: string;
  weight: number;
}

interface Props {
  colorWeight: ColorWeight;
  onWeightChange: (weight: number) => void; 
}

const ColorWeightInput: React.FC<Props> = ({ colorWeight, onWeightChange }) => {
  return (
    <Container>
      <Color $backgroundColor={colorWeight.color} />

      <WeightInput
        value={colorWeight.weight}
        onChange={(e) => onWeightChange(e.value ?? 0)}
        $isEmpty={colorWeight.weight === 0}
        min={0}
      />

      <WeightButtons>
        <WeightButton onClick={() => onWeightChange(colorWeight.weight - 1)}>
          -
        </WeightButton>

        <WeightButton onClick={() => onWeightChange(colorWeight.weight + 1)}>
          +
        </WeightButton>
      </WeightButtons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
`;

const Color = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 100%;
  height: 3rem;
  border-radius: 0.25rem 0.25rem 0 0;
  border-bottom: 0.0625rem solid var(--surface-border);
`;

const WeightInput = styled(InputNumber).attrs<{ $isEmpty: boolean }>(({ $isEmpty }) => ({
  className: $isEmpty ? 'empty' : '',
}))`
  width: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 0.0625rem solid var(--surface-border);
  
  input {
    width: 100%;
    height: 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    border: none;
    box-shadow: none;
    transition: color 0.3s;

    &:focus {
      box-shadow: none;
    }

    &.empty {
      color: var(--surface-400);
      font-weight: 300;
    }
  }
`;

const WeightButtons = styled.div`
  display: flex;
  width: 100%;
  background: var(--surface-0);
  border-radius: 0 0 0.25rem 0.25rem;
`;

const WeightButton = styled.button`
  width: 50%;
  height: 1.5rem;
  border: none;
  font-size: 1.125rem;
  font-weight: 300;
  cursor: pointer;

  &:first-child {
    border-right: 0.0625rem solid var(--surface-border);
  }
`;

export { ColorWeightInput };