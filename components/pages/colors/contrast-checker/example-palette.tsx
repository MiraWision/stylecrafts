import React from 'react';
import styled from 'styled-components';
import { contrastColors } from './examples';

interface ColorPaletteProps {
  onSelect: (background: string, text: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onSelect }) => {
  const allColors = contrastColors.flatMap(group => group.colors);

  return (
    <PaletteContainer>
      <PaletteGrid>
        {allColors.slice(0, 24).map((color, index) => (
          <PaletteItem
            key={index}
            onClick={() => onSelect(color.background, color.text)}
            $backgroundColor={color.background}
            $color={color.text}
          >
            Aa
          </PaletteItem>
        ))}
      </PaletteGrid>
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  place-items: center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
`;

const PaletteItem = styled.div.attrs<{$backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export { ColorPalette };
