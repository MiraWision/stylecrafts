import React, { useState, useEffect, useMemo, use, useRef } from 'react';
import styled from 'styled-components';

import {
  calculateSimilarity,
  getDifficulty,
  getRandomColor
} from './utils';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { Level, Difficulty, SelectedColor } from './types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PaletteColors, LevelOptions } from './data';

import { ColorsPreview } from '@/components/pages/games/guess-color-blend/colors-preview';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { Label } from '@/components/ui/texts/label';
import { ColorSelection } from './color-selection';
import { blendColorsRealistic } from './blend-colors-realistic';
import { useTimer } from '@/hooks/use-timer';

interface Props {
}

const DefaultSelectedColors = PaletteColors.map((color) => ({ ...color, weight: 0 }));

const GuessColorBlendMain: React.FC<Props> = ({}) => {
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>(DefaultSelectedColors);
  
  const [level, setLevel] = useState<Level>(Level.Easy);
  
  const [score, setScore] = useState<number>(0);
  
  const [topScore, setTopScore] = useLocalStorage<number>('top-score', 0);

  const [targetColor, setTargetColor] = useState<string>('');

  const currentDropsCount = useRef<number>(0);

  const difficulty = useMemo<Difficulty>(() => {
    return getDifficulty(level, score);
  }, [level, score]);

  const totalWeight = useMemo<number>(() => selectedColors.reduce((acc, color) => acc + color.weight, 0), [selectedColors]);

  const currentColor = useMemo<string>(() => {
    if (!selectedColors.some((color) => color.weight > 0)) {
      return '';
    }

    return blendColorsRealistic(selectedColors.filter((color) => color.weight > 0).map((color) => ({ color: color.hex, weight: color.weight })));
  }, [selectedColors]);

  const matchPercentage = useMemo<number>(() => {
    if (!currentColor || !currentColor.length || !targetColor || !targetColor.length) {
      return 0;
    }

    return calculateSimilarity(currentColor, targetColor);
  }, [currentColor, targetColor]);

  const isMatched = useMemo<boolean>(() => matchPercentage > 99, [matchPercentage]);

  const isChallenge = useMemo<boolean>(() => level === Level.Challenge, [level]);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [remainingTime, ellapsedTime, handleTime] = useTimer(6, () => {
    setGameOver(true);

    console.log('ellapsedTime', ellapsedTime);
  });

  useEffect(() => {
    resetSelectedColors();

    generateTargetColor();

    if (isChallenge) {
      setScore(0);

      handleTime.reset();

      handleTime.play();
    } else {
      handleTime.pause();
    }
  }, [level]);

  useEffect(() => {
    if (isMatched && isChallenge) {
      setScore((prev) => prev + currentDropsCount.current);

      handleTime.pause();

      handleTime.adjustTime(currentDropsCount.current);
    }
  }, [isMatched]);

  useEffect(() => {
    if (score > topScore) {
      setTopScore(score);
    }
  }, [score]);

  const resetSelectedColors = () => {
    setSelectedColors(DefaultSelectedColors);
  };

  const generateTargetColor = () => {
    const { color, dropsCount } = getRandomColor(PaletteColors.map((color) => color.hex), difficulty);

    setTargetColor(color);

    currentDropsCount.current = dropsCount;
  };

  const changeWeight = (hex: string, increment: number) => {
    setSelectedColors((prev) => prev.map((color) => ({ 
      ...color, 
      weight: color.hex === hex ? color.weight + increment : color.weight,
    })));
  };

  const resetWeights = () => {
    resetSelectedColors();
  };

  const handleDifficultyChange = (level: Level) => {
    setLevel(level);
  };

  const nextGame = () => {
    resetSelectedColors();

    generateTargetColor();

    if (isChallenge) {
      handleTime.play();

      if (gameOver) {
        setGameOver(false);

        setScore(0);

        handleTime.reset();

        handleTime.play();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <DifficultyButtonsContainer>
        <Label>Select Difficulty</Label>

        <ButtonsContainer>
          {LevelOptions.map((item) => (
            <LevelButton
              key={item.value}
              label={item.label}
              className={level === item.value ? 'selected' : ''}
              onClick={() => handleDifficultyChange(item.value)}
            />
          ))}
        </ButtonsContainer>
      </DifficultyButtonsContainer>

      {isChallenge && (
        <ChallengeContainer>
          <ScoreContainer>
            Score: {score}
            
            {topScore > 0 && (
              <TopScore>Top Score: {topScore}</TopScore> 
            )}
          </ScoreContainer>

          <Time>{formatTime(remainingTime)}</Time>
        </ChallengeContainer>
      )}

      <ContentContainer>
        <ColorsPreview
          currentColor={currentColor}
          targetColor={targetColor}
          matchPercentage={matchPercentage}
          isMatched={isMatched}
          isChallenge={isChallenge}
          gameOver={gameOver}
          onClick={nextGame}
        />
      </ContentContainer>

      <ColorSelection
        selectedColors={selectedColors}
        totalWeight={totalWeight}
        isMatched={isMatched}
        gameOver={gameOver}
        onWeightChange={changeWeight}
        onResetAll={resetWeights}
      />
    </>
  );
}

const DifficultyButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 15vh;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const LevelButton = styled(PrimaryButton)`
  border-color: var(--surface-border);

  span {
    color: var(--text-color);
    font-weight: 400;
  }

  &.selected {
    border-color: var(--primary-color);

    span {
      color: var(--primary-color);
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ChallengeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
  margin: 1.5rem auto 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Time = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary-color);
`;

const ScoreContainer = styled.div`
  position: relative;
  font-size: 1.25rem;
  font-weight: 500;
`;

const TopScore = styled.div`
  position: absolute;
  top: -1rem;
  left: 0;
  width: 10rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-color);
`;

export { GuessColorBlendMain };