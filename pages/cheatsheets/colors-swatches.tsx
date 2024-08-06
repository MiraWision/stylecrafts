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

const CharacterCheatSheetPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <StyledTitle>Comprehensive Color Swatches</StyledTitle>

      <ColorSwatchesCheatSheetMain />

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

const StyledTitle = styled(Title)`
  text-align: center;
`;

export default CharacterCheatSheetPage;