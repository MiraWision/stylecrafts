import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';
import { color } from '@mirawision/imagine';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { generateSlug } from '@/utils/text';
import { PaletteColor, Shade } from './types';
import { useToast } from '@/components/ui/toast';
import { exportToSVG } from './export-to-svg';
import { examplePaletteGroups } from './example-data';

import { ColorSelector } from './color-selector';
import { ShadesList } from './shades-list';
import { ContrastChecker } from './contrast-checker';
import { Preview } from './preview/preview';
import { Examples } from './examples';
import { AddTextButton } from '@/components/ui/text-buttons/add-text-button';
import { DropdownTextButton } from '@/components/ui/text-buttons/dropdown-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links';
import { CopyIcon } from '@/components/icons/copy';
import { DownloadIcon } from '@/components/icons/download';
import { Color } from '@mirawision/colorize';

const initialColors: PaletteColor[] = [
  { baseColor: '#ffffff', title: 'Background', shades: [] },
  { baseColor: '#1a1a1a', title: 'Text', shades: [] },
  { baseColor: '#2563eb', title: 'Primary', shades: [] },
  { baseColor: '#f59e0b', title: 'Accent', shades: [] },
];


const PaletteGeneratorMain: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<PaletteColor[]>(initialColors);
  const { toast } = useToast();

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      
      // Check if hash matches an example palette slug
      for (const group of examplePaletteGroups) {
        const palette = group.palettes.find(palette => generateSlug(palette.name) === hash);
        if (palette) {
          setSelectedColors(palette.colors);
          break;
        }
      }
    }
  }, []);

  const handleColorChange = (index: number, newBaseColor: string) => {
    const oldColor = selectedColors[index].baseColor;
    const updated = [...selectedColors];
    updated[index].baseColor = newBaseColor;
    updated[index].shades = [];
    setSelectedColors(updated);
    
    GAService.logEvent(analyticsEvents.colors.palette.colorChanged(oldColor, newBaseColor));
  };

  const handleSelectShade = (colorIndex: number, shade: Shade) => {
    const updated = [...selectedColors];
    updated[colorIndex].baseColor = shade.hex;
    setSelectedColors(updated);
    
    GAService.logEvent(analyticsEvents.colors.palette.shadeSelected(shade.hex));
  };

  const handleAddColor = () => {
    if (selectedColors.length < 7) {
      const newColor = color.hex();
      setSelectedColors([...selectedColors, {
        baseColor: newColor,
        title: 'Additional Color',
        shades: [],
      }]);
      
      GAService.logEvent(analyticsEvents.colors.palette.colorAdded(newColor));
    }
  };

  const handleRemoveColor = (index: number) => {
    const removedColor = selectedColors[index].baseColor;
    const updated = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updated);
    
    GAService.logEvent(analyticsEvents.colors.palette.colorRemoved(removedColor));
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
    
    GAService.logEvent(analyticsEvents.colors.palette.copyCSS());
  };

  const copyToJSON = () => {
    const json = JSON.stringify(selectedColors, null, 2);
    copyToClipboard(json, 'JSON');
    
    GAService.logEvent(analyticsEvents.colors.palette.copyJSON());
  };

  const exportSVG = () => {
    exportToSVG(selectedColors);
    
    GAService.logEvent(analyticsEvents.colors.palette.paletteExported('SVG'));
  };

  const handleExampleClick = (exampleColors: PaletteColor[], paletteName?: string) => {
    setSelectedColors(exampleColors);
    // Update hash with palette slug if name is provided
    if (paletteName) {
      window.location.hash = generateSlug(paletteName);
      GAService.logEvent(analyticsEvents.colors.palette.examplePaletteSelected(paletteName));
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
            onSelectShade={handleSelectShade}
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
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
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
