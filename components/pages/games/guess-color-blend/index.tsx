import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { calculateSimilarity } from '@mirawision/colorize/calculate-similarity';

import { getDifficulty, getRandomColor } from './utils';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { Level, Difficulty, SelectedColor } from './types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PaletteColors, PracticeLevelOptions } from './data';

import { ColorsPreview } from '@/components/pages/games/guess-color-blend/colors-preview';
import { Label } from '@/components/ui/texts/label';
import { ColorSelection } from './color-selection';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { useTimer } from '@/hooks/use-timer';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';

interface Props {}

const DefaultSelectedColors = PaletteColors.map((color) => ({ ...color, weight: 0 }));

const GuessColorBlendMain: React.FC<Props> = ({}) => {
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>(DefaultSelectedColors);
  const [mode, setMode] = useState<'Practice' | 'Challenge'>('Practice');
  const [level, setLevel] = useState<Level>(Level.Easy);
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useLocalStorage<number>('top-score', 0);

  const topScoreUpdated = useRef<boolean>(false);
  const [targetColor, setTargetColor] = useState<string>('');
  const currentDropsCount = useRef<number>(0);

  const difficulty = useMemo<Difficulty>(() => {
    return getDifficulty(level, score);
  }, [level, score]);

  const totalWeight = useMemo<number>(
    () => selectedColors.reduce((acc, color) => acc + color.weight, 0),
    [selectedColors]
  );

  const currentColor = useMemo<string>(() => {
    if (!selectedColors.some((color) => color.weight > 0)) {
      return '';
    }
    return rybslColorsMixing(
      selectedColors
        .filter((color) => color.weight > 0)
        .map((color) => ({ color: color.hex, weight: color.weight }))
    );
  }, [selectedColors]);

  const matchPercentage = useMemo<number>(() => {
    if (!currentColor || !targetColor) {
      return 0;
    }
    return calculateSimilarity(currentColor, targetColor);
  }, [currentColor, targetColor]);

  const isMatched = useMemo<boolean>(() => matchPercentage > 99, [matchPercentage]);
  const isChallenge = useMemo<boolean>(() => mode === 'Challenge', [mode]);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [remainingTime, ellapsedTime, handleTime] = useTimer(60, () => {
    setGameOver(true);

    GAService.logEvent(analyticsEvents.games.challengeEnded(ellapsedTime.toString()));
    GAService.logEvent(analyticsEvents.games.challengeScored(score.toString()));

    if (topScoreUpdated.current === true) {
      GAService.logEvent(analyticsEvents.games.challengeTopScored(topScore.toString()));
      topScoreUpdated.current = false;
    }
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
  }, [level, mode]);

  useEffect(() => {
    if (isMatched && isChallenge) {
      setScore((prev) => prev + currentDropsCount.current);
      handleTime.pause();
      handleTime.adjustTime(currentDropsCount.current);
      setTimeout(() => {
        nextGame();
      }, 500);
    }

    if (isMatched) {
      GAService.logEvent(analyticsEvents.games.colorMatched(level));
    }
  }, [isMatched]);

  useEffect(() => {
    if (score > topScore) {
      setTopScore(score);
      topScoreUpdated.current = true;
    }
  }, [score]);

  const resetSelectedColors = () => {
    setSelectedColors(DefaultSelectedColors);
  };

  const generateTargetColor = () => {
    const { color, dropsCount } = getRandomColor(
      PaletteColors.map((color) => color.hex),
      difficulty
    );
    setTargetColor(color);
    currentDropsCount.current = dropsCount;
  };

  const changeWeight = (hex: string, increment: number) => {
    setSelectedColors((prev) =>
      prev.map((color) => ({
        ...color,
        weight: color.hex === hex ? color.weight + increment : color.weight,
      }))
    );
  };

  const resetWeights = () => {
    resetSelectedColors();
  };

  const handleLevelChange = (level: Level) => {
    setLevel(level);
  };

  const handleModeChange = (mode: 'Practice' | 'Challenge') => {
    setMode(mode);
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

      GAService.logEvent(analyticsEvents.games.challengeStarted());
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <ModeButtonsContainer>
        <Label>Select Mode</Label>
        <ButtonsContainer>
          <ModeButton
            text="Practice"
            className={mode === 'Practice' ? 'selected' : ''}
            onClick={() => handleModeChange('Practice')}
          />
          <ModeButton
            text="Challenge"
            className={mode === 'Challenge' ? 'selected' : ''}
            onClick={() => handleModeChange('Challenge')}
          />
        </ButtonsContainer>
      </ModeButtonsContainer>

      <DifficultyButtonsContainer visible={mode === 'Practice'}>
        <Label>Select Difficulty</Label>
        <ButtonsContainer>
          {PracticeLevelOptions.map((item) => (
            <LevelButton
              key={item.value}
              text={item.label}
              className={level === item.value ? 'selected' : ''}
              onClick={() => handleLevelChange(item.value)}
            />
          ))}
        </ButtonsContainer>
      </DifficultyButtonsContainer>

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
};

const ModeButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    margin-top: 0;
  }
`;

interface DifficultyButtonsProps {
  visible: boolean;
}

const DifficultyButtonsContainer = styled.div<DifficultyButtonsProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
  pointer-events: ${(p) => (p.visible ? 'auto' : 'none')};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const BaseButton = styled(BaseTextButton)`
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

const LevelButton = styled(BaseButton)``;
const ModeButton = styled(BaseButton)``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export { GuessColorBlendMain };
