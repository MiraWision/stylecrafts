import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { MetaTagsPage } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/blog-top-trends-in-web-design-for-2024';

import { blogPosts } from '@/content/blog-posts';
import { content } from '../../content/blog-posts/top-trends-in-web-design-for-2024';
import { convertDateToUSFormat } from '@/utils/date';
import { Routes } from '@/content/routes';

import { PostContainer, PostTitle, PostSubtitle, PostSummary } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { BackLink } from '@/components/ui/back-link';

import 'primeflex/primeflex.css';

const BlogTopTrendsInWebDesignFor2024Page = () => {
  const post = blogPosts.find((post) => post.url === Routes.WebDesignTrendsBlog);

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

export default BlogTopTrendsInWebDesignFor2024Page;
