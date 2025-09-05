import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { styled } from 'styled-components';
import * as marked from 'marked';
import { CodeBlock } from './code-block';
import { generateSlug } from '@/utils/text';

const renderer = new marked.Renderer();

renderer.heading = (text: string, level: number) => {
  return `<h${level} id="${generateSlug(text)}">${text}</h${level}>`;
};

renderer.link = (href: string, title: string, text: string) => {
  return `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

renderer.image = (href: string, title: string, text: string): string => {
  return `
    <figure>
      <img src="${href}" alt="${text}" />
      ${title ? `<figcaption>${title}</figcaption>` : ''}
    </figure>
  `;
};

renderer.code = (code: string, language: string) => {
  return `<div class="code-block" data-language="${language}" data-code="${encodeURIComponent(code)}"></div>`;
};

renderer.listitem = (text: string) => {
  const hexRegex = /#([0-9a-fA-F]{6})/g;
  
  const textWithColorBox = text.replace(hexRegex, (match) => {
    return `<span class="color-box" style="background-color: ${match};"></span>${match}`;
  });

  return `<li>${textWithColorBox}</li>`;
};

interface Props {
  markdownText: string;
}

const Markdown: React.FC<Props> = ({ markdownText }) => {
  useEffect(() => {
    document.querySelectorAll('.code-block').forEach((block) => {
      const code = decodeURIComponent(block.getAttribute('data-code') ?? '');

      const root = createRoot(block);

      root.render(
        <CodeBlock code={code} />
      );
    });
  }, [markdownText]);
  
  const html = marked.parse(markdownText, { renderer });

  return (
    <Container 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

const Container = styled.div`
  font-family: var(--font-family);
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    font-weight: 500;
  }

  h1 {
    font-size: 1.75rem;
    margin: 2rem 0 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin: 2.5rem 0 0.5rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    margin: 2.5rem 0 0.5rem;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
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
    border-left: 0.25rem solid var(--primary-color);
    border-right: 0.25rem solid var(--primary-color);
    border-radius: 0.75rem;
    padding: 0.5rem 1rem;
    margin: 0;

    p {
      margin: 0;
      font-style: italic;
    }
  }

  figure {
    margin: 1rem 0;

    img {
      width: 100%;
      border-radius: 0.5rem;
    }

    figcaption {
      font-size: 0.75rem;
      color: var(--text-color);
      text-align: center;
    }
  }

  .color-box {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
    border: 0.0625rem solid var(--text-color);
    border-radius: 0.25rem;
    transform: translateY(2px);
  }
`;

export { Markdown };
