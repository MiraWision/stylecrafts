import React from 'react';

import { content } from '../content/legal-documents/cookie-policy';
import { metaTags } from '@/content/meta-data/legal-cookie-policy';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { DocumentContainer } from '@/components/ui/containers';
import { Markdown } from '@/components/ui/texts/markdown';

const CookiePolicy = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <DocumentContainer>
        <Markdown 
          markdownText={content}
        />
      </DocumentContainer>
    </BaseLayout>
  );
};

export default CookiePolicy;