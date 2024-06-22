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
      <Headline>Colors Features</Headline>

      <FeaturesRow>
        <FeatureCard
          href={Routes.CharactersCheatSheet}
          isVisible={isVisible}
          imageSrc='/landing/characters.png'
          title='Characters Cheatsheet'
          description='Quickly find the characters you need for your projects'
        />

        <FeatureCard
          href={Routes.EmojisCheatSheet}
          isVisible={isVisible}
          imageSrc='/landing/emojis.png'
          title='Emojis Cheatsheet'
          description='Find and copy emojis to your clipboard with a single click'
        />
      </FeaturesRow>
    </Container>
  );
};

export { CheatsheetsSection };
