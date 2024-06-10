import React from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { blogPosts } from '@/content/blog-posts';
import { convertDateToUSFormat } from '@/utils/date';
import Link from 'next/link';


const BlogPage = () => {
  return (
    <BaseLayout>
      <BlogContainer>
        <Title>Blog</Title>

        {blogPosts.map((post) => (
          <PostCard key={post.url}>
            <h2>
              <Link href={`/blog/${post.url}`}>
                {post.title}
              </Link>
            </h2>
            <h3>{post.subtitle}</h3>
            <p>{post.minutesToRead} min read · {convertDateToUSFormat(post.createdAt)}</p>
          </PostCard>
        ))}
      </BlogContainer>
    </BaseLayout>
  );
};

const BlogContainer = styled.div`
  width: 42rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 500;
`;

const PostCard = styled.div`
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
  }

  h3 {
    font-weight: 400;
    font-size: 1.125rem;
    margin: 0.375rem 0;
    font-style: italic;
  }

  p {
    font-size: 0.875rem;
  }
`;

export default BlogPage;
