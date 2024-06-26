import React from 'react';

import { content } from '@/content/function-descriptions/colors-palette';
import { metaTags } from '@/content/meta-data/function-colors-palette';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { PaletteGeneratorMain } from '@/components/pages/colors/palette-generator';

const ColorsMixerToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Colors Palette Generator </Title>

        <Subtitle>Design Custom Color Palettes or Find Inspiration</Subtitle>

        <PaletteGeneratorMain />

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

export default ColorsMixerToolPage;
