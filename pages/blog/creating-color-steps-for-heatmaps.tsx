import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/creating-color-steps-for-heatmaps';
import { metaTags } from '@/content/meta-data/blog-creating-color-steps-for-heatmaps';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogCreatingColorStepsForHeatmapsBlogPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.ColorStepsForHeatmapsBlog);

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

export default BlogCreatingColorStepsForHeatmapsBlogPage;
