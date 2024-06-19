import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  currentColor: string;
  targetColor: string;
  matchPercentage: number;
  isMatched: boolean;
  isChallenge: boolean;
  gameOver: boolean;
  onClick?: () => void;
}

const ColorsPreview: React.FC<Props> = ({ currentColor, targetColor, matchPercentage, isMatched, isChallenge, gameOver, onClick }) => {
  const text = useMemo(() => {
    if (gameOver) {
      return 'Game Over';
    }

    return `${matchPercentage.toFixed(2)}% Match`;
  }, [gameOver, matchPercentage]);

  const hoverText = useMemo(() => {
    if (isChallenge) {
      if (gameOver) {
        return 'New Challenge';
      }

      if (isMatched) {
        return 'Next Game';
      }

      return 'Keep Going!';
    }

    return 'New Game';
  }, [isChallenge, gameOver, isMatched]);
  
  const handleOnClick = () => {
    if (isChallenge) {
      if (gameOver || isMatched) {
        onClick?.();
      }
    } else {
      onClick?.();
    }
  };

  return (
    <Container>
      <ColorSection color={currentColor}>
        {!currentColor && (
          <EmptyBackground />
        )}

        <Overlay>
          <SectionTitle>Your Mix</SectionTitle>

          <ColorCode>{currentColor || '–'}</ColorCode>
        </Overlay>
      </ColorSection>

      <Match
        isMatched={isMatched}
        onClick={handleOnClick}  
      >
        <MatchText>{text}</MatchText>

        <HoverText>{hoverText}</HoverText>
      </Match>

      <ColorSection color={targetColor}>
        <Overlay>
          <SectionTitle>Target</SectionTitle>

          <ColorCode>{targetColor}</ColorCode>
        </Overlay>
      </ColorSection>
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
  width: 30rem;
  height: 15rem;
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ColorSection = styled.div<{ color: string }>`
  flex: 1;
  height: 100%;
  background-color: ${({ color }) => color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 0.0625rem solid var(--surface-border);
  transition: background-color 0.5s;

  &:first-child {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: none;
  }

  &:last-child {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
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

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.8);
`;

const ColorCode = styled.p`
  font-size: 0.875rem;
  color: #ffffff;
  text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.8);
`;

const MatchText = styled.div`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
`;

const HoverText = styled.div`
  display: none;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  color: var(--primary-color);
`;

const Match = styled.div<{ isMatched: boolean }>`
  position: absolute;
  z-index: 1;
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
  border: 0.0625rem solid ${({ isMatched }) => isMatched ? 'var(--primary-color)' : 'var(--surface-border)'};
  border-radius: 1rem;
  width: 5rem;
  height: 5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  cursor: pointer;
  color: ${({ isMatched }) => (isMatched ? 'var(--primary-color)' : 'var(--text-color)')};

  &:hover {
    background-color: var(--surface-200);

    ${HoverText} {
      display: block;
    }

    ${MatchText} {
      display: none;
    }
  }
`;

export { ColorsPreview };
