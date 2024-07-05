import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

interface Props {
  selectedColors: PaletteColor[];
}

const Preview: React.FC<Props> = ({ selectedColors }) => {
  const backgroundColor = selectedColors.find(color => color.title === 'Background')?.baseColor || '#ffffff';
  const textColor = selectedColors.find(color => color.title === 'Text')?.baseColor || '#000000';
  const primaryColor = selectedColors.find(color => color.title === 'Primary')?.baseColor || '#ff0000';
  const additionalColor = selectedColors.find(color => color.title === 'Additional')?.baseColor || '#00ff00';

  return (
    <PreviewContainer style={{ backgroundColor }}>
      <Header $color={textColor}>Header Text</Header>
      <Text $color={textColor}>This is some example text to show how the text color will look like on the background color.</Text>
      <Text $color={primaryColor} style={{ fontWeight: 'bold' }}>Primary colored text with bold font weight</Text>
      <Text $color={additionalColor} style={{ fontStyle: 'italic' }}>Additional colored text with italic font style</Text>
      <div>
        <Circle $color={primaryColor} />
        <Circle $color={backgroundColor} $borderColor={textColor} />
      </div>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const Header = styled.h1.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
`;

const Text = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
`;

const Circle = styled.div.attrs<{ $color: string, $borderColor?: string }>(({ $color, $borderColor }) => ({
  style: {
    backgroundColor: $color,
    border: $borderColor ? `2px solid ${$borderColor}` : 'none',
  },
}))`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px;
`;


export { Preview };
