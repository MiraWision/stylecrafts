import React from 'react';

import { content } from '../content/legal-documents/support-us';
import { metaTags } from '@/content/meta-data/support-us';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';

const SupportUs = () => {
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

export default SupportUs;
