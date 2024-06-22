import React from 'react';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer'
;
import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';

const CheatsheetsSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();

  return (
    <Container ref={observerRef}>
      <Headline>Cheatsheets</Headline>

      <FeaturesRow>
        <FeatureCard
          href={Routes.CharactersCheatSheet}
          isVisible={isVisible}
          imageSrc='/landing/characters.png'
          title='Characters Cheatsheet'
          description='Access a quick reference for special punctuation marks, math symbols, and many more'
        />

        <FeatureCard
          href={Routes.EmojisCheatSheet}
          isVisible={isVisible}
          imageSrc='/landing/emojis.png'
          title='Emojis Cheatsheet'
          description='Browse a comprehensive list of emojis to add personality and fun to your content'
        />
      </FeaturesRow>
    </Container>
  );
};

export { CheatsheetsSection };
