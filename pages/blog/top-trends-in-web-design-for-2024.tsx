import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/top-trends-in-web-design-for-2024';
import { metaTags } from '@/content/meta-data/blog-top-trends-in-web-design-for-2024';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogTopTrendsInWebDesignFor2024Page = () => {
  const post = blogPosts.find((post) => post.url === Routes.WebDesignTrendsBlog);

  if (!post) {
    return null;
  }

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <Post 
        post={post}
        content={content}
      />
    </BaseLayout>
  );
};

export default BlogTopTrendsInWebDesignFor2024Page;
