import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/blending-colors-for-unique-palettes';
import { metaTags } from '@/content/meta-data/blog-blending-colors-for-unique-palettes';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogBlendingColorsBlogForUniquePalettesPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.BlendingColorsBlog);

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

export default BlogBlendingColorsBlogForUniquePalettesPage;
