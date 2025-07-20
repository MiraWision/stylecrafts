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
      <DiscoverLink href="/colors/palette-generator">
        Discover more palettes and start blending colors today!
      </DiscoverLink>
    </BaseLayout>
  );
};

const Container = styled(FullSizeContainer)`
  padding: 0 2rem;
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
`;

const DiscoverLink = styled.a`
  display: block;
  margin: 3rem auto 0 auto;
  width: fit-content;
  padding: 0.75rem 2rem;
  background: var(--accent-color, #ff69b4);
  color: #fff;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e055a1;
    color: #fff;
  }
`;

export default BlogPage;
