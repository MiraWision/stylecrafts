import React from 'react';

import { metaTags } from '@/content/meta-data/game-guess-color-blend';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Title } from '@/components/ui/texts/typography';
import { GuessColorBlendMain } from '@/components/pages/games/guess-color-blend';

const GuessColorBlendPage = () => {
  return (
    <BaseLayout includeFooter={false}>
      <MetaTags {...metaTags} />

      <Title>Guess Color Blend</Title>

      <GuessColorBlendMain />
    </BaseLayout>
  );
};

export default GuessColorBlendPage;