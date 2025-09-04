import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

interface ImageExample {
  src: string;
  colors: string[];
}

interface ImageExamplesProps {
  images: ImageExample[];
  onImageSelect: (imageSrc: string) => void;
}

const ImageExamples: React.FC<ImageExamplesProps> = ({ images, onImageSelect }) => {
  return (
    <GridContainer>
      {images.map((image, index) => (
        <ImageWrapper key={index} onClick={() => {
          onImageSelect(image.src);
          GAService.logEvent(analyticsEvents.colors.paletteFromImage.exampleImageSelected(image.src));
        }}>
          <ExampleImage src={image.src} alt={`Example ${index + 1}`} />
          <ColorPalette>
            {image.colors.map((color, colorIndex) => (
              <ColorStrip
                key={colorIndex}
                $backgroundColor={color}
              />
            ))}
          </ColorPalette>
        </ImageWrapper>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  cursor: pointer;
  max-width: 100%;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const ExampleImage = styled.img`
  flex: 1 1 0;
  width: 0;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  
  @media (max-width: 480px) {
    aspect-ratio: 4 / 3;
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 3rem;
  margin-left: 0;
  height: 100%;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.15);
`;

const ColorStrip = styled.div<{ $backgroundColor: string }>`
  flex: 1;
  width: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export { ImageExamples };
