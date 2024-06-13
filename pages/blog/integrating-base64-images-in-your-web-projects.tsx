import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { MetaTagsPage } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/blog-integrating-base64-images-in-your-web-projects';

import { blogPosts } from '@/content/blog-posts';
import { content } from '../../content/blog-posts/integrating-base64-images-in-your-web-projects';
import { convertDateToUSFormat } from '@/utils/date';
import { Routes } from '@/content/routes';

import { PostContainer, PostTitle, PostSubtitle, PostSummary } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { BackLink } from '@/components/ui/back-link';

import 'primeflex/primeflex.css';

const BlogIntegratingBase64ImagesBlogInYourWebProjectsPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.Base64ImagesBlog);

  return (
    <BaseLayout>
      <MetaTagsPage {...metaTags} />
      <PostContainer>
        <BackLink href={Routes.Blog}>Back to Blog</BackLink>

        <PostTitle>{post?.title}</PostTitle>

        <PostSubtitle>{post?.subtitle}</PostSubtitle>

        <PostSummary>{post?.minutesToRead} min read · {convertDateToUSFormat(post?.createdAt ?? '')}</PostSummary>

        <Markdown 
          markdownText={content}
        />
      </PostContainer>
    </BaseLayout>
  );
};

export default BlogIntegratingBase64ImagesBlogInYourWebProjectsPage;
