import React, { useMemo } from 'react';
import styled from 'styled-components';
import { isDark } from '@mirawision/colorize/is-dark';

import { SelectedColor } from './types';

import { RemoveIconButton } from '@/components/ui/icon-buttons/remove-icon-button';

interface Props {
  color: SelectedColor;
  totalWeight: number;
  onWeightChange?: (color: string, increment: number) => void;
}

const ColorCircle: React.FC<Props> = ({ color, totalWeight, onWeightChange }) => {
  const percentage = useMemo(() => totalWeight ? ((color.weight / totalWeight) * 100).toFixed(0) : 0, [color.weight, totalWeight]);

  const handleIncreaseWeight = () => {
    onWeightChange?.(color.hex, 1);
  };

  const handleDecreaseWeight = () => {
    if (color.weight > 0) {
      onWeightChange?.(color.hex, -1);
    }
  };

  const textColor = isDark(color.hex) ? 'var(--gray-200)' : 'var(--gray-700)';

  return (
    <Container>
      <Item $color={color.hex} onClick={handleIncreaseWeight}>
        {color.weight > 0 && (
          <>
            <WeightLabel $color={textColor}>{color.weight}</WeightLabel>

            <PercentageLabel $color={textColor}>{percentage}%</PercentageLabel>
          </>
        )}
      </Item>

      <ButtonContainer>
        {color.weight > 0 && (
          <RemoveIconButton
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

const Item = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    backgroundColor: $color,
  },
}))`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 0.2), 0 0 0 0.125rem rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const WeightLabel = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  top: 0.5rem;
`;

const PercentageLabel = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 0.75rem;
  position: absolute;
  bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

export { ColorCircle };
