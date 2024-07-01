import React from 'react';
import styled from 'styled-components';
import { contrastColors } from './examples';

interface ColorPaletteProps {
  onSelect: (background: string, text: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onSelect }) => {
  return (
    <PaletteContainer>
      {contrastColors.map(group => (
        <div key={group.groupName}>
          <h2>{group.groupName}</h2>
          <PaletteGrid>
            {group.colors.map((color, index) => (
              <PaletteItem
                key={index}
                onClick={() => onSelect(color.background, color.text)}
                background={color.background}
                textColor={color.text}
              >
                Az
              </PaletteItem>
            ))}
          </PaletteGrid>
        </div>
      ))}
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 2rem;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const PaletteItem = styled.div<{ background: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background-color: ${({ background }) => background};
  color: ${({ textColor }) => textColor};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export { ColorPalette };