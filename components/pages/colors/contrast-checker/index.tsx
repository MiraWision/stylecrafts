import React, { useState } from 'react';
import styled from 'styled-components';
import { randomColor } from '@mirawision/colorize';
import { calculateContrast } from '@/utils/color-contrast';

import { Header } from '@/components/pages/colors/contrast-checker/header';
import { ColorCard } from '@/components/pages/colors/contrast-checker/color-card';
import { ContrastStatus } from '@/components/pages/colors/contrast-checker/contrast-status';
import { TemplateCard } from '@/components/pages/colors/contrast-checker/template-card';

const ColorContrast: React.FC = () => {
  const [textColor, setTextColor] = useState<string>(randomColor());
  const [bgColor, setBgColor] = useState<string>(randomColor());

  const contrastResult = calculateContrast(textColor, bgColor);
  const contrastRatio = contrastResult.contrast.toFixed(2);
  const contrastLevel = contrastResult.isSuitableForAAA ? 'AAA' : (contrastResult.isSuitableForAA ? 'AA' : 'Fail');

  const handleRandomColorsGenerated = (bgColor: string, textColor: string) => {
    setTextColor(textColor);
    setBgColor(bgColor);
  };

  const handleRandomTextColor = () => {
    setTextColor(randomColor());
  };

  const handleRandomBgColor = (color: string) => {
    setBgColor(color);
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
  };

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
  };

  return (
    <>
      <Header 
        textColor={textColor} 
        bgColor={bgColor} 
        contrastRatio={contrastRatio} 
        onRandomColorsGenerated={handleRandomColorsGenerated}
      />
      <GridContainer>
        <ColorCardWrapper>
          <ColorCard 
            color={bgColor} 
            label="Change background color" 
            onRandomColor={handleRandomBgColor} 
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
            onRandomColor={handleRandomTextColor} 
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
      <GridContainer>
        <TemplateCard textColor={textColor} bgColor={bgColor} />
        <TemplateCard textColor={bgColor} bgColor={textColor} />
      </GridContainer>
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
