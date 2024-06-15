import React, { useEffect, useMemo, useState } from 'react';

import { CurrentColor } from './current-color';
import { Palette } from './palette';
import { ColorsList } from './colors-list';
import { BaseColorsExamples } from './base-colors-examples';
import { blendMultipleColors } from '@mirawision/colorize';
import { TwoColumnsContainer } from '@/components/ui/containers';
import styled from 'styled-components';

interface BaseColor {
  color: string;
  weight: number;
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ColorBlender: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [baseColors, setBaseColors] = useState<BaseColor[]>([]);

  useEffect(() => {
    setBaseColors([
      { color: '#ff0000', weight: randomNumber(0, 3) },
      { color: '#00ff00', weight: randomNumber(0, 3) },
      { color: '#0000ff', weight: randomNumber(0, 3) },
    ]);
  }, []);

  const currentColor = useMemo(() => {
    try {
      return blendMultipleColors(baseColors);
    } catch {
      return '#ffffff';
    }
  }, [baseColors]);

  const addColorToPalette = () => {
    setPalette([currentColor, ...palette]);
  };

  const removeColorFromPalette = (index: number) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  const refreshPalette = () => {
    setPalette([]);
  };

  const selectBaseColorsExample = (example: string[]) => {
    const newBaseColors = example.map(color => ({ color, weight: 0 }));
    
    setBaseColors(newBaseColors);
  };

  const addBaseColor = (color: string) => {
    setBaseColors([...baseColors, { color, weight: 0 }]);
  };

  const deleteBaseColor = (index: number) => {
    const newBaseColors = baseColors.filter((_, i) => i !== index);
    
    setBaseColors(newBaseColors);
  };

  const updateColor = (index: number, color: string) => {
    const newBaseColors = [...baseColors];

    newBaseColors[index].color = color;
    
    setBaseColors(newBaseColors);
  };

  const updateWeight = (index: number, weight: number) => {
    const newBaseColors = [...baseColors];

    newBaseColors[index].weight = weight;
    
    setBaseColors(newBaseColors);
  };

  return (
    <>
      <Container>
        <Column>
          <CurrentColor 
            color={currentColor} 
            onAddColor={addColorToPalette} 
          />

          <Palette
            palette={palette}
            onRemoveColor={removeColorFromPalette}
            onRefreshPalette={refreshPalette}
          />
        </Column>
        
        <Column>
          <ColorsList 
            baseColorsWeights={baseColors}
            onColorChange={updateColor} 
            onWeightChange={updateWeight} 
            onAddBaseColor={addBaseColor}
            onDeleteBaseColor={deleteBaseColor}
          />
        </Column>
      </Container>

      <BaseColorsExamples 
        onSelected={selectBaseColorsExample} 
      />
    </>
  );
};

const Container = styled(TwoColumnsContainer)`
  grid-template-columns: 4fr 5fr;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

export { ColorBlender };
