import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { blendMultipleColors } from '@mirawision/colorize';

import {
  calculateSimilarity,
  getDifficulty,
  getRandomAvailableColors,
  getRandomColor
} from './utils';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { Level, Difficulty, AvailableColor, SelectedColor } from './types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { LevelOptions } from './data';

import { Button } from 'primereact/button';
import { ColorCircle } from '@/components/pages/games/guess-color-blend/color-circle';
import { ColorsPreview } from '@/components/pages/games/guess-color-blend/colors-preview';
import { Timer } from '@/components/ui/timer';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import css from 'styled-jsx/css';

interface Props {
}

const GuessColorBlendMain: React.FC<Props> = ({}) => {
  const [availableColors, setAvailableColors] = useState<AvailableColor[]>([]);
  
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>([]);
  
  const [level, setLevel] = useState<Level>(Level.Easy);
  
  const [score, setScore] = useState<number>(0);
  
  const [topScore, setTopScore] = useLocalStorage<number>('top-score', 0);

  const difficulty = useMemo<Difficulty>(() => {
    return getDifficulty(level, score);
  }, [level, score]);

  const targetColor = useMemo<string>(() => {
    if (!availableColors.length) {
      return '';
    }

    return getRandomColor(availableColors.map(({ hex }) => hex), difficulty.dropsCount);
  }, [availableColors, difficulty]);

  const currentColor = useMemo<string>(() => {
    if (!selectedColors.some((color) => color.weight > 0)) {
      return '';
    }

    return blendMultipleColors(selectedColors);
  }, [selectedColors]);

  const matchPercentage = useMemo<number>(() => {
    if (!currentColor || !currentColor.length || !targetColor || !targetColor.length) {
      return 0;
    }

    return calculateSimilarity(currentColor, targetColor);
  }, [currentColor, targetColor]);

  const isMatched = useMemo<boolean>(() => matchPercentage > 99, [matchPercentage]);

  const isChallenge = useMemo<boolean>(() => level === Level.Challenge, [level]);

  useEffect(() => {
    setAvailableColors(getRandomAvailableColors(difficulty.colorsCount));
  }, [level, score]);

  useEffect(() => {
    setSelectedColors(availableColors.map((color) => ({ color: color.hex, weight: 0 })));
  }, [availableColors]);

  const handleWeightChange = (color: string, increment: number) => {
    setSelectedColors((prev) => prev.map((c) => (c.color === color ? { ...c, weight: c.weight + increment } : c)));
  };

  const handleResetAllColors = () => {
    setSelectedColors((prev) => prev.map((color) => ({ ...color, weight: 0 })));
  };


  // --------------------------------------------------
  
   // const [timerDuration, setTimerDuration] = useState<number>(60);

  // const timerRef = useRef<number | null>(null);

  // useEffect(() => {
  //   if (similarity > 99.9) {
  //     if (isChallenge) {
  //       const minDrops = calculateMinDrops(availableColors, targetColor);
  //       setScore((prevScore) => prevScore + minDrops);
  //       setTimerDuration((prevDuration) => prevDuration + minDrops * 3);
  //       setMessage(`Well done! You earned ${minDrops} points and ${minDrops * 3} extra seconds.`);
  //       setTimeout(() => {
  //         setMessage(null);
  //         increaseDifficulty(score, setAvailableColors, setTargetColor, setCurrentColor, setConvertedColors, setInitialDropsCount);
  //       }, 2000);

  //       GAService.logEvent(analyticsEvents.game.levelCompleted(`Score: ${score + minDrops}`));
  //     } else {
  //       setMessage('Congratulations! You matched the color! Click to start a new game.');

  //       GAService.logEvent(analyticsEvents.game.levelCompleted('Color matched in normal mode'));
  //     }
  //   } else {
  //     GAService.logEvent(analyticsEvents.game.colorGuessAttempted(`Guess similarity: ${similarity}`));
  //   }
  // }, [similarity]);

  // useEffect(() => {
  //   if (timerDuration <= 0) {
  //     setMessage(`Time's up! Game over.`);
  //     setIsChallenge(false);
  //     if (score > topScore) {
  //       setTopScore(score);
  //       localStorage.setItem('topScore', score.toString());
  //     }
      
  //     GAService.logEvent(analyticsEvents.game.gameStarted(`Game over with score: ${score}`));
  //   }
  // }, [timerDuration]);

  // const handleTimeUp = () => {
  //   setMessage(`Time's up! Game over.`);
  //   setIsChallenge(false);
  //   if (score > topScore) {
  //     setTopScore(score);
  //     localStorage.setItem('topScore', score.toString());
  //   }

  //   GAService.logEvent(analyticsEvents.game.gameStarted(`Game over with score: ${score}`));
  // };

  const handleDifficultyChange = (level: Level) => {
    setLevel(level);
    // resetGame(level, setAvailableColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setInitialDropsCount);
  };

  // const startChallenge = () => {
  //   setIsChallenge(true);
  //   resetChallenge(setAvailableColors, setTargetColor, setCurrentColor, setConvertedColors, setTimerKey, setMessage, setScore, setTimerDuration, setInitialDropsCount);
    
  //   GAService.logEvent(analyticsEvents.game.challengeModeStarted('Challenge mode started'));
  // };

  // useEffect(() => {
  //   if (timerRef.current !== null) {
  //     clearInterval(timerRef.current);
  //   }

  //   if (isChallenge && timerDuration > 0) {
  //     timerRef.current = window.setInterval(() => {
  //       setTimerDuration((prevDuration) => {
  //         const newDuration = prevDuration - 1;

  //         GAService.logEvent(analyticsEvents.game.challengeProgressed(`Remaining time: ${newDuration}`));
          
  //         return newDuration;
  //       });
  //     }, 1000);
  //   }

  //   return () => {
  //     if (timerRef.current !== null) {
  //       clearInterval(timerRef.current);
  //     }
  //   };
  // }, [isChallenge, timerDuration]);

  return (
    <>
      <DifficultyButtonsContainer>
        {LevelOptions.map((item) => (
          <LevelButton
            key={item.value}
            label={item.label}
            className={level === item.value ? 'selected' : ''}
            onClick={() => handleDifficultyChange(item.value)}
          />
        ))}
      </DifficultyButtonsContainer>

      {/* {isChallenge && (
        <TimerContainer>
          <Timer duration={timerDuration} onTimeUp={handleTimeUp} />
        </TimerContainer>
      )} */}

      <ContentContainer>
        <ColorsPreview
          currentColor={currentColor}
          targetColor={targetColor}
          matchPercentage={matchPercentage}
          isMatched={isMatched}
        />

        {isChallenge && (
          <ScoreDisplay>
            Score: {score} {topScore > 0 && `| Top Score: ${topScore}`}
          </ScoreDisplay>
        )}

        {/* <ColorBarContainer>
          <ColorBar>{colorBar}</ColorBar>
        </ColorBarContainer> */}

        <ColorCirclesContainer>
          {selectedColors.map((c, index) => (
            <ColorCircle
              key={index}
              color={availableColors[index]}
              weight={c.weight}
              totalWeight={100}
              onWeightChange={handleWeightChange}
            />
          ))}
        </ColorCirclesContainer>
        {/* {message && !isChallenge && (
          <MessageOverlay onClick={resetColor}>{message}</MessageOverlay>
        )}
        {message && isChallenge && (
          <MessageOverlay>{message}</MessageOverlay>
        )} */}
      </ContentContainer>
    </>
  );
}

const DifficultyButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LevelButton = styled(PrimaryButton)`
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

export { GuessColorBlendMain };