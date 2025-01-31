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
            Az
          </PaletteItem>
        ))}
      </PaletteGrid>
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  place-items: center;
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
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export { ColorPalette };
