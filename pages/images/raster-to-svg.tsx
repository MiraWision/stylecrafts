import React from 'react';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import { RasterToSvgMain } from '@/components/pages/images/raster-to-svg';

const RasterToSvgToolPage: React.FC = () => {
  return (
    <BaseLayout>

      <MainContainer>
        <Title>Raster to SVG Converter</Title>

        <Subtitle>Transform raster images into scalable vector graphics with AI-powered processing</Subtitle>

        <RasterToSvgMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default RasterToSvgToolPage;
