import React from 'react';

import { metaTags } from '@/content/meta-data/function-ascii-art';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import AsciiArtMain from '@/components/pages/images/ascii-art';

const AsciiArtPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>ASCII Art Generator</Title>

        <Subtitle>Convert images to ASCII art using OpenCV.js with customizable character sets and density mapping</Subtitle>

        <AsciiArtMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default AsciiArtPage;
