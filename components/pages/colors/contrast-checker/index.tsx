import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { checkContrast } from '@/utils/check-contrast';
import { ColorCard } from '@/components/pages/colors/contrast-checker/color-card';
import { ContrastStatus } from '@/components/pages/colors/contrast-checker/contrast-status';
import { TemplateCard } from '@/components/pages/colors/contrast-checker/template-card';
import { ColorPalette } from './example-palette';
import { colorPalettes } from './examples';

const getRandomColorFromPalettes = () => {
  let textColor, bgColor, contrastRatio;

  do {
    const textGroup = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const bgGroup = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    textColor = textGroup.colors[Math.floor(Math.random() * textGroup.colors.length)].hex;
    bgColor = bgGroup.colors[Math.floor(Math.random() * bgGroup.colors.length)].hex;

    contrastRatio = checkContrast(textColor, bgColor).contrast;
  } while (contrastRatio <= 5);

  return { textColor, bgColor };
};

const getValidTextColor = (bgColor: string) => {
  let textColor, contrastRatio;

  do {
    const textGroup = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    textColor = textGroup.colors[Math.floor(Math.random() * textGroup.colors.length)].hex;
    contrastRatio = checkContrast(textColor, bgColor).contrast;
  } while (contrastRatio <= 5);

  return textColor;
};

const getValidBgColor = (textColor: string) => {
  let bgColor, contrastRatio;

  do {
    const bgGroup = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    bgColor = bgGroup.colors[Math.floor(Math.random() * bgGroup.colors.length)].hex;
    contrastRatio = checkContrast(textColor, bgColor).contrast;
  } while (contrastRatio <= 5);

  return bgColor;
};

const ColorContrast: React.FC = () => {
  const [{ textColor, bgColor }, setColors] = useState<{ textColor: string, bgColor: string }>({ textColor: '', bgColor: '' });

  useEffect(() => {
    setColors(getRandomColorFromPalettes());
  }, []);

  const handleTextColorChange = () => {
    setColors(prev => ({ ...prev, textColor: getValidTextColor(prev.bgColor) }));
  };

  const handleBgColorChange = () => {
    setColors(prev => ({ ...prev, bgColor: getValidBgColor(prev.textColor) }));
  };

  const handleColorPaletteSelect = (background: string, text: string) => {
    setColors({ bgColor: background, textColor: text });
  };

  const handleReverseColors = () => {
    setColors(prev => ({ textColor: prev.bgColor, bgColor: prev.textColor }));
  };

  return (
    <>
      <GridContainer>
        <ColorCardWrapper>
          <ColorCard 
            color={bgColor} 
            label="Change background color" 
            onRandomColor={handleBgColorChange} 
            onColorChange={handleBgColorChange} 
          />
          <ContrastStatus 
            textColor={bgColor} 
            bgColor={textColor} 
            isDescription={false} 
            isBackground={true} 
          />
        </ColorCardWrapper>
        <ColorCardWrapper>
          <ColorCard 
            color={textColor} 
            label="Change text color" 
            onRandomColor={handleTextColorChange} 
            onColorChange={handleTextColorChange} 
          />
          <ContrastStatus 
            textColor={textColor} 
            bgColor={bgColor} 
            isDescription={true} 
            isBackground={false} 
          />
        </ColorCardWrapper>
      </GridContainer>
      <InfoText>
        You can read about contrast standards in the interface here — <WCAGLink href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG</WCAGLink>
      </InfoText>
      <PreviewContainer>
        <TemplateCard textColor={textColor} bgColor={bgColor} />
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

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ColorCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const InfoText = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  color: #6c757d;
  text-align: center;
`;

const WCAGLink = styled.a`
  color: blue;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default ColorContrast;