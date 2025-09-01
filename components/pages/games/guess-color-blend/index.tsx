import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { calculateSimilarity } from '@mirawision/colorize/calculate-similarity';

import { getDifficulty, getRandomColor } from './utils';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { Level, Difficulty, SelectedColor } from './types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PaletteColors } from './data';

import { ColorsPreview } from '@/components/pages/games/guess-color-blend/colors-preview';

import { ColorSelection } from './color-selection';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { useTimer } from '@/hooks/use-timer';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { StartIcon } from './start-icon';

interface Props {}

const DefaultSelectedColors = PaletteColors.map((color) => ({ ...color, weight: 0 }));

const GuessColorBlendMain: React.FC<Props> = ({}) => {
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>(DefaultSelectedColors);
  const [level, setLevel] = useState<Level>(Level.Challenge);
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useLocalStorage<number>('top-score', 0);
  const [isClient, setIsClient] = useState<boolean>(false);

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

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

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
    setIsClient(true);
  }, []);

  useEffect(() => {
    resetSelectedColors();
    generateTargetColor();
  }, [level]);

  useEffect(() => {
    if (isMatched && gameStarted) {
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

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    handleTime.reset();
    handleTime.play();
    resetSelectedColors();
    generateTargetColor();
    GAService.logEvent(analyticsEvents.games.challengeStarted());
  };

  const nextGame = () => {
    resetSelectedColors();
    generateTargetColor();

    if (gameStarted) {
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
    <GameContainer>
      <GameControlsContainer>
        <GameStatsContainer>
          <StatItem>
            <StatLabel>Score</StatLabel>
            <StatValue>{score}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Top Score</StatLabel>
            <StatValue>{isClient ? topScore : 0}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Time</StatLabel>
            <StatValue>{formatTime(remainingTime)}</StatValue>
          </StatItem>
        </GameStatsContainer>
        
        <StartButtonContainer>
          <BaseTextButton
            text={gameStarted ? 'Restart Game' : 'Start Game'}
            icon={<StartIcon size={24} />}
            onClick={gameStarted ? startGame : startGame}
            isPrimary
          />
        </StartButtonContainer>
      </GameControlsContainer>

      <ContentContainer>
        <ColorsPreview
          currentColor={currentColor}
          targetColor={targetColor}
          matchPercentage={matchPercentage}
          isMatched={isMatched}
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
    </GameContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  margin: 15vh auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin: 20vh auto 0;
  }
`;

const GameControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: var(--surface-50, #f5f5f5);
  border-radius: 0.75rem;
`;

const GameStatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: var(--text-color-secondary);
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
`;

const StartButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { GuessColorBlendMain };
