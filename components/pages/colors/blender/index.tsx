import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { blendMultipleColors } from '@mirawision/colorize';

import { CurrentColor } from './current-color';
import { Palette } from './palette';
import { ColorsList } from './colors-list';
import { BaseColorsExamples } from './base-colors-examples';
import { TwoColumnsContainer } from '@/components/ui/containers';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorBlender: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [baseColors, setBaseColors] = useState<BaseColor[]>([]);

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;

  @media (max-width: 768px) {
    row-gap: 1rem;
  }
`;

export { ColorBlender };
