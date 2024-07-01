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
              <ColorSquare key={colorIndex} style={{ backgroundColor: color }} />
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
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 1rem;
`;

const ExampleImage = styled.img`
  width: 100%;
  width: 16rem;
  height: 8rem;
  object-fit: cover;
`;

const ColorPalette = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.2rem;
`;

const ColorSquare = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
`;

export { ImageExamples };