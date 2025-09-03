import React, { useEffect } from 'react';
import styled from 'styled-components';

import { generateSlug } from '@/utils/text';
import { PaletteColor } from './types';
import { examplePaletteGroups } from './example-data';
import { PaletteExample } from '../palette-example';

interface Props {
  onExampleClick: (exampleColors: PaletteColor[], paletteName?: string) => void;
}

const Examples: React.FC<Props> = ({ onExampleClick }) => {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash) {
      // Find palette by slug in all groups
      for (const group of examplePaletteGroups) {
        const palette = group.palettes.find(palette => generateSlug(palette.name) === hash);
        if (palette) {
          onExampleClick(palette.colors, palette.name);
          break;
        }
      }
    }
  }, [onExampleClick]);

  const handleExampleClick = (paletteData: any) => {
    onExampleClick(paletteData.colors, paletteData.name);
  };

  return (
    <ExamplesContainer>
      {examplePaletteGroups.map((group, groupIndex) => (
        <GroupContainer key={groupIndex}>
          <GroupTitle>{group.title}</GroupTitle>
          <ExamplesGrid>
            {group.palettes.map((paletteData, index) => (
              <PaletteExample
                key={`${groupIndex}-${index}`}
                palette={{
                  name: paletteData.name,
                  colors: paletteData.colors.map(c => c.baseColor),
                  iconPath: paletteData.iconPath
                }}
                onClick={() => handleExampleClick(paletteData)}
              />
            ))}
          </ExamplesGrid>
        </GroupContainer>
      ))}
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

const GroupContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const GroupTitle = styled.h4`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  margin: 0 0 0.5rem;
  color: var(--text-color);
  border-bottom: 2px solid var(--surface-border);
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

export { Examples };
