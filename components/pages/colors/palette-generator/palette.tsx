import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from './types';
import { Label } from '@/components/ui/texts/label';
import { CopyTextButton } from '@/components/ui/text-buttons/copy-text-button';

interface PaletteProps {
  selectedColors: PaletteColor[];
  onRemoveColor: (index: number) => void;
}

const Palette: React.FC<PaletteProps> = ({ selectedColors }) => {
  return (
    <PaletteContainer>
      <Label>Your Palette</Label>
      
      <PaletteRow>
        {selectedColors.map((color, colorIndex) => (
          <ColorBoxContainer key={colorIndex}>
            <ColorBox $backgroundColor={color.baseColor} />
            <CopyButtonContainer>
              <CopyTextButton 
                text="" 
                copyText={color.baseColor} 
                iconSize={30}
              />
            </CopyButtonContainer>
          </ColorBoxContainer>
        ))}
      </PaletteRow>
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaletteRow = styled.div`
  width: fit-content;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(8, 1fr);
`;

const ColorBoxContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  cursor: pointer;
  
  &:hover > div {
    display: flex;
  }
`;

const ColorBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const CopyButtonContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: inherit;

  button {
    background: transparent;
    border: none;
  }
`;

export { Palette };
