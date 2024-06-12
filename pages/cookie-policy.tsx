import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '../content/legal-documents/cookie-policy';
import { Routes } from '@/content/routes'; 

import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';

import 'primeflex/primeflex.css';

const CookiePolicy = () => {

  return (
    <BaseLayout>
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer>
    </BaseLayout>
  );
};

export default CookiePolicy;