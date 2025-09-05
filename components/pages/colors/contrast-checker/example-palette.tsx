import React from 'react';
import styled from 'styled-components';
import { contrastColors } from './examples';

interface ColorPaletteProps {
  onSelect: (background: string, text: string) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ onSelect }) => {
  return (
    <PaletteContainer>
      {contrastColors.map((group, groupIndex) => (
        <PaletteGrid key={groupIndex}>
          {group.colors.slice(0, 6).map((color, index) => (
            <PaletteItem
              key={index}
              onClick={() => onSelect(color.background, color.text)}
              $backgroundColor={color.background}
              $color={color.text}
              title={`${color.background} on ${color.text}`}
            >
              <ColorPreview $backgroundColor={color.background} $color={color.text}>
                Aa
              </ColorPreview>
            </PaletteItem>
          ))}
        </PaletteGrid>
      ))}
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  place-items: center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
`;

const PaletteItem = styled.div<{ $backgroundColor: string; $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ColorPreview = styled.div.attrs<{$backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #fff;
  
  @media (max-width: 600px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }
`;
