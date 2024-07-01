import React, { useState } from 'react';
import styled from 'styled-components';

import { PaletteColor, Shade } from './types';

import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { Palette } from './palette';
import { Examples } from './examples';
import { ContrastChecker } from './contrast-checker';
import { TemplateCard } from './palette-preview';

const initialColors: PaletteColor[] = [
  { baseColor: '#f5f5f5', title: 'Background', shades: [] },
  { baseColor: '#333333', title: 'Text', shades: [] },
  { baseColor: '#3468db', title: 'Primary', shades: [] },
  { baseColor: '#e74c3c', title: 'Accent', shades: [] },
];

const PaletteGeneratorMain: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<PaletteColor[]>(initialColors);

  const handleColorChange = (index: number, newBaseColor: string) => {
    const updatedColors = [...selectedColors];
    updatedColors[index].baseColor = newBaseColor;
    setSelectedColors(updatedColors);
  };

  const handleAddColor = () => {
    const additionalCount = selectedColors.length - 4;

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

    updatedColors[colorIndex].shades.sort((a, b) => a.shade - b.shade);

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

  const backgroundColor = selectedColors.find(color => color.title === 'Background')?.baseColor || '#ffffff';
  const textColor = selectedColors.find(color => color.title === 'Text')?.baseColor || '#000000';
  const accentColor = selectedColors.find(color => color.title === 'Accent')?.baseColor || '#ff0000';
  const additionalColor = selectedColors.find(color => color.title === 'Primary')?.baseColor || '#00ff00';

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
          <ShadesList 
            selectedColors={selectedColors} 
            onAddShade={handleAddShade}
          />
        </Column>
      </MainContent>

      <Palette 
        selectedColors={selectedColors} 
        onRemoveColor={handleRemoveColorFromPalette} 
      />

      <ContrastChecker 
        selectedColors={selectedColors} 
      />

      <TemplateCard 
        bgColor={backgroundColor}
        textColor={textColor}
        accentColor={accentColor}
        additionalColor={additionalColor}
      />
      
      <Examples 
        onExampleClick={handleExampleClick} 
      />
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