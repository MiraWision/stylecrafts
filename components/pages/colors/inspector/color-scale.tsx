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
  margin: 1rem 0;
`;

const ScaleBar = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid #444;
`;

const ScaleGradient = styled.div<{ colors: string[] }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, ${({ colors }) => colors.join(', ')});
`;

const Indicator = styled.div<{ position: number }>`
  position: absolute;
  top: -5px;
  left: ${({ position }) => position * 100}%;
  width: 3px;
  height: 40px;
  background-color: rgba(255, 0, 0, 0.7);
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
`;

const LabelContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  width: 100%;
  margin-top: 5px;
`;

const Label = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
`;

export { ColorScale };
