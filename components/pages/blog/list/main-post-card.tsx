import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { BlogPost } from '@/content/blog-posts/types';

import { PostSummary } from '@/components/pages/blog/post-summary';

interface Props {
  post: BlogPost;
}

const MainPostCard: React.FC<Props> = ({ post }) => {
  return (
    <Container href={post.url}>
      <Column>
        <Image src={post.thumbnail} alt={post.title} />
      </Column>
      
      <Column>
        <Title>{post.title}</Title>

        <SubTitle>{post.subtitle}</SubTitle>

        <PostSummaryStyled post={post} />
      </Column>
    </Container>
  );
}

const Container = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  display: grid;
  grid-template-columns: 4fr 3fr;
  gap: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SubTitle = styled.h3`
  margin: 0;
  font-weight: 400;
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const PostSummaryStyled = styled(PostSummary)`
  margin: 0;
`;

export { MainPostCard };