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
import { Level, Difficulty, SelectedColor } from './types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PaletteColors, LevelOptions } from './data';

import { Button } from 'primereact/button';
import { ColorCircle } from '@/components/pages/games/guess-color-blend/color-circle';
import { ColorsPreview } from '@/components/pages/games/guess-color-blend/colors-preview';
import { Timer } from '@/components/ui/timer';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { Label } from '@/components/ui/texts/label';
import { ColorSelection } from './color-selection';

interface Props {
}

const GuessColorBlendMain: React.FC<Props> = ({}) => {
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>(PaletteColors.map((color) => ({ ...color, weight: 0 })));
  
  const [level, setLevel] = useState<Level>(Level.Easy);
  
  const [score, setScore] = useState<number>(0);
  
  const [topScore, setTopScore] = useLocalStorage<number>('top-score', 0);

  const difficulty = useMemo<Difficulty>(() => {
    return getDifficulty(level, score);
  }, [level, score]);

  const targetColor = useMemo<string>(() => {
    return getRandomColor(selectedColors.map(({ hex }) => hex), difficulty.dropsCount);
  }, [difficulty]);

  const currentColor = useMemo<string>(() => {
    if (!selectedColors.some((color) => color.weight > 0)) {
      return '';
    }

    return blendMultipleColors(selectedColors.map((color) => ({ color: color.hex, weight: color.weight })));
  }, [selectedColors]);

  const matchPercentage = useMemo<number>(() => {
    if (!currentColor || !currentColor.length || !targetColor || !targetColor.length) {
      return 0;
    }

    return calculateSimilarity(currentColor, targetColor);
  }, [currentColor, targetColor]);

  const isMatched = useMemo<boolean>(() => matchPercentage > 99, [matchPercentage]);

  const isChallenge = useMemo<boolean>(() => level === Level.Challenge, [level]);

  const totalWeight = useMemo<number>(() => selectedColors.reduce((acc, color) => acc + color.weight, 0), [selectedColors]);

  const changeWeight = (hex: string, increment: number) => {
    setSelectedColors((prev) => prev.map((color) => ({ 
      ...color, 
      weight: color.hex === hex ? color.weight + increment : color.weight,
    })));
  };

  const resetWeights = () => {
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
      </ContentContainer>

      {isChallenge && (
        <ScoreDisplay>
          Score: {score} {topScore > 0 && `| Top Score: ${topScore}`}
        </ScoreDisplay>
      )}

      <ColorSelection
        selectedColors={selectedColors}
        totalWeight={totalWeight}
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

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ScoreDisplay = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

export { GuessColorBlendMain };