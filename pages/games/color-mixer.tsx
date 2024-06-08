import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { BaseLayout } from '@/layouts/base-layout';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { blendMultipleColors } from '@mirawision/colorize';
import ColorCircle from '@/components/ui/buttons/color-circle';
import DoubleColorPreview from '@/components/ui/outputs/color-double-preview';
import Timer from '@/components/ui/timer';

type ConvertedColors = {
  [key in ColorFormat]?: string;
};

const availableColors = [
  { name: 'Yellow', hex: '#FFED00' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Magenta', hex: '#FF00AB' },
  { name: 'Blue', hex: '#0047AB' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Green', hex: '#00B500' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
];

const getRandomColors = (count: number) => {
  const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomColorFromSelection = (colors: { hex: string }[]) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex].hex;
};

const ColorMixer = () => {
  const [currentColor, setCurrentColor] = useState<string>('');
  const [targetColor, setTargetColor] = useState<string>('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const [selectedColors, setSelectedColors] = useState<{ color: string, weight: number }[]>([]);
  const [isWinDialogVisible, setIsWinDialogVisible] = useState<boolean>(false);
  const [isLoseDialogVisible, setIsLoseDialogVisible] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>('Easy');
  const [timerKey, setTimerKey] = useState<number>(0); // New state to trigger timer reset
  const toast = useRef<Toast>(null);

  const calculateSimilarity = (color1: string, color2: string): number => {
    const rgb1 = parseInt(color1.slice(1), 16);
    const r1 = (rgb1 >> 16) & 0xff;
    const g1 = (rgb1 >> 8) & 0xff;
    const b1 = rgb1 & 0xff;

    const rgb2 = parseInt(color2.slice(1), 16);
    const r2 = (rgb2 >> 16) & 0xff;
    const g2 = (rgb2 >> 8) & 0xff;
    const b2 = rgb2 & 0xff;

    const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
    const maxDistance = Math.sqrt(255 ** 2 + 255 ** 2 + 255 ** 2);

    return ((maxDistance - distance) / maxDistance) * 100;
  };

  const getContrastingColor = (color: string): string => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma > 186 ? '#000' : '#fff';
  };

  const resetGame = () => {
    let colorCount = 3; // Default to Easy
    if (difficulty === 'Medium') colorCount = 5;
    if (difficulty === 'Hard') colorCount = 8;

    const initialColors = getRandomColors(colorCount).map(color => ({ color: color.hex, weight: 0 }));
    setSelectedColors(initialColors);
    setTargetColor(getRandomColorFromSelection(initialColors.map(c => ({ hex: c.color }))));
    setCurrentColor('');
    setConvertedColors({});
    setTimerKey(prevKey => prevKey + 1); // Reset timer by changing the key
  };

  const resetColor = () => {
    resetGame();
  };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

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
    setSelectedColors((prev) =>
      prev.map((c) => (c.color === color ? { ...c, weight: newWeight } : c))
    );
  };

  const totalWeight = selectedColors.reduce((sum, c) => sum + c.weight, 0) || 1;
  const colorBar = selectedColors.map((c, index) => (
    <ColorBarSegment key={index} color={c.color} width={(c.weight / totalWeight) * 100 + '%'} />
  ));

  const similarity = currentColor ? calculateSimilarity(currentColor, targetColor) : 0;

  useEffect(() => {
    if (similarity > 95) {
      setIsWinDialogVisible(true);
    }
  }, [similarity]);

  const handleWinDialogHide = () => {
    setIsWinDialogVisible(false);
    resetGame();
  };

  const handleLoseDialogHide = () => {
    setIsLoseDialogVisible(false);
    resetGame();
  };

  const handleTimeUp = () => {
    setIsLoseDialogVisible(true);
  };

  const getTimerDuration = (): number | null => {
    if (difficulty === 'Medium') return 60;
    if (difficulty === 'Hard') return 30;
    return null; // No timer for Easy
  };

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level);
    resetGame();
  };

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <Title>Color Mixer</Title>
      <DifficultyButtonsContainer>
        <DifficultyButton
          label="Easy"
          className={difficulty === 'Easy' ? 'selected' : ''}
          onClick={() => handleDifficultyChange('Easy')}
        />
        <DifficultyButton
          label="Medium"
          className={difficulty === 'Medium' ? 'selected' : ''}
          onClick={() => handleDifficultyChange('Medium')}
        />
        <DifficultyButton
          label="Hard"
          className={difficulty === 'Hard' ? 'selected' : ''}
          onClick={() => handleDifficultyChange('Hard')}
        />
      </DifficultyButtonsContainer>
      <TimerContainer>
        {getTimerDuration() !== null && <Timer key={timerKey} duration={getTimerDuration()!} onTimeUp={handleTimeUp} />}
      </TimerContainer>
      <ContentContainer>
        <DoubleColorPreview
          currentColor={currentColor}
          targetColor={targetColor}
          similarity={similarity}
          resetColor={resetColor}
        />
        <ColorBarContainer>
          <ColorBar>{colorBar}</ColorBar>
        </ColorBarContainer>
        <ColorCirclesContainer>
          <SettingsButton icon="pi pi-cog" />
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
      </ContentContainer>
      <Dialog
        header="Congratulations!"
        visible={isWinDialogVisible}
        style={{ width: '50vw' }}
        modal
        onHide={handleWinDialogHide}
      >
        <p>You have successfully matched the color!</p>
        <Button label="Close" icon="pi pi-check" onClick={handleWinDialogHide} autoFocus />
      </Dialog>
      <Dialog
        header="Time's Up!"
        visible={isLoseDialogVisible}
        style={{ width: '50vw' }}
        modal
        onHide={handleLoseDialogHide}
      >
        <p>You ran out of time!</p>
        <Button label="Close" icon="pi pi-times" onClick={handleLoseDialogHide} autoFocus />
      </Dialog>
    </BaseLayout>
  );
};

export default ColorMixer;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;

  @media (max-width: 1200px) { 
    font-size: 1.8rem;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const DifficultyButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DifficultyButton = styled(Button)`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
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
  height: 20px;
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

const SettingsButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: var(--text-color);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
