import React from 'react';

import { content } from '@/content/function-descriptions/colors-converter';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/function-colors-converter';

import { BaseLayout } from '@/layouts/base-layout';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title } from '@/components/ui/texts/typography';
import { ColorConverter } from '@/components/pages/colors/converter';

const ColorsConverterToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Colors Converter</Title>

        <ColorConverter />

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

export default ColorsConverterToolPage;
