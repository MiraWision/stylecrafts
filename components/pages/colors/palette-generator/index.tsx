import React, { useState } from 'react';
import styled from 'styled-components';
import { PaletteColor, Shade } from './types';
import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { ContrastChecker } from './preview/contrast-checker';
import { Preview } from './preview/preview';
import { Examples } from './examples';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { exportToSVG } from './export-to-svg';
import { AddTextButton } from '@/components/ui/text-buttons/add-text-button';
import { DropdownTextButton } from '@/components/ui/text-buttons/dropdown-text-button';
import { examplePalettes } from './example-data';

const initialColors: PaletteColor[] = [
  { baseColor: '#f5f5f5', title: 'Background', shades: [] },
  { baseColor: '#333333', title: 'Text', shades: [] },
  { baseColor: '#3468db', title: 'Primary', shades: [] },
  { baseColor: '#e74c3c', title: 'Accent', shades: [] },
];

function encodePalette(colors: PaletteColor[]): string {
  return colors.map(c => c.baseColor).join('-');
}

function decodePalette(hash: string, fallbackTitles: string[]): PaletteColor[] | null {
  const colorCodes = hash.split('-');
  if (!colorCodes.every(code => /^#?[0-9a-fA-F]{3,8}$/.test(code))) return null;
  return colorCodes.map((baseColor, i) => ({
    baseColor: baseColor.startsWith('#') ? baseColor : `#${baseColor}`,
    title: fallbackTitles[i] || `Color ${i+1}`,
    shades: []
  }));
}

const PaletteGeneratorMain: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<PaletteColor[]>(initialColors);

  React.useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const decoded = decodePalette(hash, initialColors.map(c => c.title));
      if (decoded) setSelectedColors(decoded);
    }
  }, []);

  React.useEffect(() => {
    window.location.hash = encodePalette(selectedColors);
  }, [selectedColors]);

  const handleColorChange = (index: number, newBaseColor: string) => {
    const updated = [...selectedColors];
    updated[index].baseColor = newBaseColor;
    updated[index].shades = [];
    setSelectedColors(updated);
  };

  const handleAddShade = (colorIndex: number, shade: Shade) => {
    const updated = [...selectedColors];
    updated[colorIndex].baseColor = shade.hex;
    setSelectedColors(updated);
  };

  const handleAddColor = () => {
    if (selectedColors.length < 7) {
      setSelectedColors([...selectedColors, {
        baseColor: '#ff6600',
        title: 'Additional Color',
        shades: [],
      }]);
    }
  };

  const handleRemoveColor = (index: number) => {
    const updated = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updated);
  };

  const downloadFile = (filename: string, content: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportToCSS = () => {
    const cssVariables = selectedColors
      .map(c => `--${c.title.toLowerCase()}: ${c.baseColor};`)
      .join('\n');
    downloadFile('palette.css', `:root {\n${cssVariables}\n}`, 'text/css');
  };

  const exportToJSON = () => {
    const json = JSON.stringify(selectedColors, null, 2);
    downloadFile('palette.json', json, 'application/json');
  };

  const exportSVG = () => {
    exportToSVG(selectedColors);
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
            onRemoveColor={handleRemoveColor}
          />
          {selectedColors.length < 7 && (
            <AddTextButton text="Add color" onClick={handleAddColor} />
          )}
        </Column>

        <Column>
          <ShadesList
            selectedColors={selectedColors}
            onAddShade={handleAddShade}
          />
        </Column>
      </MainContent>

      <ExportButtons>
        <DropdownTextButton
          text="Export to CSS"
          icon={null}
          options={[
            {
              label: "Export to JSON",
              icon: null,
              onClick: exportToJSON
            },
            {
              label: "Export to SVG", 
              icon: null,
              onClick: exportSVG
            }
          ]}
          onClick={exportToCSS}
          style={{ width: 'fit-content', minWidth: '120px', marginBottom: '0.8rem' }}
        />
      </ExportButtons>

      <ContrastChecker selectedColors={selectedColors} />
      <Preview palette={selectedColors} />
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
  grid-template-columns: 1fr 2fr;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export { PaletteGeneratorMain };
