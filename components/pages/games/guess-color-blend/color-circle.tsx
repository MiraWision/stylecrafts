import React, { useMemo } from 'react';
import styled from 'styled-components';
import { isDark } from '@mirawision/colorize/is-dark';

import { Button } from 'primereact/button';
import { AvailableColor } from './types';

interface Props {
  color: AvailableColor;
  weight: number;
  totalWeight: number;
  onWeightChange: (color: string, increment: number) => void;
}

const ColorCircle: React.FC<Props> = ({ color, weight, totalWeight, onWeightChange }) => {
  const percentage = useMemo(() => totalWeight ? ((weight / totalWeight) * 100).toFixed(0) : 0, [weight, totalWeight]);

  const handleIncreaseWeight = () => {
    onWeightChange(color?.hex, 1);
  };

  const handleDecreaseWeight = () => {
    if (weight > 0) {
      onWeightChange(color?.hex, -1);
    }
  };

  const textColor = color ? isDark(color?.hex) ? 'var(--surface-a)' : 'var(--text-color)' : '';

  return (
    <Container>
      <Item color={color?.hex} onClick={handleIncreaseWeight}>
        {weight > 0 && (
          <>
            <WeightLabel color={textColor}>{weight}</WeightLabel>

            <PercentageLabel color={textColor}>{percentage}%</PercentageLabel>
          </>
        )}
      </Item>

      <ColorName>{color?.name}</ColorName>
      
      <ButtonContainer>
        {weight > 0 && (
          <RemoveButton
            icon='pi pi-minus'
            className='p-button-rounded p-button-danger p-button-sm'
            onClick={handleDecreaseWeight}
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Item = styled.div<{ color: string }>`
  width: 3.75rem;
  height: 3.75rem;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1), 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.08);
`;

const ColorName = styled.div`
  font-size: 0.75rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const WeightLabel = styled.div<{ color: string }>`
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  top: 0.5rem;
  color: ${({ color }) => color};
`;

const PercentageLabel = styled.div<{ color: string }>`
  font-size: 0.75rem;
  position: absolute;
  bottom: 0.5rem;
  color: ${({ color }) => color};
`;

const ButtonContainer = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

const RemoveButton = styled(Button)`
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;

  .pi {
    font-size: 0.75rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export { ColorCircle };
