import React from 'react';

import { metaTags } from '@/content/meta-data/function-image-convert';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import ConvertMain from '@/components/pages/images/convert';

const ConvertImagePage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Image Format Converter</Title>

        <Subtitle>Convert images between PNG, JPG, WebP, and AVIF formats with quality settings and background options</Subtitle>

        <ConvertMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default ConvertImagePage;

