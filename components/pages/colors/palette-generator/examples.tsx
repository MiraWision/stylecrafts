import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';
import { examplePalettes } from './example-data';
import { PaletteExample } from '../palette-example';

interface Props {
  onExampleClick: (exampleColors: PaletteColor[]) => void;
}

const Examples: React.FC<Props> = ({ onExampleClick }) => {
  const handleExampleClick = (paletteData: typeof examplePalettes[number]) => {
    onExampleClick(paletteData.colors);
  };

  return (
    <ExamplesContainer>
      {examplePalettes.map((paletteData, index) => (
        <PaletteExample
          key={index} 
          palette={{
            name: paletteData.name,
            colors: paletteData.colors.map(c => c.baseColor)
          }}
          onClick={() => handleExampleClick(paletteData)}
        />
      ))}
    </ExamplesContainer>
  );
};

const ExamplesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ExamplePaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaletteTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const IconWrapper = styled.div`
  margin-right: 2px;

  img {
    width: 20px;
    height: 20px;
  }
`;

const ColorsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ColorSquare = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export { Examples };
