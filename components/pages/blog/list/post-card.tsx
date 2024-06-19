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
    <Container>
      <h2>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>

      <h3>{post.subtitle}</h3>

      <PostSummary post={post} />
    </Container>
  );
}

const Container = styled.div`
  &:not(:last-child) {
    border-bottom: 0.0625rem solid var(--surface-border);
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.75rem 0 0.75rem;

    a {
      color: var(--text-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  h3 {
    font-weight: 400;
    font-size: 1.125rem;
    margin: 0.375rem 0;
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export { PostCard };