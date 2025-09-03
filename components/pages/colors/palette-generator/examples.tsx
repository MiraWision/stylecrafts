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
      <ExamplesTitle>Subheader example</ExamplesTitle>
      <ExamplesGrid>
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
      </ExamplesGrid>
    </ExamplesContainer>
  );
};

const ExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

const ExamplesTitle = styled.h3`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export { Examples };
