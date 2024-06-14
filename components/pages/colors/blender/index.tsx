import React, { useMemo, useState } from 'react';

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

const ColorBlender: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [baseColors, setBaseColors] = useState<BaseColor[]>([
    { color: '#ff0000', weight: 0 },
    { color: '#00ff00', weight: 0 },
    { color: '#0000ff', weight: 0 },
  ]);

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
    const newBaseColorsWeights = example.map(color => ({ color, weight: 0 }));
    
    setBaseColors(newBaseColorsWeights);
  };

  const addBaseColor = (color: string) => {
    setBaseColors([...baseColors, { color, weight: 0 }]);
  };

  const changeWeight = (index: number, weight: number) => {
    const newBaseColorsWeights = [...baseColors];

    newBaseColorsWeights[index].weight = weight;
    
    setBaseColors(newBaseColorsWeights);
  };

  return (
    <>
      <TwoColumnsContainer>
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
            onWeightChange={changeWeight} 
            onAddBaseColor={addBaseColor} 
          />
        </Column>
      </TwoColumnsContainer>

      <BaseColorsExamples 
        onSelected={selectBaseColorsExample} 
      />
    </>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

export { ColorBlender };
