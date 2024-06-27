import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';

import { CurrentColor } from './current-color';
import { SingleColumnContainer } from '@/components/ui/containers';
import { ColorWeightInput } from '@/components/ui/inputs/color-weight-input';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorMixerMain: React.FC = () => {
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

        <ColorListContainer>
          {baseColors.map((item, index) => (
            <ColorWeightInput 
              key={item.color} 
              colorWeight={item} 
              onWeightChange={(weight) => updateWeight(index, weight)}
            />
          ))}
        </ColorListContainer>
      </SingleColumnContainer>
    </>
  );
};

const ColorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

export { ColorMixerMain };
