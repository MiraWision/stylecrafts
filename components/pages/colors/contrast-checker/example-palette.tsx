import React, { useState } from 'react';
import styled from 'styled-components';
import { contrastColors } from './examples';

interface ColorPaletteProps {
  onSelect: (background: string, text: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <PaletteContainer>
      <CategoryTabs>
        {contrastColors.map((group, index) => (
          <CategoryTab
            key={index}
            $isActive={activeCategory === index}
            onClick={() => setActiveCategory(index)}
          >
            {group.groupName}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <PaletteGrid>
        {contrastColors[activeCategory].colors.map((color, index) => (
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
            <ColorInfo>
              <ColorHex>{color.background}</ColorHex>
              <ColorHex>{color.text}</ColorHex>
            </ColorInfo>
          </PaletteItem>
        ))}
      </PaletteGrid>
    </PaletteContainer>
  );
};

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  @media (max-width: 600px) {
    gap: 0.25rem;
  }
`;

const CategoryTab = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => $isActive ? 'var(--primary-color)' : '#f8f9fa'};
  color: ${({ $isActive }) => $isActive ? '#fff' : 'var(--text-color)'};
  border: 1px solid ${({ $isActive }) => $isActive ? 'var(--primary-color)' : '#e9ecef'};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $isActive }) => $isActive ? 'var(--primary-color)' : '#e9ecef'};
    border-color: ${({ $isActive }) => $isActive ? 'var(--primary-color)' : '#dee2e6'};
  }
  
  @media (max-width: 600px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  place-items: center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
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
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #fff;
  
  @media (max-width: 600px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }
`;

const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ColorHex = styled.span`
  font-size: 0.7rem;
  font-family: monospace;
  color: var(--text-color);
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export { ColorPalette };
