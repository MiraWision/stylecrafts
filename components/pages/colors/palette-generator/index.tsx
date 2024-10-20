import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { PaletteColor, Shade } from './types';
import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { Palette } from './palette';
import { ContrastChecker } from './preview/contrast-checker';
import { Preview } from './preview/preview';

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
    updatedColors[index].shades = [];
    setSelectedColors(updatedColors);
  };

  const handleAddShade = (colorIndex: number, shade: Shade) => {
    const updatedColors = [...selectedColors];
    updatedColors[colorIndex].baseColor = shade.hex;
    setSelectedColors(updatedColors);
  };

  const handleAddColor = () => {
    if (selectedColors.length < 7) {
      setSelectedColors([
        ...selectedColors,
        { baseColor: '#ff6600', title: 'Additional Color', shades: [] },
      ]);
    }
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updatedColors);
  };

  const downloadFile = (filename: string, content: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportToCSS = () => {
    const cssVariables = selectedColors.map(
      color => `--${color.title.toLowerCase()}: ${color.baseColor};`
    ).join('\n');
    downloadFile('palette.css', `:root {\n${cssVariables}\n}`, 'text/css');
  };

  const exportToJSON = () => {
    const json = JSON.stringify(selectedColors, null, 2);
    downloadFile('palette.json', json, 'application/json');
  };

  const exportToSVG = () => {
    // Export logic as before...
  };

  return (
    <Container>
      <MainContent>
        <Column>
          <ColorSelector
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            onRemoveColor={handleRemoveColor}
          />
          {selectedColors.length < 7 && (
            <AddColorButton onClick={handleAddColor}>
              +
            </AddColorButton>
          )}
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
        onRemoveColor={handleRemoveColor}
      />

      <ExportButtons>
        <ExportButton onClick={exportToCSS}>Export to CSS</ExportButton>
        <ExportButton onClick={exportToJSON}>Export to JSON</ExportButton>
        <ExportButton onClick={exportToSVG}>Export to SVG</ExportButton>
      </ExportButtons>

      <ContrastChecker selectedColors={selectedColors} />

      <Preview palette={selectedColors} />
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

const AddColorButton = styled.button`
  background-color: #f5f5f5;
  color: black;
  padding: 7px;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  border: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ExportButton = styled.button`
  padding: 10px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export { PaletteGeneratorMain };
