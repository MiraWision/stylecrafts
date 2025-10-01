import React from 'react';

import { metaTags } from '@/content/meta-data/function-image-resize';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import ResizeMain from '@/components/pages/images/resize';

const ResizeImagePage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Image Resize Tool</Title>

        <Subtitle>Resize images with custom dimensions or popular presets for social media, web, and print</Subtitle>

        <ResizeMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default ResizeImagePage;
