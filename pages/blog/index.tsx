import React from 'react';

import { blogPosts } from '@/content/blog-posts';
import { metaTags } from '@/content/meta-data/blog';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { PostCard } from '@/components/pages/blog/list/post-card';
import { Title } from '@/components/ui/texts/typography';

const BlogPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <BlogContainer>
        <Title>Blog</Title>

        {blogPosts.map((post) => (
          <PostCard
            key={post.url}
            post={post}
          />
        ))}
      </BlogContainer>
    </BaseLayout>
  );
};

export default BlogPage;
