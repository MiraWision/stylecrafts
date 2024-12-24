import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';
import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';

import { ColorSwatchesIcon } from '@/components/icons/color-swatches';
import { CharactersIcon } from '@/components/icons/characters';
import { EmojisIcon } from '@/components/icons/emojis';

const cheatsheetData = [
  {
    href: Routes.CharactersCheatSheet,
    Icon: CharactersIcon,
    title: 'Characters Cheatsheet',
    description: 'Access a quick reference for special punctuation marks, math symbols, and many more',
  },
  {
    href: Routes.EmojisCheatSheet,
    Icon: EmojisIcon,
    title: 'Emojis Cheatsheet',
    description: 'Browse a comprehensive list of emojis to add personality and fun to your content',
  },
  {
    href: Routes.ColorSwatchesCheatSheet,
    Icon: ColorSwatchesIcon,
    title: 'Color Swatches Cheatsheet',
    description: 'Find the perfect color swatch for your design projects',
  },
];

const CheatsheetsSection: React.FC = () => {
  return (
    <Container>
      <Headline>{'{ CHEATSHEETS }'}</Headline>

      <FeaturesRow>
        {cheatsheetData.map((cheatsheet, index) => (
          <FeatureCard
            key={index}
            href={cheatsheet.href}
            icon={cheatsheet.Icon}
            title={cheatsheet.title}
            description={cheatsheet.description}
          />
        ))}
      </FeaturesRow>
    </Container>
  );
};

export { CheatsheetsSection };
