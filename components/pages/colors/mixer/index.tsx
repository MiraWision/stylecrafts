import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { blendMultipleColors } from '@mirawision/colorize';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CurrentColor } from './current-color';
import { Palette } from './palette';
import { ColorsList } from './colors-list';
import { BaseColorsExamples } from './base-colors-examples';
import { SingleColumnContainer, TwoColumnsContainer } from '@/components/ui/containers';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorMixerMain: React.FC = () => {
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

    GAService.logEvent(analyticsEvents.colors.blender.colorAddedToPalette(currentColor));
  };

  const removeColorFromPalette = (index: number) => {
    setPalette(palette.filter((_, i) => i !== index));

    GAService.logEvent(analyticsEvents.colors.blender.colorRemovedFromPalette(palette[index]));
  };

  const refreshPalette = () => {
    setPalette([]);

    GAService.logEvent(analyticsEvents.colors.blender.paletteRefreshed());
  };

  const selectBaseColorsExample = (example: string[]) => {
    const newBaseColors = example.map(color => ({ color, weight: 0 }));
    
    setBaseColors(newBaseColors);

    GAService.logEvent(analyticsEvents.colors.blender.examplePaletteSelected(example.join(',')));
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
      <SingleColumnContainer>
        <CurrentColor 
          color={currentColor} 
        />

        <ColorsList 
          baseColorsWeights={baseColors}
          onColorChange={updateColor} 
          onWeightChange={updateWeight} 
          onAddBaseColor={addBaseColor}
          onDeleteBaseColor={deleteBaseColor}
        />

        <BaseColorsExamples 
          onSelected={selectBaseColorsExample} 
        />
      </SingleColumnContainer>
    </>
  );
};

export { ColorMixerMain };
