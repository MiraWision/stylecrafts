import React from 'react';

import { content } from '@/content/function-descriptions/generators-lorem-ipsum';
import { metaTags } from '@/content/meta-data/function-generators-lorem-ipsum';

import { BaseLayout } from '@/layouts/base-layout';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { MainLoremIpsumGenerator } from '@/components/pages/generators/lorem-ipsum';

const LoremIpsumGeneratorPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Lorem Ipsum Generator</Title>

        <Subtitle>Generate Placeholder Text for Your Projects</Subtitle>

        <MainLoremIpsumGenerator />
      </MainContainer>

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer>
    </BaseLayout>
  );
};

export default LoremIpsumGeneratorPage;
