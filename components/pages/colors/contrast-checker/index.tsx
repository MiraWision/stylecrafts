import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorCard } from './color-card';
import { ContrastStatus } from './contrast-status';
import { TemplateCard } from './template-card';
import { ColorPalette } from './example-palette';
import { adjustColorForContrast } from '@/utils/adjust-color-for-contrast';

const ColorContrast: React.FC = () => {
  const [{ textColor, bgColor }, setColors] = useState<{ textColor: string; bgColor: string }>({
    textColor: '#000000',
    bgColor: '#FFFFFF',
  });

  const handleTextColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, textColor: color }));
  };

  const handleBgColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, bgColor: color }));
  };

  const handleColorPaletteSelect = (background: string, text: string) => {
    setColors({ bgColor: background, textColor: text });
  };

  const handleSelectContrastForTextColor = () => {
    const newTextColor = adjustColorForContrast(textColor, bgColor);
    setColors((prev) => ({ ...prev, textColor: newTextColor }));
  };

  const handleSelectContrastForBgColor = () => {
    const newBgColor = adjustColorForContrast(bgColor, textColor);
    setColors((prev) => ({ ...prev, bgColor: newBgColor }));
  };

  return (
    <>
      <GridContainer>
        <ColumnContainer>
          <ColorCard
            color={bgColor}
            label="Change background color"
            onColorChange={handleBgColorChange}
            onSelectContrastColor={handleSelectContrastForBgColor}
          />
          <ColorCard
            color={textColor}
            label="Change text color"
            onColorChange={handleTextColorChange}
            onSelectContrastColor={handleSelectContrastForTextColor}
          />
        </ColumnContainer>

        <ColumnContainer>
          <ContrastStatus textColor={textColor} bgColor={bgColor} />
        </ColumnContainer>
      </GridContainer>

      <PreviewContainer>
        <TemplateCard textColor={textColor} backgroundColor={bgColor} />
      </PreviewContainer>

      <ColorPalette onSelect={handleColorPaletteSelect} />
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export default ColorContrast;
