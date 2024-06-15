import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { getLuminance } from '@mirawision/colorize';

interface Props {
  currentColor: string;
  targetColor: string;
  similarity: number;
  resetColor: () => void;
}

const getTextColorBasedOnBackground = (bgColor: string) => {
  if (!bgColor) return '#000';

  return getLuminance(bgColor) > 0.179 ? '#000' : '#fff';
};

const DoubleColorPreview: React.FC<Props> = ({ currentColor, targetColor, similarity, resetColor }) => {
  const currentTextColor = getTextColorBasedOnBackground(currentColor);
  const targetTextColor = getTextColorBasedOnBackground(targetColor);

  return (
    <ColorPreviewContainer>
      <ColorSection className='left' color={currentColor}>
        {!currentColor && (
          <CheckeredBackground />
        )}

        <Overlay>
          <SectionTitle textColor={currentTextColor}>Your Mix</SectionTitle>

          <ColorCode textColor={currentTextColor}>{currentColor || ''}</ColorCode>
          
          <Similarity textColor={currentTextColor}>Match: {currentColor ? similarity.toFixed(2) : 0}%</Similarity>
        </Overlay>
      </ColorSection>

      <ColorSection className='right' color={targetColor}>
        <Overlay>
          <SectionTitle textColor={targetTextColor}>Target</SectionTitle>

          <ColorCode textColor={targetTextColor}>{targetColor}</ColorCode>
        </Overlay>
      </ColorSection>
      
      <ResetButton icon='pi pi-refresh' onClick={resetColor} />
    </ColorPreviewContainer>
  );
};

const ColorPreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0.125rem; 
  border-radius: 0.8rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5);
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
  background-size: 1.25rem 1.25rem;
  background-position: 0 0, 0.625rem 0.625rem;
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
`;

const SectionTitle = styled.h2<{ textColor: string }>`
  font-size: 1.5rem;
  margin: 0.5rem;
  color: ${({ textColor }) => textColor};
`;

const ColorCode = styled.p<{ textColor: string }>`
  font-size: 1rem;
  margin: 0.5rem;
  color: ${({ textColor }) => textColor};
`;

const Similarity = styled.p<{ textColor: string }>`
  font-size: 1rem;
  margin: 0.5rem;
  color: ${({ textColor }) => textColor};
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

export { DoubleColorPreview };