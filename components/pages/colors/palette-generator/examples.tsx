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
      <ExamplesTitle>Ready-to-use Color Palettes</ExamplesTitle>
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
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-color);
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export { Examples };
