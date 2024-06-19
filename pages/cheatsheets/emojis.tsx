import React from 'react';

import { metaTags } from '@/content/meta-data/cheatsheet-emojis';
import { content } from '@/content/function-descriptions/cheatsheat-emojis';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Title } from '@/components/ui/texts/typography';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { EmojisCheatSheetMain } from '@/components/pages/cheatsheets/emojis';

const CharacterCheatSheetPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <Title>Emojis Cheatsheet</Title>

      <EmojisCheatSheetMain />

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

export default CharacterCheatSheetPage;