import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '../content/legal-documents/privacy-policy';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/legal-privacy-policy';

import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/texts/markdown';

import 'primeflex/primeflex.css';

const PrivacyPolicy = () => {

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

export default PrivacyPolicy;