import React from 'react';

import { content } from '../content/legal-documents/privacy-policy';
import { metaTags } from '@/content/meta-data/legal-privacy-policy';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { DocumentContainer } from '@/components/ui/containers';
import { Markdown } from '@/components/ui/texts/markdown';

const PrivacyPolicy = () => {
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

export default PrivacyPolicy;