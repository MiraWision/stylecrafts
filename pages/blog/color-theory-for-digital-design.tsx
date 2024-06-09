import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { blogPosts } from '@/content/blog-posts';
import { content } from '../../content/blog-posts/color-theory-for-digital-design';
import { convertDateToUSFormat } from '@/utils/date';

import { PostContainer, PostTitle, PostSubtitle, PostSummary } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { BackLink } from '@/components/ui/back-link';

import 'primeflex/primeflex.css';

const BlogColorTheoryForDigitalDesignPage = () => {
  const post = blogPosts.find((post) => post.url === 'color-theory-for-digital-design');

  return (
    <BaseLayout>
      <PostContainer>
        <BackLink href='/blog'>Back to Blog</BackLink>

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

export default BlogColorTheoryForDigitalDesignPage;
