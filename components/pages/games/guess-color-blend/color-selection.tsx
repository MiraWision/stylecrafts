import React, { useMemo } from 'react';
import styled from 'styled-components';

import { SelectedColor } from './types';

import { ColorCircle } from './color-circle';
import { RefreshIconButton } from '@/components/ui/icon-buttons/refresh-icon-button';
import { Label } from '@/components/ui/texts/label';

interface Props {
  selectedColors: SelectedColor[];
  totalWeight: number;
  isMatched: boolean;
  gameStarted: boolean;
  gameOver: boolean;
  onWeightChange: (color: string, increment: number) => void;
  onResetAll: () => void;
}

const ColorSelection: React.FC<Props> = ({ selectedColors, totalWeight, isMatched, gameStarted, gameOver, onWeightChange, onResetAll }) => {
  const hasSelectedColors = useMemo(() => selectedColors.some(color => color.weight > 0), [selectedColors]);

  return (
    <Container>
      <Label>Mix Basic Colors to Match Target Color</Label>

      <ColorBar>
        {selectedColors.map((color) => (
          <ColorBarSegment
            key={color.hex}
            $backgroundColor={color.hex}
            $width={`${totalWeight > 0 ? color.weight / totalWeight * 100 : 0}%`}
          />
        ))}
      </ColorBar>

      <ColorCirclesRow>
        {hasSelectedColors && (
          <RefreshButtonContainer>
            <RefreshIconButton onClick={onResetAll} />
          </RefreshButtonContainer>
        )}
        <ColorCirclesContainer>
          {selectedColors.map((color) => (
            <ColorCircle
              key={color.hex}
              color={color}
              totalWeight={totalWeight}
              onWeightChange={(!isMatched && !gameOver && gameStarted) ? onWeightChange : undefined}
            />
          ))}
        </ColorCirclesContainer>
      </ColorCirclesRow>
    </Container>
  );
};

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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ColorBarSegment = styled.div.attrs<{ $backgroundColor: string; $width: string }>(({ $backgroundColor, $width }) => ({
  style: {
    backgroundColor: $backgroundColor,
    width: $width,
  },
}))`
  height: 100%;
  transition: width 0.5s;
`;

const ColorCirclesRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
`;

const ColorCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const RefreshButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: -2.5rem;
  transform: translateX(-50%);
`;

export { ColorSelection };
