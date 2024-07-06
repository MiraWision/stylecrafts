import React from 'react';

import { content } from '@/content/function-descriptions/image-compression';
import { metaTags } from '@/content/meta-data/function-image-compression';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { ImageCompression } from '@/components/pages/images/master-tool';

const ImageCompressionToolPage = () => {
  return null;

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Image Compression</Title>

        <Subtitle>Compress and Resize Your Images Effortlessly</Subtitle>
  
        <ImageCompression />
      </MainContainer>  

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer> 
    </BaseLayout>
  );
};

export default ImageCompressionToolPage;