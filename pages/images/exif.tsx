import React from 'react';

import { metaTags } from '@/content/meta-data/function-exif';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import ExifMain from '@/components/pages/images/exif';

const ExifPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>EXIF Metadata Viewer & Cleaner</Title>

        <Subtitle>View and remove EXIF metadata from your images. Check camera settings, GPS location, and other metadata, then download clean copies without personal data.</Subtitle>

        <ExifMain />
      </MainContainer>  
    </BaseLayout>
  );
};

export default ExifPage;
