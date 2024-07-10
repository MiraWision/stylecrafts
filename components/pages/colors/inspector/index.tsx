import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { ColorExamples } from './color-examples';
import { ColorExample } from './types';
import { ShadesGrid } from './shades';

import { CurrentColor } from './current-color';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { ColorWeightInput } from '@/components/ui/inputs/color-weight-input';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorInspectorMain: React.FC = () => {
  const [baseColors, setBaseColors] = useState<BaseColor[]>([
    { color: '#ff0000', weight: 0 },
    { color: '#ffff00', weight: 0 },
    { color: '#0000ff', weight: 0 },
    { color: '#ffffff', weight: 0 },
    { color: '#808080', weight: 0 },
    { color: '#000000', weight: 0 },
  ]);

  const currentColor = useMemo<Color>(() => {
    try {
      return new Color(rybslColorsMixing(baseColors));
    } catch {
      return new Color('#ffffff');
    }
  }, [baseColors]);

  const updateWeight = (index: number, weight: number) => {
    if (weight < 0) {
      weight = 0;
    }
    
    const newBaseColors = [...baseColors];

    newBaseColors[index].weight = weight;
    
    setBaseColors(newBaseColors);
  };

  const selectColorExample = (colorExample: ColorExample) => {
    setBaseColors([
      { color: '#ff0000', weight: colorExample.red },
      { color: '#ffff00', weight: colorExample.yellow },
      { color: '#0000ff', weight: colorExample.blue },
      { color: '#ffffff', weight: colorExample.white },
      { color: '#808080', weight: colorExample.grey },
      { color: '#000000', weight: colorExample.black },
    ]);
  };

  return (
    <TwoColumnsContainer>
      <Column>
        <CurrentColor
          color={currentColor}
        />
        <ShadesGrid
          baseColor={currentColor.hex()}
        />
      </Column>

      <Column>
        <ColorListContainer>
          {baseColors.map((item, index) => (
            <ColorWeightInput
              key={item.color}
              colorWeight={item}
              onWeightChange={(weight) => updateWeight(index, weight)}
            />
          ))}
        </ColorListContainer>

        <ColorExamples
          onColorSelect={selectColorExample}
        />

      </Column>
    </TwoColumnsContainer>
  );
};

const ColorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { ColorInspectorMain };
