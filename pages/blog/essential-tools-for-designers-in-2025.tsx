import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/essential-tools-for-designers-in-2025';
import { metaTags } from '@/content/meta-data/blog-essential-tools-for-designers-in-2025';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogEssentialToolsForDesignersBlogIn2025Page = () => {
  const post = blogPosts.find((post) => post.url === Routes.ToolsForDesignersBlog);

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

export default BlogEssentialToolsForDesignersBlogIn2025Page;