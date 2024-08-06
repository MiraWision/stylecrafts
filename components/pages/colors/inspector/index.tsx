import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { useRouter } from 'next/router';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { ColorExamples } from './color-examples';
import { ColorExample } from './types';
import { ShadesGrid } from './shades';

import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ColorDescription } from './color-description';
import { TwoColumnsContainer } from '@/components/ui/containers';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorInspectorMain: React.FC = () => {
  const router = useRouter();
  const [baseColors, setBaseColors] = useState<BaseColor[]>([
    { color: '#ff0000', weight: 0 },
    { color: '#ffff00', weight: 0 },
    { color: '#0000ff', weight: 0 },
    { color: '#ffffff', weight: 0 },
    { color: '#808080', weight: 0 },
    { color: '#000000', weight: 0 },
  ]);

  const [selectedColor, setSelectedColor] = useState<Color>(new Color('#ffffff'));

  useEffect(() => {
    const hashColor = router.asPath.split('#')[1];
    if (hashColor) {
      setSelectedColor(new Color(`#${hashColor}`));
    } else {
      setSelectedColor(new Color(rybslColorsMixing(baseColors)));
    }
  }, [router.asPath]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = selectedColor.hex();
    }
  }, [selectedColor]);

  const currentColor = useMemo<Color>(() => {
    try {
      return new Color(rybslColorsMixing(baseColors));
    } catch {
      return new Color('#ffffff');
    }
  }, [baseColors]);

  useEffect(() => {
    setSelectedColor(currentColor);
  }, [currentColor]);

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
    setSelectedColor(new Color(colorExample.color));
  };

  const selectShade = (shade: string) => {
    setSelectedColor(new Color(shade));
  };

  const handleColorInputChange = (newColor: string) => {
    const updatedColor = new Color(newColor);
    setSelectedColor(updatedColor);
  };

  return (
    <MainContainer>
      <TwoColumnsContainer>
        <Column>
          <ColorInputBig
            value={selectedColor.hex()}
            onChange={handleColorInputChange}
          />
          <ColorDescription color={selectedColor} />
        </Column>

        <Column>
          <ShadesGrid baseColor={selectedColor.hex()} onShadeSelect={selectShade} />
        </Column>
      </TwoColumnsContainer>
      <ColorListContainer>
        <ColorExamples onColorSelect={selectColorExample} />
      </ColorListContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { ColorInspectorMain };
