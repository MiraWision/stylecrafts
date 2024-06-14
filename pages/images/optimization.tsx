import React from 'react';

import { content } from '@/content/function-descriptions/image-optimization';
import { metaTags } from '@/content/meta-data/function-image-optimization';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title } from '@/components/ui/texts/typography';
import { ImageOptimizer } from '@/components/pages/images/optimization/image-optimizer';

const ImageOptimizationToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Image Optimization</Title>
  
        <ImageOptimizer />
      </MainContainer>  

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer> 
    </BaseLayout>
  );
};

export default ImageOptimizationToolPage;