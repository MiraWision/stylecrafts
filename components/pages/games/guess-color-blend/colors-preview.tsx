import React from 'react';
import styled from 'styled-components';
import { getLuminance } from '@mirawision/colorize';

interface Props {
  currentColor: string;
  targetColor: string;
  matchPercentage: number;
  isMatched: boolean;
  onClick?: () => void;
}

const getTextColorBasedOnBackground = (bgColor: string) => {
  if (!bgColor) return '#000000';

  return getLuminance(bgColor) > 0.179 ? '#000000' : '#fff';
};

const ColorsPreview: React.FC<Props> = ({ currentColor, targetColor, matchPercentage, isMatched, onClick }) => {
  const currentTextColor = getTextColorBasedOnBackground(currentColor);

  const targetTextColor = getTextColorBasedOnBackground(targetColor);

  return (
    <Container>
      <ColorSection color={currentColor}>
        {!currentColor && (
          <EmptyBackground />
        )}

        <Overlay>
          <SectionTitle textColor={currentTextColor}>Your Mix</SectionTitle>

          <ColorCode textColor={currentTextColor}>{currentColor || '–'}</ColorCode>
          
          {/* <Similarity textColor={currentTextColor}>Match: {currentColor ? matchPercentage.toFixed(2) : 0}%</Similarity> */}
        </Overlay>
      </ColorSection>

      <ColorSection color={targetColor}>
        <Overlay>
          <SectionTitle textColor={targetTextColor}>Target</SectionTitle>

          <ColorCode textColor={targetTextColor}>{targetColor}</ColorCode>
        </Overlay>
      </ColorSection>

      <Match
        isMatched={isMatched}
        onClick={isMatched ? onClick : undefined}  
      >
        <MatchText>{matchPercentage.toFixed(2)}%</MatchText>

        {isMatched && (
          <MatchText>Next!</MatchText>
        )}
      </Match>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 0.8rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  width: 40vw;
  height: 20vw;
  border-radius: 0.5rem;
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
`;

const EmptyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #ededed 25%, transparent 25%, transparent 50%, #ededed 50%, #ededed 75%, transparent 75%, transparent),
                    linear-gradient(45deg, #ededed 25%, transparent 25%, transparent 50%, #ededed 50%, #ededed 75%, transparent 75%, transparent);
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
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ textColor }) => textColor};
`;

const ColorCode = styled.p<{ textColor: string }>`
  font-size: 0.875rem;
  color: ${({ textColor }) => textColor};
`;

const Match = styled.div<{ isMatched: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--surface-100);
  padding: 0.5rem 1rem;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 1rem;
  width: 5rem;
  height: 5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  cursor: ${({ isMatched }) => (isMatched ? 'pointer' : 'default')};
`;

const MatchText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color);
`;

export { ColorsPreview };
