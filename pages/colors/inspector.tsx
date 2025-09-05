import React from 'react';

import { content } from '@/content/function-descriptions/colors-inspector';
import { metaTags } from '@/content/meta-data/function-colors-inspector';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title } from '@/components/ui/texts/typography';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { ColorInspectorMain } from '@/components/pages/colors/inspector';

const ColorsInspectorToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Color Inspector</Title>

        <ColorInspectorMain />

        <NPMLink 
          text='Need to have color tools like these in you app? Feel free to use our NPM package'
          packageName='@mirawision/colorize'
        />
      </MainContainer>

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer> 
    </BaseLayout>
  );
};

export default ColorsInspectorToolPage;
