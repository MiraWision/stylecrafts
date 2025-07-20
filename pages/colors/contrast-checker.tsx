import React from 'react';

import { content } from '@/content/function-descriptions/colors-palette';
import { metaTags } from '@/content/meta-data/function-colors-palette';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import ColorContrast from '@/components/pages/colors/contrast-checker';

const ContrastChecker: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Color Contrast Checker</Title>

        <Subtitle>Check the contrast between two colors to ensure that your text is readable</Subtitle>

        <ColorContrast />
      </MainContainer>

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer>
    </BaseLayout>
  );
};

export default ContrastChecker;