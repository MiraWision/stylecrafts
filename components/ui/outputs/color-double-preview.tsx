import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface ColorPreviewProps {
  currentColor: string;
  targetColor: string;
  similarity: number;
  resetColor: () => void;
}

const DoubleColorPreview: React.FC<ColorPreviewProps> = ({ currentColor, targetColor, similarity, resetColor }) => {
  return (
    <ColorPreviewContainer>
      <ColorSection className="left" color={currentColor}>
        {!currentColor && <CheckeredBackground />}
        <Overlay>
          <SectionTitle>Your Mix</SectionTitle>
          <ColorCode>{currentColor || ''}</ColorCode>
          <Similarity>Match: {currentColor ? similarity.toFixed(2) : 0}%</Similarity>
        </Overlay>
      </ColorSection>
      <ColorSection className="right" color={targetColor}>
        <Overlay>
          <SectionTitle>Target</SectionTitle>
          <ColorCode>{targetColor}</ColorCode>
        </Overlay>
      </ColorSection>
      <ResetButton icon="pi pi-refresh" onClick={resetColor} />
    </ColorPreviewContainer>
  );
};

export default DoubleColorPreview;

const ColorPreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 2px; 
  border-radius: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 50vw;
  height: 25vw;
  overflow: hidden;
`;

const ColorSection = styled.div<{ color: string }>`
  flex: 1;
  height: 100%;
  background-color: ${({ color }) => color || 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &.left {
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }

  &.right {
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }
`;

const CheckeredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%, transparent),
                    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  background-color: rgba(255, 255, 255, 0.8);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const ColorCode = styled.p`
  font-size: 1rem;
  margin: 0.5rem;
`;

const Similarity = styled.p`
  font-size: 1rem;
  margin: 0.5rem;
`;

const ResetButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: var(--surface-200);
  color: var(--text-color-secondary);
  border: none;
  box-shadow: none;
  &:hover {
    background-color: var(--surface-c);
  }
`;
