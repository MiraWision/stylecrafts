import React from 'react';

import { content } from '@/content/function-descriptions/colors-blender';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/function-colors-blender';


import { BaseLayout } from '@/layouts/base-layout';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title } from '@/components/ui/texts/typography';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { ColorBlender } from '@/components/pages/colors/blender';

const ColorsBlenderToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Colors Blender</Title>

        <ColorBlender />

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

export default ColorsBlenderToolPage;
