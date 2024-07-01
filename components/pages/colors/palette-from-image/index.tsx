import React, { useState } from 'react';
import styled from 'styled-components';

import { ImageColorPicker } from './image-picker';
import { Palette } from './palette';
import { ImageExamples } from './image-examples';

interface PaletteFromImageProps {
  autoPalette: string[];
  userPalette: string[];
  handlePaletteChange: (newAutoPalette: string[], newUserPalette: string[]) => void;
  handleRemoveColor: (index: number, paletteType: 'auto' | 'user') => void;
  handleRefreshPalette: () => void;
}

const exampleImages = [
  {
    src: '/image-examples/orange-nature.jpeg',
    colors: ["#632d13", "#935429", "#da965c", "#2c1707", "#a1694c", "#d37029", "#f6d18e", "#fcf5e3", "#6a3945", "#c53209"]
  },
  {
    src: '/image-examples/green-nature.jpeg',
    colors: ["#454a37", "#aeb3ac", "#6c8fa8", "#60778d", "#b9996f", "#778646", "#8b7a65"]
  },
  {
    src: '/image-examples/green-blue-nature.jpeg',
    colors: ["#2b5023", "#a6c0e0", "#6f9dcb", "#668c51", "#aca12f", "#4a79aa", "#ac392d", "#95709f"]
  },
  {
    src: '/image-examples/purple-nature.jpeg',
    colors: ["#505caa", "#463350", "#a565a0", "#d39cba", "#6a8bce", "#8f5f6e"]
  },
  {
    src: '/image-examples/orange-pink-blue-nature.jpeg',
    colors: ["#302747", "#b85347", "#fa9a16", "#494285", "#8a548d"]
  },
  {
    src: '/image-examples/white-animal.jpeg',
    colors: ["#6b5e85", "#cbafaa", "#e3cab8", "#443d70", "#ead2c9", "#3d3a70", "#4c3d3e", "#1f1a21", "#3f4077", "#d7b0c7"]
  },
];

const PaletteFromImageComponent: React.FC<PaletteFromImageProps> = ({
  autoPalette,
  userPalette,
  handlePaletteChange,
  handleRemoveColor,
  handleRefreshPalette,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <GridContainer>
      <ImageColorPicker onPaletteChange={handlePaletteChange} selectedImage={selectedImage} />
      <Row>
        <Column>
          <PaletteName>Auto Palette</PaletteName>
          <Palette
            palette={autoPalette}
            onRemoveColor={(index) => handleRemoveColor(index, 'auto')}
            onRefreshPalette={handleRefreshPalette}
          />
        </Column>
        <Column>
          <PaletteName>Your Palette</PaletteName>
          <Palette
            palette={userPalette}
            onRemoveColor={(index) => handleRemoveColor(index, 'user')}
            onRefreshPalette={handleRefreshPalette}
          />
        </Column>
      </Row>
      <ImageExamples images={exampleImages} onImageSelect={handleImageSelect} />
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PaletteName = styled.h4`
  margin: 0;
  padding: 0;
`;

export { PaletteFromImageComponent };