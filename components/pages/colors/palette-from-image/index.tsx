import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageColorPicker } from './image-picker';
import { useToast } from '@/components/ui/toast';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { ImageInputMini, ImageData } from '@/components/ui/inputs/image-input-mini';
import { ColorTag } from '@/components/ui/colors/color-tag';
import { ImageExamples } from './image-examples';
import { CopyTextButton } from '@/components/ui/text-buttons/copy-text-button';
import { Label } from '@/components/ui/texts/label';

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

const PaletteFromImageMain: React.FC<PaletteFromImageProps> = ({}) => {
  const { toast } = useToast();

  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [userPalette, setUserPalette] = useState<string[]>([]);

  const handlePaletteChange = (newAutoPalette: string[], newUserPalette: string[]) => {
    setAutoPalette(newAutoPalette);
    setUserPalette(newUserPalette);
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newUserPalette = [...userPalette];
    newUserPalette[index] = newColor;
    setUserPalette(newUserPalette);
  };

  const handleAddUserColor = (newColor: string) => {
    setUserPalette([...userPalette, newColor]);
  };

  const onCopy = () => {
    const text = autoPalette.length > 0 ? autoPalette.join(', ') : userPalette.join(', ');
    toast.success('Colors copied to clipboard', text);

    GAService.logEvent(analyticsEvents.colors.gradient.gradientCopied(text));
  };

  const handleRefreshPalette = () => {
    setUserPalette([]);
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageData: ImageData) => {
    setSelectedImage(imageData.content);
  };

  return (
    <GridContainer>
      <Column>
        <ImageInputMini
          value={selectedImage}
          onChange={handleImageSelect}
        />

        {selectedImage ? (
          <ImageColorPicker
            onPaletteChange={handlePaletteChange}
            selectedImage={selectedImage}
          /> 
        ) : (
          <ImagePlaceholder />
        )}
      </Column>

      <Column>
        {(autoPalette.length > 0 || userPalette.length > 0) && (
          <CopyTextButton
            text='Copy Colors'
            copyText={autoPalette.length > 0 ? autoPalette.join(', ') : userPalette.join(', ')}
            onCopyCallback={onCopy}
          />
        )}
        <PaletteContainer>
          {autoPalette.length > 0 && (
            <PaletteColumn>
              <Label>Auto Palette</Label>
              <ColorsGrid>
                {autoPalette.map((color, index) => (
                  <ColorTag
                    key={index}
                    color={color}
                  />
                ))}
              </ColorsGrid>
            </PaletteColumn>
          )}
          {userPalette.length > 0 && (
            <PaletteColumn>
              <Label>User Palette</Label>
              <ColorsGrid>
                {userPalette.map((color, index) => (
                  <ColorTag
                    key={index}
                    color={color}
                  />
                ))}
              </ColorsGrid>
            </PaletteColumn>
          )}
        </PaletteContainer>
      </Column>

      {/* <ImageExamples images={exampleImages} onImageSelect={handleImageSelect} /> */}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PaletteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PaletteColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;

export { PaletteFromImageMain };