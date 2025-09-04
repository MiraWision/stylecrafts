import React from 'react';

import { content } from '@/content/function-descriptions/image-compression';
import { metaTags } from '@/content/meta-data/function-image-compression';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import { ImageCompressionMain } from '@/components/pages/images/compression';

const ImageCompressionToolPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Image Compression</Title>

        <Subtitle>Reduce File Sizes While Maintaining Quality for Faster Loading and Storage</Subtitle>

        <ImageCompressionMain />
      </MainContainer>  

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer> 
    </BaseLayout>
  );
};

export default ImageCompressionToolPage;