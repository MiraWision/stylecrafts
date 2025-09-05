import React from 'react';

import { content } from '@/content/legal-documents/terms-of-use';
import { metaTags } from '@/content/meta-data/legal-terms-of-use';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { DocumentContainer } from '@/components/ui/containers';
import { Markdown } from '@/components/ui/texts/markdown';

const TermsOfUse = () => {
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

export default TermsOfUse;