import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '../content/legal-documents/terms-of-use';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/legal-terms-of-use';

import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/texts/markdown';

import 'primeflex/primeflex.css';

const TermsOfUse = () => {

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer>
    </BaseLayout>
  );
};

export default TermsOfUse;