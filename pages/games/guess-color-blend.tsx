import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { convertColor, blendMultipleColors, ColorFormat } from '@mirawision/colorize';
import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/game-guess-color-blend';
import { Button } from 'primereact/button';
import { ColorCircle } from '@/components/ui/buttons/color-circle';
import { DoubleColorPreview } from '@/components/pages/games/guess-color-blend.ts/color-double-preview';
import { Timer } from '@/components/ui/timer';
import { Title } from '@/components/ui/texts/typography';
import {
  availableColors,
  difficultyLevels,
  calculateMinDrops,
  ConvertedColors,
  calculateSimilarity,
  resetGame,
  resetChallenge,
  increaseDifficulty
} from '../../components/pages/games/guess-color-blend.ts/blend-game-logic';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

const ColorMixer = () => {
  const [currentColor, setCurrentColor] = useState<string>('');
  const [targetColor, setTargetColor] = useState<string>('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const [selectedColors, setSelectedColors] = useState<{ color: string; weight: number }[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('Easy');
  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [initialDropsCount, setInitialDropsCount] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const storedTopScore = localStorage.getItem('topScore');
    if (storedTopScore) {
      setTopScore(parseInt(storedTopScore, 10));
    }
  }, []);

  const resetColor = () => {
    if (isChallenge) {
      resetChallenge(setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setScore, setTimerDuration, setInitialDropsCount);
    } else {
      resetGame(difficulty, setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setInitialDropsCount);
    }
  };

  useEffect(() => {
    if (isChallenge) {
      resetChallenge(setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setScore, setTimerDuration, setInitialDropsCount);
    } else {
      resetGame(difficulty, setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setInitialDropsCount);
    }
  }, [difficulty, isChallenge]);

  useEffect(() => {
    if (selectedColors.some((color) => color.weight > 0)) {
      const blendedColor = blendMultipleColors(selectedColors);
      setCurrentColor(blendedColor);
      const newConvertedColors: ConvertedColors = {};
      Object.values(ColorFormat).forEach((format) => {
        try {
          newConvertedColors[format] = convertColor(blendedColor, format);
        } catch (error) {
          console.error('Error converting color:', error);
          newConvertedColors[format] = '';
        }
      });
      setConvertedColors(newConvertedColors);
    } else {
      setCurrentColor('');
      setConvertedColors({});
    }
  }, [selectedColors]);

  const handleWeightChange = (color: string, newWeight: number) => {
    setSelectedColors((prev) => prev.map((c) => (c.color === color ? { ...c, weight: newWeight } : c)));
  };

  const handleResetAllColors = () => {
    setSelectedColors((prev) => prev.map((c) => ({ ...c, weight: 0 })));
  };

  const totalWeight = selectedColors.reduce((sum, c) => sum + c.weight, 0) || 1;
  const colorBar = selectedColors.map((c, index) => (
    <ColorBarSegment key={index} color={c.color} width={(c.weight / totalWeight) * 100 + '%'} />
  ));

  const similarity = currentColor ? calculateSimilarity(currentColor, targetColor) : 0;

  useEffect(() => {
    if (similarity > 99.9) {
      if (isChallenge) {
        const minDrops = calculateMinDrops(selectedColors, targetColor);
        setScore((prevScore) => prevScore + minDrops);
        setTimerDuration((prevDuration) => prevDuration + minDrops * 3);
        setMessage(`Well done! You earned ${minDrops} points and ${minDrops * 3} extra seconds.`);
        setTimeout(() => {
          setMessage(null);
          increaseDifficulty(score, setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setInitialDropsCount);
        }, 2000);

        GAService.logEvent(analyticsEvents.game.levelCompleted(`Score: ${score + minDrops}`));
      } else {
        setMessage('Congratulations! You matched the color! Click to start a new game.');

        GAService.logEvent(analyticsEvents.game.levelCompleted('Color matched in normal mode'));
      }
    } else {
      GAService.logEvent(analyticsEvents.game.colorGuessAttempted(`Guess similarity: ${similarity}`));
    }
  }, [similarity]);

  useEffect(() => {
    if (timerDuration <= 0) {
      setMessage(`Time's up! Game over.`);
      setIsChallenge(false);
      if (score > topScore) {
        setTopScore(score);
        localStorage.setItem('topScore', score.toString());
      }
      
      GAService.logEvent(analyticsEvents.game.gameStarted(`Game over with score: ${score}`));
    }
  }, [timerDuration]);

  const handleTimeUp = () => {
    setMessage(`Time's up! Game over.`);
    setIsChallenge(false);
    if (score > topScore) {
      setTopScore(score);
      localStorage.setItem('topScore', score.toString());
    }

    GAService.logEvent(analyticsEvents.game.gameStarted(`Game over with score: ${score}`));
  };

  const handleDifficultyChange = (level: string) => {
    setIsChallenge(false);
    setDifficulty(level);
    resetGame(level, setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setInitialDropsCount);
  };

  const startChallenge = () => {
    setIsChallenge(true);
    resetChallenge(setSelectedColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setScore, setTimerDuration, setInitialDropsCount);
    
    GAService.logEvent(analyticsEvents.game.challengeModeStarted('Challenge mode started'));
  };

  useEffect(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }

    if (isChallenge && timerDuration > 0) {
      timerRef.current = window.setInterval(() => {
        setTimerDuration((prevDuration) => {
          const newDuration = prevDuration - 1;

          GAService.logEvent(analyticsEvents.game.challengeProgressed(`Remaining time: ${newDuration}`));
          
          return newDuration;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isChallenge, timerDuration]);

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <Title>Color Mixer</Title>

      <DifficultyButtonsContainer>
        {difficultyLevels.map((level) => (
          <DifficultyButton
            key={level.value}
            label={level.label}
            className={difficulty === level.value && !isChallenge ? 'selected' : ''}
            onClick={() => handleDifficultyChange(level.value)}
          />
        ))}
        <ChallengeButton
          label='Challenge'
          className={isChallenge ? 'selected' : ''}
          onClick={startChallenge}
        />
      </DifficultyButtonsContainer>
      {isChallenge && (
        <TimerContainer>
          <Timer key={timerKey} duration={timerDuration} onTimeUp={handleTimeUp} />
        </TimerContainer>
      )}
      <ContentContainer>
        <DoubleColorPreview
          currentColor={currentColor}
          targetColor={targetColor}
          similarity={similarity}
          resetColor={resetColor}
        />
        {isChallenge && (
          <ScoreDisplay>
            Score: {score} {topScore > 0 && `| Top Score: ${topScore}`}
          </ScoreDisplay>
        )}
        <ColorBarContainer>
          <ColorBar>{colorBar}</ColorBar>
        </ColorBarContainer>
        <ColorCirclesContainer>
          {selectedColors.some(c => c.weight > 0) && (
            <ResetAllButton icon='pi pi-undo' onClick={handleResetAllColors} />
          )}
          {selectedColors.map((c, index) => (
            <ColorCircle
              key={index}
              color={availableColors.find(ac => ac.hex === c.color) as { name: string; hex: string }}
              weight={c.weight}
              totalWeight={totalWeight}
              onWeightChange={handleWeightChange}
            />
          ))}
        </ColorCirclesContainer>
        {message && !isChallenge && (
          <MessageOverlay onClick={resetColor}>{message}</MessageOverlay>
        )}
        {message && isChallenge && (
          <MessageOverlay>{message}</MessageOverlay>
        )}
      </ContentContainer>
    </BaseLayout>
  );
};

const DifficultyButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DifficultyButton = styled(Button)`
  background-color: transparent;
  color: var(--primary-color);
  border: 0.0625rem solid var(--primary-color);
  &.selected {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
  }
`;

const ChallengeButton = styled(Button)`
  background-color: transparent;
  color: var(--primary-color);
  border: 0.0625rem solid var(--primary-color);
  &.selected {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ColorBarContainer = styled.div`
  width: 50vw;
  margin-top: 1rem;

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 16rem;
  }

  @media (max-width: 900px) {
    max-width: 14rem;
  }

  @media (max-width: 600px) {
    max-width: 12rem;
  }

  @media (max-width: 400px) {
    max-width: 10rem;
  }
`;

const ColorBar = styled.div`
  display: flex;
  width: 100%;
  height: 1.25rem;
`;

const ColorBarSegment = styled.div<{ color: string; width: string }>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: 100%;
`;

const ColorCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const ResetAllButton = styled(Button)`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  border: none;
  margin-right: 1rem;
`;

const ScoreDisplay = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const MessageOverlay = styled.div`
  position: fixed;
  top: 35%;
  left: 57%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--surface-300);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  z-index: 10;
  cursor: pointer;
`;

export default ColorMixer;