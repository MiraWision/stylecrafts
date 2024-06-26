import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

import { Palette } from './palette';

interface Props {
  onExampleClick: (exampleColors: PaletteColor[]) => void;
}

const examplePalettes: PaletteColor[][] = [
  [
    { baseColor: '#add8e6', title: 'Background', shades: [{ shade: 50, hex: '#b3d9ea' }, { shade: -50, hex: '#a0d2e0' }] },
    { baseColor: '#000000', title: 'Text', shades: [{ shade: 50, hex: '#333333' }, { shade: -50, hex: '#666666' }] },
    { baseColor: '#87ceeb', title: 'Primary', shades: [{ shade: 50, hex: '#9ddff4' }, { shade: -50, hex: '#77bddc' }] },
    { baseColor: '#4682b4', title: 'Additional', shades: [{ shade: 50, hex: '#5a9bd8' }, { shade: -50, hex: '#366ea0' }] },
  ],
];

const Examples: React.FC<Props> = ({ onExampleClick }) => {
  return (
    <ExamplesContainer>
      {examplePalettes.map((palette, index) => (
        <ExamplePaletteContainer key={index} onClick={() => onExampleClick(palette)}>
          <Palette selectedColors={palette} onRemoveColor={() => {}} />
        </ExamplePaletteContainer>
      ))}
    </ExamplesContainer>
  );
};

const ExamplesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ExamplePaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  cursor: pointer;
`;

export { Examples };
