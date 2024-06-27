import React, { useState } from 'react';
import styled from 'styled-components';

import { PaletteColor, Shade } from './types';

import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { Palette } from './palette';
import { Examples } from './examples';
import { Preview } from './preview';
import { ContrastChecker } from './contrast-checker';

const initialColors: PaletteColor[] = [
  { baseColor: '#ffffff', title: 'Background', shades: [] },
  { baseColor: '#000000', title: 'Text', shades: [] },
  { baseColor: '#ff0000', title: 'Primary', shades: [] },
  { baseColor: '#00ff00', title: 'Additional', shades: [] },
];

const PaletteGeneratorMain: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<PaletteColor[]>(initialColors);

  const handleColorChange = (index: number, newBaseColor: string) => {
    const updatedColors = [...selectedColors];
    updatedColors[index].baseColor = newBaseColor;
    setSelectedColors(updatedColors);
  };

  const handleAddColor = () => {
    const additionalCount = selectedColors.filter(color => color.title.startsWith('Additional')).length;
    setSelectedColors([
      ...selectedColors,
      { baseColor: '#000000', title: `Additional ${additionalCount + 1}`, shades: [] },
    ]);
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = [...selectedColors];
    updatedColors.splice(index, 1);
    setSelectedColors(updatedColors);
  };

  const handleAddShade = (colorIndex: number, shade: Shade) => {
    const updatedColors = [...selectedColors];
    updatedColors[colorIndex].shades.push(shade);
    setSelectedColors(updatedColors);
  };

  const handleRemoveColorFromPalette = (colorIndex: number, shadeIndex?: number) => {
    const updatedColors = [...selectedColors];
    if (shadeIndex === undefined) {
      updatedColors.splice(colorIndex, 1);
    } else {
      updatedColors[colorIndex].shades.splice(shadeIndex, 1);
    }
    setSelectedColors(updatedColors);
  };

  const handleExampleClick = (exampleColors: PaletteColor[]) => {
    setSelectedColors(exampleColors);
  };

  return (
    <Container>
      <MainContent>
        <Column>
          <ColorSelector
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            onAddColor={handleAddColor}
            onRemoveColor={handleRemoveColor}
          />
        </Column>

        <Column>
          <ShadesList selectedColors={selectedColors} onAddShade={handleAddShade} />
        </Column>
      </MainContent>

      <Palette selectedColors={selectedColors} onRemoveColor={handleRemoveColorFromPalette} />

      <Preview selectedColors={selectedColors} />

      <ContrastChecker selectedColors={selectedColors} />
      
      <Examples onExampleClick={handleExampleClick} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export { PaletteGeneratorMain };
