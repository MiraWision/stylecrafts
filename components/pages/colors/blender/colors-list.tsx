import React from 'react';
import styled from 'styled-components';
import { InputNumber } from 'primereact/inputnumber';

interface Props {
  baseColorsWeights: { color: string; weight: number }[];
  onWeightChange: (index: number, weight: number) => void;
  onAddBaseColor: (color: string) => void;
}

const ColorsList: React.FC<Props> = ({ baseColorsWeights, onWeightChange, onAddBaseColor }) => {
  return (
    <ColorListContainer>
      {baseColorsWeights.map((item, index) => (
        <ColorItem key={index}>
          <ColorSquare color={item.color} />
          <InputNumber
            value={item.weight}
            onValueChange={(e) => onWeightChange(index, e.value || 0)}
          />
        </ColorItem>
      ))}
      <button onClick={() => onAddBaseColor('#000000')}>Add Color</button> {/* Example button */}
    </ColorListContainer>
  );
};

const ColorListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ColorSquare = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  margin-right: 1rem;
`;

export { ColorsList };
