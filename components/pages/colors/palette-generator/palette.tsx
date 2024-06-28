import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from './types';
import { Label } from '@/components/ui/texts/label';

interface PaletteProps {
  selectedColors: PaletteColor[];
  onRemoveColor: (colorIndex: number, shadeIndex?: number) => void;
}

const Palette: React.FC<PaletteProps> = ({ selectedColors, onRemoveColor }) => {
  return (
    <PaletteContainer>
      <Label>Your Palette</Label>
      
      <PaletteRow>
        {selectedColors.map((color, colorIndex) => (
          <React.Fragment key={colorIndex}>
            <ColorBox 
              color={color.baseColor} 
              onDoubleClick={() => onRemoveColor(colorIndex)} 
            />

            {color.shades.map((shade, shadeIndex) => (
              <ColorBox 
                key={shadeIndex} 
                color={shade.hex} 
                onDoubleClick={() => onRemoveColor(colorIndex, shadeIndex)}
              />
            ))}
          </React.Fragment>
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

const ColorBox = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  cursor: pointer;
`;

export { Palette };
