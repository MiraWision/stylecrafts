import React from 'react';

import { content } from '@/content/legal-documents/terms-of-use';
import { metaTags } from '@/content/meta-data/legal-terms-of-use';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';

const TermsOfUse = () => {
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

export default TermsOfUse;