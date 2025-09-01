import React from 'react';
import styled from 'styled-components';

interface Props {
  labels: { value: number; label: string }[];
  scaleGradient: string[];
  scaleValue: number;
  width?: number;
}

const ColorScale: React.FC<Props> = ({ labels, scaleGradient, scaleValue, width = 100 }) => {
  return (
    <ScaleContainer width={width}>
      <ScaleBar>
        <ScaleGradient colors={scaleGradient} />
        <Indicator position={scaleValue} />
      </ScaleBar>
      <LabelContainer columns={labels.length}>
        {labels.map(({ value, label }) => (
          <Label key={value}>{label}</Label>
        ))}
      </LabelContainer>
    </ScaleContainer>
  );
};

const ScaleContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ width }) => width}%;
  margin: 0.5rem 0;
`;

const ScaleBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const ScaleGradient = styled.div<{ colors: string[] }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, ${({ colors }) => colors.join(', ')});
`;

const Indicator = styled.div<{ position: number }>`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position * 100}%;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  border: 1px solid #333;
`;

const LabelContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  width: 100%;
  margin-top: 3px;
`;

const Label = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  color: #666;
`;

export { ColorScale };
