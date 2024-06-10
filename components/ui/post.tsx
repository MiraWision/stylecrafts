import styled from 'styled-components';

const PostContainer = styled.div`
  width: 42rem;
  margin: 0 auto;
`;

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

const PostSummary = styled.p`
  font-family: var(--font-family);
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-color-secondary);
  margin: 1rem 0;
`;

export { 
  PostContainer,
  PostTitle,
  PostSubtitle,
  PostSummary,
};
