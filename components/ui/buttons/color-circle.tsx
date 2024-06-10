import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface ColorCircleProps {
  color: { name: string; hex: string };
  weight: number;
  totalWeight: number;
  onWeightChange: (color: string, newWeight: number) => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color, weight, totalWeight, onWeightChange }) => {
  const handleIncreaseWeight = () => {
    onWeightChange(color.hex, weight + 1);
  };

  const handleDecreaseWeight = () => {
    if (weight > 0) {
      onWeightChange(color.hex, weight - 1);
    }
  };

  const percentage = totalWeight ? ((weight / totalWeight) * 100).toFixed(0) : 0;

  const isDarkColor = (color: string) => {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff; // Extract red
    const g = (rgb >> 8) & 0xff; // Extract green
    const b = (rgb >> 0) & 0xff; // Extract blue
    const luma = 0.299 * r + 0.587 * g + 0.114 * b; // Calculate luma
    return luma < 128; // A value below 128 indicates a dark color
  };

  const textColor = isDarkColor(color.hex) ? 'var(--surface-a)' : 'var(--text-color)';
  const buttonBgColor = isDarkColor(color.hex) ? 'var(--surface-300)' : 'var(--surface-300)';
  const buttonHoverBgColor = isDarkColor(color.hex) ? 'var(--surface-200)' : 'var(--surface-200)';
  const buttonTextColor = isDarkColor(color.hex) ? 'var(--text-color-secondary)' : 'var(--text-color)';

  return (
    <ColorCircleContainer>
      <ColorCircleItem color={color.hex} onClick={handleIncreaseWeight}>
        {weight > 0 && (
          <>
            <WeightLabel color={textColor}>{weight}</WeightLabel>
            <PercentageLabel color={textColor}>{percentage}%</PercentageLabel>
          </>
        )}
      </ColorCircleItem>
      <ColorName>{color.name}</ColorName>
      {weight > 0 && (
        <MinusButton
          onClick={handleDecreaseWeight}
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverBgColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonBgColor)}
        >
          –
        </MinusButton>
      )}
    </ColorCircleContainer>
  );
};

export default ColorCircle;

const ColorCircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ColorCircleItem = styled.div<{ color: string }>`
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

const MinusButton = styled(Button)`
  border: none;
  box-shadow: none;
  width: 2.5rem;
  height: 1.25rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
`;
