import React from 'react';
import styled from 'styled-components';

import { BlogPost } from '@/content/blog-posts/types';

import { convertDateToUSFormat } from '@/utils/date';

interface Props {
  post: BlogPost;
  className?: string;
}

const PostSummary: React.FC<Props> = ({ post, className }) => {
  return (
    <Text className={className}>
      {post.minutesToRead} min read · {convertDateToUSFormat(post.createdAt)}
    </Text>
  );
}

const Text = styled.p`
  font-family: var(--font-family);
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-color);
  margin: 1rem 0;
`;

export { PostSummary };