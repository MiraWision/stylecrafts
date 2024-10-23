import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { colorPalettes } from './data';
import { generateSlug } from '@/utils/text';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';
import { ColorCard } from '@/components/ui/colors/color-card';

interface Props {}

const ColorSwatchesCheatSheetMain: React.FC<Props> = () => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <MainContainer>
      <FloatingMenu
        sections={colorPalettes.map((group) => ({
          id: generateSlug(group.groupName),
          title: `${group.groupName} Shades`,
        }))}
      />

      <SingleColumnContainer>
        {colorPalettes.map(({ groupName, colors }) => (
          <React.Fragment key={groupName}>
            <GroupTitle id={generateSlug(groupName)}>
              {groupName} shades
            </GroupTitle>

            <Container>
              {colors.map((color) => (
                <ColorCard
                  key={color.title}
                  color={color.hex}
                  title={color.title}
                  onCopy={() => handleCopy(color.hex)}
                  onClick={() => setHoveredColor(color.hex)}
                />
              ))}
            </Container>
          </React.Fragment>
        ))}
      </SingleColumnContainer>
    </MainContainer>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
  text-transform: capitalize;
  align-self: flex-start;
`;

export { ColorSwatchesCheatSheetMain };
