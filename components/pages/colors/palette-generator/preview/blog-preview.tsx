import React from 'react';
import styled from 'styled-components';
import { adjustBrightness } from '@mirawision/colorize';

import { PaletteColor } from '../types';

interface BlogPreviewProps {
  palette: PaletteColor[];
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ palette }) => {
  const primary = palette.find(color => color.title === 'Primary')?.baseColor || '#3468db';
  const accent = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const text = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const background = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';
  
  const primaryDark = adjustBrightness(primary, -10);
  const backgroundDark = adjustBrightness(background, -5);
  const textDark = adjustBrightness(text, -5);

  return (
    <Container $backgroundColor={background}>
      <ArticleContent $backgroundColor={background}>
        <Category $color={textDark}>Technology</Category>
        <Title $color={text}>Exploring the Wonders of the Universe</Title>
        <Subtitle $color={text}>A Journey Through Space and Time</Subtitle>
        <MetaInfo>
          <Author $color={text}>By John Doe</Author>
          <Date $color={text}>March 15, 2024</Date>
          <ShareButton $backgroundColor={primary} $textColor="white">
            Share
          </ShareButton>
        </MetaInfo>

        <FeaturedImage src="https://picsum.photos/800/400" alt="Blog cover" />
        
        <TextContent>
          <Paragraph $color={text}>
            The universe is vast and full of mysteries. Scientists have been working
            for decades to unravel the secrets of the cosmos, and each discovery only
            raises more questions.
          </Paragraph>
          
          <Quote $backgroundColor={backgroundDark} $borderColor={primaryDark} $textColor={text}>
            "Imagination is more important than knowledge." – Albert Einstein
          </Quote>
          
          <Paragraph $color={text}>
            From the smallest particles to the largest galaxies, our understanding
            of the universe continues to evolve. Each new observation brings us
            closer to understanding the fundamental nature of reality.
          </Paragraph>
        </TextContent>
      </ArticleContent>
    </Container>
  );
};

const Container = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'var(--surface-100)'};
`;

const ArticleContent = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Category = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  display: block;
  color: ${({ $color }) => $color};
`;

const Title = styled.h1<{ $color: string }>`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $color }) => $color};
`;

const Subtitle = styled.h2<{ $color: string }>`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 400;
  opacity: 0.8;
  line-height: 1.4;
  color: ${({ $color }) => $color};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Author = styled.span<{ $color: string }>`
  font-size: 0.875rem;
  opacity: 0.8;
  color: ${({ $color }) => $color};
`;

const Date = styled.span<{ $color: string }>`
  font-size: 0.875rem;
  opacity: 0.6;
  color: ${({ $color }) => $color};
`;

const ShareButton = styled.button<{ $backgroundColor: string; $textColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-left: auto;
  color: ${({ $textColor }) => $textColor};
  
  &:hover {
    opacity: 0.8;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 8rem;
  margin: 0.5rem 0;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Paragraph = styled.p<{ $color: string }>`
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.6;
  color: ${({ $color }) => $color};
`;

const Quote = styled.blockquote<{ $backgroundColor: string, $borderColor: string, $textColor: string }>`
  font-size: 0.875rem;
  font-style: italic;
  margin: 0;
  padding: 1rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-left: 4px solid ${({ $borderColor }) => $borderColor};
  color: ${({ $textColor }) => $textColor};
  border-radius: 0.25rem;
  line-height: 1.5;
`;

export { BlogPreview };
