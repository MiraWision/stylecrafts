import React from 'react';

import { metaTags } from '@/content/meta-data/cheatsheet-characters';
import { content } from '@/content/function-descriptions/cheatsheat-characters';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Title } from '@/components/ui/texts/typography';
import { CharactersCheatSheetMain } from '@/components/pages/cheatsheets/characters';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';

const CharacterCheatSheetPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <Title>Ultimate HTML Character Entities Cheatsheet</Title>

      <CharactersCheatSheetMain />

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

export default CharacterCheatSheetPage;