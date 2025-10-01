import React from 'react';

import { metaTags } from '@/content/meta-data/function-favicon';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import FaviconMain from '@/components/pages/images/favicon';

const FaviconPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Favicon Generator</Title>

        <Subtitle>Generate favicons and app icons in multiple sizes from your image. Create favicon.ico, web icons, and Apple Touch icons for your website or PWA.</Subtitle>

        <FaviconMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default FaviconPage;
