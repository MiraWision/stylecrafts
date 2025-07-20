import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/the-psychology-of-color-in-web-design';
import { metaTags } from '@/content/meta-data/blog-the-psychology-of-color-in-web-design';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogThePsychologyOfColorBlogInWebDesignPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.PsychologyOfColorBlog);

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

export default BlogThePsychologyOfColorBlogInWebDesignPage;
