import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/exploring-colors-of-bridgerton';
import { metaTags } from '@/content/meta-data/blog-exploring-colors-of-bridgerton';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const ExploringColorsOfBridgertonPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.ExploringColorsOfBridgertonBlog);

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

export default ExploringColorsOfBridgertonPage;
