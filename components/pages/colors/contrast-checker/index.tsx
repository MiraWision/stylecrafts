import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ContrastTextButton } from '@/components/ui/text-buttons/contrast-button';
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
              text="Fix background color"
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
              text="Fix text color"
            />
          </LocalGridContainer>
        </ColumnContainer>

        <ColumnContainer>
          <ContrastStatus textColor={textColor} bgColor={bgColor} />
        </ColumnContainer>
      </MainGridContainer>

      <PreviewContainer>
        <TemplateCard textColor={textColor} backgroundColor={bgColor} />
      </PreviewContainer>

      <ColorPalette onSelect={handleColorPaletteSelect} />
    </>
  );
};

const MainGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LocalGridContainer = styled.div`
  display: grid;
  width: 20rem;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
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
`;

export default ColorContrast;
