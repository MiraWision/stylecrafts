import React from 'react';

import { metaTags } from '@/content/meta-data/function-background-removal';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import { BackgroundRemovalMain } from '@/components/pages/images/background-removal';

const BackgroundRemovalToolPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Background Removal</Title>

        <Subtitle>Remove backgrounds from images using advanced OpenCV algorithms</Subtitle>

        <BackgroundRemovalMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default BackgroundRemovalToolPage;
