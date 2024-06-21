import React from 'react';
import styled from 'styled-components';

import { blogPosts } from '@/content/blog-posts';
import { metaTags } from '@/content/meta-data/blog';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { PostCard } from '@/components/pages/blog/list/post-card';
import { Title } from '@/components/ui/texts/typography';
import { MainPostCard } from '@/components/pages/blog/list/main-post-card';
import { FullSizeContainer } from '@/components/ui/containers';

const BlogPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <FullSizeContainer>
        <Title>News & Articles</Title>

        <MainPostCard 
          post={blogPosts[0]}
        />
        
        <PostsGrid>
          {blogPosts.slice(1).map((post) => (
            <PostCard
              key={post.url}
              post={post}
            />
          ))}
        </PostsGrid>
      </FullSizeContainer>
    </BaseLayout>
  );
};

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
`;

export default BlogPage;
