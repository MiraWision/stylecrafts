import React from 'react';

import { content } from '../content/legal-documents/privacy-policy';
import { metaTags } from '@/content/meta-data/legal-privacy-policy';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';

const PrivacyPolicy = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

export default PrivacyPolicy;