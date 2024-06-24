import React from 'react';
import styled from 'styled-components';
import { ImageColorPicker } from '@/components/pages/colors/palette-from-image/image-picker';
import { Palette } from '@/components/pages/colors/blender/palette';

interface PaletteFromImageProps {
  autoPalette: string[];
  userPalette: string[];
  handlePaletteChange: (newAutoPalette: string[], newUserPalette: string[]) => void;
  handleRemoveColor: (index: number, paletteType: 'auto' | 'user') => void;
  handleRefreshPalette: () => void;
}

const PaletteFromImageComponent: React.FC<PaletteFromImageProps> = ({
  autoPalette,
  userPalette,
  handlePaletteChange,
  handleRemoveColor,
  handleRefreshPalette,
}) => {
  return (
    <GridContainer>
      <Column>
        <ImageColorPicker onPaletteChange={handlePaletteChange} />
      </Column>

      <Column>
        <PaletteName>Auto Palette</PaletteName>
        <Palette
          palette={autoPalette}
          onRemoveColor={(index) => handleRemoveColor(index, 'auto')}
          onRefreshPalette={handleRefreshPalette}
        />
        <PaletteName>Your Palette</PaletteName>
        <Palette
          palette={userPalette}
          onRemoveColor={(index) => handleRemoveColor(index, 'user')}
          onRefreshPalette={handleRefreshPalette}
        />
      </Column>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const PaletteName = styled.h4`
  margin: 0;
  padding: 0;
`;

export { PaletteFromImageComponent };
