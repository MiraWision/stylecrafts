import React from 'react';

import { content } from '@/content/legal-documents/about-us';
import { metaTags } from '@/content/meta-data/about-us';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { DocumentContainer } from '@/components/ui/containers';
import { Markdown } from '@/components/ui/texts/markdown';

const AboutUs = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <DocumentContainer>
        <Markdown markdownText={content} />
      </DocumentContainer>
    </BaseLayout>
  );
};

export default AboutUs;
