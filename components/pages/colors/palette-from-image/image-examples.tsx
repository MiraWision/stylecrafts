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
                style={{ backgroundColor: color }}
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 0.5rem;
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

  @media (max-width: 768px) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const ExampleImage = styled.img`
  flex: 1 1 0;
  width: 0;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-direction: column;
  width: 1rem;
  margin-left: 0;
  height: 100%;
`;

const ColorStrip = styled.div`
  flex: 1;
  width: 100%;
`;

export { ImageExamples };
