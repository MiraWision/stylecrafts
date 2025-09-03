import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';
import { color } from '@mirawision/imagine';

import { generateSlug } from '@/utils/text';
import { PaletteColor, Shade } from './types';
import { useToast } from '@/components/ui/toast';
import { exportToSVG } from './export-to-svg';
import { examplePaletteGroups } from './example-data';

import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { ContrastChecker } from './preview/contrast-checker';
import { Preview } from './preview/preview';
import { Examples } from './examples';
import { AddTextButton } from '@/components/ui/text-buttons/add-text-button';
import { DropdownTextButton } from '@/components/ui/text-buttons/dropdown-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links';
import { CopyIcon } from '@/components/icons/copy';
import { DownloadIcon } from '@/components/icons/download';

const initialColors: PaletteColor[] = [
  { baseColor: '#ffffff', title: 'Background', shades: [] },
  { baseColor: '#1a1a1a', title: 'Text', shades: [] },
  { baseColor: '#2563eb', title: 'Primary', shades: [] },
  { baseColor: '#f59e0b', title: 'Accent', shades: [] },
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
  const { toast } = useToast();

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      
      // First check if hash matches an example palette slug
      let exampleFound = false;
      for (const group of examplePaletteGroups) {
        const palette = group.palettes.find(palette => generateSlug(palette.name) === hash);
        if (palette) {
          setSelectedColors(palette.colors);
          exampleFound = true;
          break;
        }
      }
      
      // If no example found, try to decode as color-based hash
      if (!exampleFound) {
        const decoded = decodePalette(hash, initialColors.map(c => c.title));
        if (decoded) setSelectedColors(decoded);
      }
    }
  }, []);

  useEffect(() => {
    // Only update hash if it's not already an example slug
    const currentHash = window.location.hash.replace('#', '');
    const isExampleSlug = examplePaletteGroups.some(group => 
      group.palettes.some(palette => generateSlug(palette.name) === currentHash)
    );
    
    if (!isExampleSlug) {
      window.location.hash = encodePalette(selectedColors);
    }
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
        baseColor: color.hex(),
        title: 'Additional Color',
        shades: [],
      }]);
    }
  };

  const handleRemoveColor = (index: number) => {
    const updated = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updated);
  };

  const copyToClipboard = (text: string, format: string) => {
    copyText(text)
      .then(() => {
        toast.success('Copied!', `${format} copied to clipboard`);
      })
      .catch((err: Error) => {
        console.error('Failed to copy to clipboard: ', err);
        toast.error('Failed to copy', 'Please try again');
      });
  };

  const copyToCSS = () => {
    const cssVariables = selectedColors
      .map(c => `--${c.title.toLowerCase()}: ${c.baseColor};`)
      .join('\n');
    const cssContent = `:root {\n${cssVariables}\n}`;
    copyToClipboard(cssContent, 'CSS');
  };

  const copyToJSON = () => {
    const json = JSON.stringify(selectedColors, null, 2);
    copyToClipboard(json, 'JSON');
  };

  const exportSVG = () => {
    exportToSVG(selectedColors);
  };

  const handleExampleClick = (exampleColors: PaletteColor[], paletteName?: string) => {
    setSelectedColors(exampleColors);
    // Update hash with palette slug if name is provided
    if (paletteName) {
      window.location.hash = generateSlug(paletteName);
    }
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

      <CopyButtons>
        <DropdownTextButton
          text="Copy CSS"
          icon={<CopyIcon width="16" height="16" />}
          options={[
            {
              label: "Copy JSON",
              icon: <CopyIcon width="16" height="16" />,
              onClick: copyToJSON
            },
            {
              label: "Export to SVG", 
              icon: <DownloadIcon width="16" height="16" />,
              onClick: exportSVG
            }
          ]}
          onClick={copyToCSS}
          isPrimary={true}
        />
      </CopyButtons>

      <ContrastChecker selectedColors={selectedColors} />

      <Preview palette={selectedColors} />
      
      <Examples onExampleClick={handleExampleClick} />

      <ToolCrossLinks
        toolKey="palette-generator"
        title="Explore More Color Tools"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CopyButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;
`;

export { PaletteGeneratorMain };
