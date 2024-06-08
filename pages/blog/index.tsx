import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { BaseLayout } from '@/layouts/base-layout';
import { blogPosts } from '@/content/blog-posts';
import { convertDateToUSFormat } from '@/utils/date';
import Link from 'next/link';


const BlogList = () => {
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
            <p>Published on {convertDateToUSFormat(post.createdAt)} · {post.minutesToRead} min read</p>
          </PostCard>
        ))}
      </BlogContainer>
    </BaseLayout>
  );
};

export default BlogList;

const BlogContainer = styled.div`
  width: 840px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 48px;
  font-weight: 500;
`;

const PostCard = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid var(--surface-border);
    margin-bottom: 12px;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin: 12px 0 12px;

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
    font-size: 18px;
    margin: 6px 0;
    font-style: italic;
  }

  p {
    font-size: 14px;
  }
`;