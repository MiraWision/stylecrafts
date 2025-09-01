import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ContrastTextButton } from '@/components/ui/text-buttons/contrast-button';
import { ContrastStatus } from './contrast-status';
import { TemplateCard } from './template-card';
import { ColorPalette } from './example-palette';
import { adjustColorForContrast } from '@/utils/adjust-color-for-contrast';
import { ToolCrossLinks } from '@/components/ui/cross-links';

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
      <MainGridContainer>
        <ColumnContainer>

          <LocalGridContainer>
            <div>
              <Label>Background Color</Label>
              <ColorInputBig
                value={bgColor}
                onChange={handleBgColorChange}
              />
            </div>

            <ContrastTextButton
              onClick={handleSelectContrastForBgColor}
              text="Improve Contrast"
            />
          </LocalGridContainer>


          <LocalGridContainer>
            <div>
              <Label>Text Color</Label>
              <ColorInputBig
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>

            <ContrastTextButton
              onClick={handleSelectContrastForTextColor}
              text="Improve Contrast"
            />
          </LocalGridContainer>
        </ColumnContainer>

        <ColumnContainer>
          <ContrastStatus textColor={textColor} bgColor={bgColor} />
        </ColumnContainer>
      </MainGridContainer>

      <PaletteSection>
        <ColorPalette onSelect={handleColorPaletteSelect} />
      </PaletteSection>

      <PreviewContainer>
        <TemplateCard textColor={textColor} backgroundColor={bgColor} />
      </PreviewContainer>

      <ToolCrossLinks
        toolKey="contrast-checker"
        title="Explore More Color Tools"
      />
    </>
  );
};

const MainGridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(260px, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const LocalGridContainer = styled.div`
  display: grid;
  width: 20rem;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  text-align: left;
  margin-bottom: 1rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const PaletteSection = styled.div`
  margin-top: 2rem;
`;

export default ColorContrast;
