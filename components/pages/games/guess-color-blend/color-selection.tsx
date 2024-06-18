import React from 'react';
import styled from 'styled-components';

import { SelectedColor } from './types';

import { ColorCircle } from './color-circle';
import { RefreshButton } from '@/components/ui/buttons/refresh-button';
import { Label } from '@/components/ui/texts/label';

interface Props {
  selectedColors: SelectedColor[];
  totalWeight: number; 
  isMatched: boolean;
  gameOver: boolean;
  onWeightChange: (color: string, increment: number) => void;
  onResetAll: () => void; 
}

const ColorSelection: React.FC<Props> = ({ selectedColors, totalWeight, isMatched, gameOver, onWeightChange, onResetAll }) => {
  return (
    <Container>
      <Label>Mix Basic Colors to Match Target Color</Label>

      <ColorBar>
        {selectedColors.map((color) => (
          <ColorBarSegment
            key={color.hex}
            color={color.hex}
            width={`${color.weight / totalWeight * 100}%`}
          />  
        ))}
      </ColorBar>

      <ColorCirclesContainer>
        <RefreshButtonStyled onClick={onResetAll} />

        {selectedColors.map((color) => (
          <ColorCircle
            key={color.hex}
            color={color}
            totalWeight={totalWeight}
            onWeightChange={(!isMatched && !gameOver) ? onWeightChange : undefined}
          />
        ))}
      </ColorCirclesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ColorBar = styled.div`
  display: flex;
  width: 30rem;
  height: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
`;

const ColorBarSegment = styled.div<{ color: string; width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  transition: width 0.5s;
  background-color: ${({ color }) => color};
`;

const ColorCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: -2rem;
`;

export { ColorSelection };
