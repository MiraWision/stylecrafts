import React from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/cheatsheet-characters';
import { content } from '@/content/function-descriptions/cheatsheat-characters';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Title } from '@/components/ui/texts/typography';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { ColorSwatchesCheatSheetMain } from '@/components/pages/cheatsheets/color-swatches';
import { MainContainer } from '@/components/ui/containers';

const CharacterCheatSheetPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      <MainContainer>
        <Title>Comprehensive Color Swatches</Title>
        <ColorSwatchesCheatSheetMain />
      </MainContainer>
      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

export default CharacterCheatSheetPage;