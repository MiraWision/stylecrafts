import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from '../types';

interface BlogPreviewProps {
  palette: PaletteColor[];
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ palette }) => {
  const primaryColor = palette.find(color => color.title === 'Primary')?.baseColor || '#3468db';
  const accentColor = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const backgroundColor = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';
  const sectionBackgroundColor = palette.find(color => color.title === 'SectionBackground')?.baseColor || '#ffffff'; // Фон для секций

  return (
    <Container style={{ backgroundColor }}>
      <LeftColumn>
        <Section backgroundColor={sectionBackgroundColor}>
          <CompactHeading style={{ color: textColor }}>Headings</CompactHeading>
          <Title style={{ color: primaryColor }}>Exploring the Wonders of the Universe</Title>
          <Subtitle style={{ color: accentColor }}>A Journey Through Space and Time</Subtitle>
        </Section>

        <Section backgroundColor={sectionBackgroundColor}>
          <CompactHeading style={{ color: textColor }}>Paragraphs</CompactHeading>
          <Paragraph style={{ color: textColor }}>
            The universe is vast and full of mysteries. Scientists have been working
            for decades to unravel the secrets of the cosmos, and each discovery only
            raises more questions.
          </Paragraph>
        </Section>
      </LeftColumn>

      <RightColumn>
        <Section backgroundColor={sectionBackgroundColor}>
          <CompactHeading style={{ color: textColor }}>Quotes</CompactHeading>
          <Quote style={{ borderLeftColor: primaryColor }}>
            "Imagination is more important than knowledge." – Albert Einstein
          </Quote>
        </Section>

        <Section backgroundColor={sectionBackgroundColor}>
          <CompactHeading style={{ color: textColor }}>Images</CompactHeading>
          <Image src="https://via.placeholder.com/800x400" alt="Blog cover" />
        </Section>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

const Section = styled.div<{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CompactHeading = styled.h2`
  font-size: 1rem;
  margin: 10px 0px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 10px 0 20px 0;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin: 15px 0;
`;

const Paragraph = styled.p`
  font-size: 1.07rem;
  margin-bottom: 20px;
`;

const Quote = styled.blockquote`
  font-size: 1rem;
  font-style: italic;
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 5px solid;
`;

const Image = styled.img`
  width: 100%;
  height: 8rem;
  margin-bottom: 5px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export { BlogPreview };
