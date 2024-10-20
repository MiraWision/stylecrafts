import React from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/cheatsheet-emojis';
import { content } from '@/content/function-descriptions/cheatsheat-emojis';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Title } from '@/components/ui/texts/typography';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { EmojisCheatSheetMain } from '@/components/pages/cheatsheets/emojis';
import { MainContainer } from '@/components/ui/containers';

const CharacterCheatSheetPage = () => {
  return (
    <BaseLayout>
    <MainContainer>
      <MetaTags {...metaTags} />
        <StyledTitle>Emojis Cheatsheet</StyledTitle>
        <EmojisCheatSheetMain />
      </MainContainer>
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