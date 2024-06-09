import React from 'react';
import { styled } from 'styled-components';
import * as marked from 'marked';

const renderer = new marked.Renderer();

// renderer.code = (code, language) => {
//   return `<div class="code-block" data-language="${language}" data-code="${encodeURIComponent(code)}"></div>`;
// };

interface Props {
  markdownText: string;
}

const Markdown: React.FC<Props> = ({ markdownText }) => {
  const html = marked.parse(markdownText, { renderer });

  return (
    <Container 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

const Container = styled.div`
  font-family: var(--font-family);
  color: var(--text-color-secondary);
  line-height: 1.6;
  font-size: 1rem;

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
  }

  h1 {
    font-size: 1.75rem;
    margin: 1rem 0;
  }

  h2 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  h3 {
    font-size: 1.25rem;
    margin: 1rem 0;
  }

  p {
    margin: 0 0 1rem 0;
  }

  ul, ol {
    padding-left: 1.5rem;
    margin: 0 0 1rem 0;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);

    &:hover {
      text-decoration: underline;
    }
  }

  strong, b {
    font-weight: 600;
  }

  blockquote {
    border: 1px solid var(--primary-color)ч;
    border-radius: 12px;
    padding: 8px 16px;
    margin: 0;

    p {
      margin: 0;
    }
  }
`;

export { Markdown };
