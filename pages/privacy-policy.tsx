import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '../content/legal-documents/privacy-policy';
import { MetaTagsPage } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/legal-privacy-policy';

import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';

import 'primeflex/primeflex.css';

const PrivacyPolicy = () => {

  return (
    <BaseLayout>
      <MetaTagsPage {...metaTags} />
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer>
    </BaseLayout>
  );
};

export default PrivacyPolicy;