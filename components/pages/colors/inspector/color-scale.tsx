import React from 'react';
import styled from 'styled-components';

interface Props {
  scaleGradient: string[];
  scaleValue: number;
  width?: number;
}

const ColorScale: React.FC<Props> = ({ scaleGradient, scaleValue, width = 100 }) => {
  return (
    <ScaleContainer width={width}>
      <ScaleBar colors={scaleGradient}>
        <Indicator position={scaleValue} />
      </ScaleBar>
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

const ScaleBar = styled.div<{ colors: string[] }>`
  position: relative;
  width: 100%;
  height: 0.75em;
  border-radius: 0.25rem;
  border: 1px solid var(--surface-300);
  background: linear-gradient(to right, ${({ colors }) => colors.join(', ')});
  transition: background 0.3s;
`;

const Indicator = styled.div<{ position: number }>`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position * 100}%;
  width: 0.25rem;
  height: 1rem;
  background-color: var(--surface-0);
  border-radius: 0.125rem;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0,0,0,0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  border: 1px solid var(--surface-500);
  transition: left 0.3s;
`;

export { ColorScale };
