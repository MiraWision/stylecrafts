import React from 'react';
import styled from 'styled-components';

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
        <ImageWrapper key={index} onClick={() => onImageSelect(image.src)}>
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

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 0.5rem;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.75rem;
    padding: 0 1rem;
  }
  
  @media (max-width: 360px) {
    padding: 0 0.5rem;
    gap: 0.375rem;
    max-width: 100%;
    margin-top: 0.25rem;
    grid-template-columns: repeat(1, 1fr);
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

  @media (max-width: 768px) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;

    &:nth-child(2n) {
      margin-right: 0;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  @media (max-width: 480px) {
    margin-right: 0;
    margin-bottom: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 0.125rem;
    min-height: 120px;
    transition: all 0.15s ease;
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
  
  @media (max-width: 480px) {
    width: 0.75rem;
  }
`;

const ColorStrip = styled.div<{ $backgroundColor: string }>`
  flex: 1;
  width: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export { ImageExamples };
