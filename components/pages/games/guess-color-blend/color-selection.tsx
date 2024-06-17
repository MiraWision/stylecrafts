import React from 'react';
import styled from 'styled-components';

import { SelectedColor } from './types';

import { Button } from 'primereact/button';
import { ColorCircle } from './color-circle';
import { RefreshButton } from '@/components/ui/buttons/refresh-button';

interface Props {
  selectedColors: SelectedColor[];
  totalWeight: number; 
  onWeightChange: (color: string, increment: number) => void;
  onResetAll: () => void; 
}

const ColorSelection: React.FC<Props> = ({ selectedColors, totalWeight, onWeightChange, onResetAll }) => {
  return (
    <Container>
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
            onWeightChange={onWeightChange}
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
  gap: 1rem;
`;

const ColorBar = styled.div`
  display: flex;
  width: 100%;
  height: 1.25rem;
`;

const ColorBarSegment = styled.div<{ color: string; width: string }>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: 100%;
`;

const ColorCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: -3.3rem;
`;

export { ColorSelection };
