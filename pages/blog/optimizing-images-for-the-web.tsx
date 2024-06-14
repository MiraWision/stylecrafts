import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/optimizing-images-for-the-web';
import { metaTags } from '@/content/meta-data/blog-optimizing-images-for-the-web';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogOptimizingImagesBlogForTheWebPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.OptimizingImagesBlog);

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

export default BlogOptimizingImagesBlogForTheWebPage;
