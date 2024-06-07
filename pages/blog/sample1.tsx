import React from 'react';
import styled from 'styled-components';
import { Card } from 'primereact/card';
import { BaseLayout } from '@/layouts/base-layout';
import ReactMarkdown from 'react-markdown';

import 'primeflex/primeflex.css';

const markdownContent = `
This is the content of Sample Article 1. It is displayed within a PrimeReact Card component.

## Subheading

More content here...

- Item 1
- Item 2
- Item 3

[Link to something](#)
`;

const SampleArticle1 = () => {
  return (
    <BaseLayout>
      <ArticleContainer>
        <Title>Sample Article 1</Title>
        <Card>
          <ReactMarkdown className="markdown-body">{markdownContent}</ReactMarkdown>
        </Card>
      </ArticleContainer>
    </BaseLayout>
  );
};

export default SampleArticle1;

const ArticleContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 20px;

  .markdown-body {
    font-family: var(--font-family);
    color: var(--text-color-secondary);
    line-height: 1.6;

    h1, h2, h3, h4, h5, h6 {
      color: var(--text-color);
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      margin: 0 0 1rem 0;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0 0 1rem 0;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;