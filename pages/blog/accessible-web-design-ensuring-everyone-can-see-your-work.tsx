import React from 'react';
import { BaseLayout } from '@/layouts/base-layout';

import { content } from '@/content/blog-posts/accessible-web-design-ensuring-everyone-can-see-your-work';
import { metaTags } from '@/content/meta-data/blog-accessible-web-design-ensuring-everyone-can-see-your-work';
import { blogPosts } from '@/content/blog-posts';
import { Routes } from '@/content/routes'; 

import { MetaTags } from '@/components/pages/meta-tags';
import { Post } from '@/components/pages/blog/post/post';

const BlogAccessibleWebDesignEnsuringEveryoneCanSeeYourWorkPage = () => {
  const post = blogPosts.find((post) => post.url === Routes.AccessibleWebDesignBlog);

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

export default BlogAccessibleWebDesignEnsuringEveryoneCanSeeYourWorkPage;
