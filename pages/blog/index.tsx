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

      <Container>
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
      </Container>
    </BaseLayout>
  );
};

const Container = styled(FullSizeContainer)`
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  margin-left: 15rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  width: 100%;
  margin-top: 4rem;
  max-width: 70rem;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;
  }
`;

export default BlogPage;
