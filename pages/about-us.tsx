import React from 'react';
import { metaTags } from '@/content/meta-data/about-us';
import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { AboutUsSection } from '@/components/pages/landing/about-us-section';

const AboutUs = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      <AboutUsSection />
    </BaseLayout>
  );
};

export default AboutUs;
