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
              <ColorStrip key={colorIndex} style={{ backgroundColor: color }} />
            ))}
          </ColorPalette>
        </ImageWrapper>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ExampleImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 0.25rem;
  object-fit: cover;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-direction: column;
  height: 8rem;
  margin-left: 0.5rem;
`;

const ColorStrip = styled.div`
  flex: 1;
  width: 1rem;
  border-radius: 0.1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export { ImageExamples };