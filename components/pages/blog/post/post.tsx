
import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';
import { BlogPost } from '@/content/blog-posts/types';
import { generateSlug } from '@/utils/text';

import { BlogContainer } from '../blog-container';
import { PostSummary } from '../post-summary';
import { BackLink } from '@/components/ui/texts/back-link';
import { Markdown } from '@/components/ui/texts/markdown';

interface Props {
  post: BlogPost;
  content: string;
}

const Post: React.FC<Props> = ({ post, content }) => {
  return (
    <BlogContainer>
      <main>
        <header>
          <BackLink href={Routes.Blog}>Back to Blog</BackLink>
        </header>

        <article>
          <PostTitle id={generateSlug(post?.title)}>{post?.title}</PostTitle>

          <PostSubtitle id={generateSlug(post?.subtitle)}>{post?.subtitle}</PostSubtitle>

          <PostSummary post={post} />

          <Markdown 
            markdownText={content}
          />
        </article>

        <footer>
          {post?.tags?.length > 0 && (
            <PostTags>
              {post.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </PostTags>
          )}
        </footer>
      </main>
    </BlogContainer>
  );
}

const PostTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 1.75rem;
  line-height: 1.6;
  color: var(--text-color);
  margin: 1rem 0;
  font-weight: 500;
`;

const PostSubtitle = styled.h2`
  font-family: var(--font-family);
  font-size: 1.25rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  color: var(--text-color-secondary);
  margin: -0.5rem 0 0;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

export { Post };
