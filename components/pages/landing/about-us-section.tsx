import React from 'react';
import styled from 'styled-components';
import { Markdown } from '@/components/ui/texts/markdown';
import { content } from '@/content/legal-documents/about-us';

const AboutUsSection: React.FC = () => {
  return (
    <SectionContainer>
      <ContentContainer>
        <Markdown markdownText={content} />
      </ContentContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  min-height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 900px;
  background: rgba(255,255,255,0.95);
  border-radius: 1.5rem;
  box-shadow: 0 0 2rem 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  margin: 3rem 0;
  font-size: 1.1rem;
  color: var(--text-color);

  @media (max-width: 900px) {
    width: 95%;
    padding: 2rem 1rem;
  }

  h1, h2, h3 {
    color: var(--primary-color);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.2em;
    margin-bottom: 1.2em;
  }

  li {
    margin-bottom: 0.5em;
  }
`;

export { AboutUsSection }; 