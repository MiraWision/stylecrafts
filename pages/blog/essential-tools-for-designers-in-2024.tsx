import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { blogPosts } from '@/content/blog-posts';
import { content } from '../../content/blog-posts/essential-tools-for-designers-in-2024';
import { convertDateToUSFormat } from '@/utils/date';
import { Routes } from '@/content/routes';

import { PostContainer, PostTitle, PostSubtitle, PostSummary } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { BackLink } from '@/components/ui/back-link';

import 'primeflex/primeflex.css';

const BlogEssentialToolsForDesignersBlogIn2024Page = () => {
  const post = blogPosts.find((post) => post.url === Routes.ToolsForDesignersBlog);

  return (
    <BaseLayout>
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

export default BlogEssentialToolsForDesignersBlogIn2024Page;