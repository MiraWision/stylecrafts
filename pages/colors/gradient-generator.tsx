import React from 'react';

import { content } from '@/content/function-descriptions/colors-gradient';
import { metaTags } from '@/content/meta-data/function-colors-gradient';

import { BaseLayout } from '@/layouts/base-layout';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { MetaTags } from '@/components/pages/meta-tags';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { GradientGenerator } from '@/components/pages/colors/gradient-generator';

const ColorsGradientGeneratorToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Stepped Gradient Generator</Title>

        <Subtitle>Create Gradients for Heatmap, Charts, and Data Visualization</Subtitle>

        <GradientGenerator />

        <NPMLink
          text='Want to use the USA Map component in your app? Check out our NPM package'
          packageName='@mirawision/usa-map-react'
        />

        <NPMLink
          text='Need to have color tools like these in your app? Feel free to use our NPM package'
          packageName='@mirawision/colorize'
        />
      </MainContainer>

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer>
    </BaseLayout>
  );
};

export default ColorsGradientGeneratorToolPage;