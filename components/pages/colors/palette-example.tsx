import React from 'react';
import styled from 'styled-components';

import { Label } from '@/components/ui/texts/label';

interface Palette {
  name: string;
  colors: string[];
}

interface Props {
  palette: Palette;
  onClick: () => void;
}

// Function to generate lighter and darker shades of a color
const generateShades = (hexColor: string) => {
  const shades = [];
  const baseColor = hexColor.replace('#', '');
  
  // Generate lighter shades
  for (let i = 1; i <= 3; i++) {
    const factor = 1 + (i * 0.15);
    const lighter = Math.min(255, Math.round(parseInt(baseColor.substr(0, 2), 16) * factor));
    const lighterHex = lighter.toString(16).padStart(2, '0');
    shades.push(`#${lighterHex}${baseColor.substr(2)}`);
  }
  
  // Add base color
  shades.push(hexColor);
  
  // Generate darker shades
  for (let i = 1; i <= 3; i++) {
    const factor = 1 - (i * 0.15);
    const darker = Math.max(0, Math.round(parseInt(baseColor.substr(0, 2), 16) * factor));
    const darkerHex = darker.toString(16).padStart(2, '0');
    shades.push(`#${darkerHex}${baseColor.substr(2)}`);
  }
  
  return shades;
};

const PaletteExample: React.FC<Props> = ({ palette, onClick }) => {
  return (
    <Container onClick={onClick}>
      <PaletteName>{palette.name}</PaletteName>
      
      <PaletteContainer>
        {palette.colors.map((color, colorIndex) => (
          <ColorColumn key={`${color}-${colorIndex}`}>
            <ColorShades>
              {generateShades(color).map((shade, shadeIndex) => (
                <ColorShade 
                  key={`${shade}-${shadeIndex}`} 
                  $backgroundColor={shade}
                  $isBase={shadeIndex === 3}
                />
              ))}
            </ColorShades>
            <ColorLabel>{color}</ColorLabel>
          </ColorColumn>
        ))}
      </PaletteContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--surface-100);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  min-height: 200px;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 180px;
  }
`;

const PaletteName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
  color: var(--text-color);
`;

const PaletteContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ColorShades = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ColorShade = styled.div.attrs<{ $backgroundColor: string; $isBase: boolean }>(({ $backgroundColor, $isBase }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 2rem;
  height: 1.5rem;
  border: ${({ $isBase }) => $isBase ? '2px solid #333' : 'none'};
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 1.75rem;
    height: 1.25rem;
  }
`;

const ColorLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
  font-family: monospace;
`;

export { PaletteExample };

export type { Palette };
