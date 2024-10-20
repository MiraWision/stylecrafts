import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  const { color: queryColor } = router.query;

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
    if (queryColor) {
      try {
        setSelectedColor(new Color(queryColor as string));
      } catch {
        setSelectedColor(new Color('#ffffff'));
      }
    } else {
      const currentColor = new Color(rybslColorsMixing(baseColors));
      setSelectedColor(currentColor);
    }
  }, [queryColor, baseColors]);

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
    try {
      const updatedColor = new Color(newColor);
      setSelectedColor(updatedColor);
    } catch (error) {
      console.error('Invalid color format:', error);
      alert('Invalid color format. Please enter a valid color.');
    }
  };


  return (
    <MainContainer>
      <TwoColumnsContainer ratio="1fr 2fr">
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
      <LinkContainer>
        <Link href="/cheatsheets/colors-swatches" passHref>
          <StyledLink>View Color Swatches</StyledLink>
        </Link>
      </LinkContainer>
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

const LinkContainer = styled.div`
  margin-top: 2rem;
`;

const StyledLink = styled.a`
  color: var(--color-primary);
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export { ColorInspectorMain };
