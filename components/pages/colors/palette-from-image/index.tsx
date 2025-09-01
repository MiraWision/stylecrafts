import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageColorPicker } from './image-picker';
import { useToast } from '@/components/ui/toast';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { ImageInputMini, ImageData } from '@/components/ui/inputs/image-input-mini';
import { ImageExamples } from './image-examples';
import { Label } from '@/components/ui/texts/label';
import { ToolCrossLinks } from '@/components/ui/cross-links';

import { Palette } from './palette';

interface Props {}

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
  {
    src: '/image-examples/horvatia-example.jpg',
    colors: ["#176f94", "#b8c8d8", "#225260", "#408eb3", "#b88b71", "#9e745b", "#619078"]
  },
  {
    src: '/image-examples/canoe-example.jpg',
    colors: ["#cddce5", "#485349", "#70a2a8", "#5a7698", "#cc5d67", "#778e62", "#879b69", "#a86588"]
  }
];

const PaletteFromImageMain: React.FC<Props> = () => {
  const { toast } = useToast();

  const [palette, setPalette] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [clearedPaletteVersion, setClearedPaletteVersion] = useState(0);

  const handlePaletteChange = (newPalette: string[]) => {
    setPalette(newPalette);
  };

  const handleRemoveColor = (index: number) => {
    setPalette(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleRefreshPalette = () => {
    setPalette([]);
    setClearedPaletteVersion(v => v + 1);
  };

  const handleImageSelect = (imageSrc: string) => {
    // prevent re-selecting the same image from examples
    if (selectedImage?.content === imageSrc) {
      return;
    }
    setSelectedImage({ content: imageSrc });
  };

  return (
    <>
      <GridContainer>
        <ImageColumn>
          <ImageInputMini
            value={selectedImage?.content || null}
            onChange={setSelectedImage}
          />

          {selectedImage ? (
            <ImageColorPicker
              selectedImage={selectedImage.content}
              onPaletteChange={handlePaletteChange}
              clearedPaletteVersion={clearedPaletteVersion}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </ImageColumn>

        <PaletteColumn>
          <StyledLabel fontSize='14'>Palette</StyledLabel>
          <Palette
            palette={palette}
            onRemoveColor={handleRemoveColor}
            onRefreshPalette={handleRefreshPalette}
          />
        </PaletteColumn>
      </GridContainer>

      <ImageExamplesContainer>
        <ImageExamples
          images={exampleImages}
          onImageSelect={handleImageSelect}
        />
      </ImageExamplesContainer>

      <ToolCrossLinks
        toolKey="palette-from-image"
        title="Explore More Color Tools"
      />
    </>
  );
};

const StyledLabel = styled(Label)`
  height: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const PaletteColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
    margin-bottom: 1.2rem;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & > *:first-child {
    min-width: 180px;
    max-width: 100%;
    width: auto;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const ImageExamplesContainer = styled.div`
  margin-top: 1rem;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export { PaletteFromImageMain };
