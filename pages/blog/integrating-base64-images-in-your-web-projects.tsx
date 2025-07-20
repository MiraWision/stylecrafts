import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/integrating-base64-images-in-your-web-projects';
import { metaTags } from '@/content/meta-data/blog-integrating-base64-images-in-your-web-projects';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogIntegratingBase64ImagesBlogInYourWebProjectsPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.Base64ImagesBlog);

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

export default BlogIntegratingBase64ImagesBlogInYourWebProjectsPage;
