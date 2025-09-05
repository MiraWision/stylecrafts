import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { BlogPost } from '@/content/blog-posts/types';

import { PostSummary } from '@/components/pages/blog/post-summary';

interface Props {
  post: BlogPost;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Container href={post.url}>
      <Image
        src={post.thumbnail}
        alt={post.title}
      />

      <Title>
        {post.title}
      </Title>

      <SubTitle>{post.subtitle}</SubTitle>

      <PostSummaryStyled post={post} />
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-color);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;

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
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
`;

const PostSummaryStyled = styled(PostSummary)`
  margin: 0;
`;

export { PostCard };