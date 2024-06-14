import React from 'react';
import styled from 'styled-components';

import { Palette, PaletteExample } from '../palette-example';

interface Props {
  onSelected: (example: string[]) => void;
}

const palletes: Palette[] = [
  {
    name: 'RGB Basics',
    colors: ['#ff0000', '#00ff00', '#0000ff']
  },
  {
    name: 'CMYK Basics',
    colors: ['#00ffff', '#ff00ff', '#ffff00', '#000000']
  },
  {
    name: 'Primary Colors',
    colors: ['#ff0000', '#0000ff', '#ffff00']
  },
  {
    name: 'Monochrome Black and White',
    colors: ['#000000', '#555555', '#aaaaaa', '#ffffff']
  },
  {
    name: 'Pastel Shades',
    colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#bae1ff', '#baffc9']
  },
  {
    name: 'Electric Pulse',
    colors: ['#ff6ec7', '#f72585', '#4cc9f0', '#48cae4', '#56b4d3']
  },
  {
    name: 'Cool Blues',
    colors: ['#001f3f', '#0074d9', '#7fdbff', '#39cccc', '#3d9970']
  },
  {
    name: 'Sunset Bliss',
    colors: ['#ff7e5f', '#feb47b', '#ffd89b', '#ff9a9e', '#f6d365']
  },
  {
    name: 'Spring Meadow',
    colors: ['#8fbc8f', '#98fb98', '#b0e57c', '#f0e68c', '#ffd700']
  },
  {
    name: 'Ocean Depths',
    colors: ['#012a4a', '#013a63', '#01497c', '#61a5c2', '#d4e1f9']
  },
  {
    name: 'Retro Vibes',
    colors: ['#ff6f61', '#fe9c8f', '#ffc1a6', '#ffe0ac', '#b8f3ff']
  },
  {
    name: 'Earth Tones',
    colors: ['#a0522d', '#cd853f', '#deb887', '#f5deb3', '#fff8dc']
  },
  {
    name: 'Floral Bouquet',
    colors: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#355c7d']
  },
  {
    name: 'Fiery Ember',
    colors: ['#ff4500', '#ff6347', '#ffa07a', '#fa8072', '#e9967a']
  },
  {
    name: 'Muted Neutrals',
    colors: ['#b0a8b9', '#d6d3db', '#f7e8f6', '#ece1eb', '#f4f0f4']
  },
  {
    name: 'Deep Forest',
    colors: ['#013220', '#3b5323', '#6a8a37', '#2c2c2c', '#8b4513']
  },
  {
    name: 'Mint Freshness',
    colors: ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788']
  },
  {
    name: 'Ice and Snow',
    colors: ['#e0f7fa', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6']
  },  
  {
    name: 'Bright Citrus',
    colors: ['#ffdd00', '#ffa500', '#ff4500', '#ff6347', '#ff7f50']
  },
  {
    name: 'Romantic Blush',
    colors: ['#ff9a8b', '#ff6f61', '#ffc1cc', '#ff758f', '#ffaaa5']
  },
  {
    name: 'Tropical Lagoon',
    colors: ['#028090', '#00a896', '#02c39a', '#f0f3bd', '#05668d']
  },
  {
    name: 'Desert Sands',
    colors: ['#e4c16f', '#c89b3c', '#9c5a3c', '#724242', '#e1e3e3']
  },
  {
    name: 'Winter Frost',
    colors: ['#d8e2dc', '#ffffff', '#a2d2ff', '#bde0fe', '#ffc8dd']
  },
  {
    name: 'Vintage Rose',
    colors: ['#d8a7b1', '#ffd6d9', '#ffcccb', '#d8bfd8', '#c4b2d1']
  },
  {
    name: 'Sunrise Spectrum',
    colors: ['#ff5f40', '#ffa07a', '#ffe4b5', '#ffeeba', '#ff9f1c']
  },
  {
    name: 'Forest Retreat',
    colors: ['#4b6043', '#7b8b6f', '#9daf92', '#d1e2c4', '#32473e']
  },
  {
    name: 'Ocean Breeze',
    colors: ['#0077b6', '#90e0ef', '#caf0f8', '#023e8a', '#48cae4']
  },
  {
    name: 'Autumn Ember',
    colors: ['#d7263d', '#ff7f11', '#f1e189', '#d5bf86', '#4a0d67']
  },
  {
    name: 'Candy Floss',
    colors: ['#ffafcc', '#ffcad4', '#bde0fe', '#a2d2ff', '#cdb4db']
  },
  {
    name: 'Midnight Shadows',
    colors: ['#0f0f0f', '#373737', '#525252', '#797979', '#bfbfbf']
  },
  {
    name: 'Earthly Delight',
    colors: ['#6b4226', '#a46360', '#a1887f', '#d7ccc8', '#efebe9']
  },
  {
    name: 'Fresh Citrus',
    colors: ['#ffcb47', '#ffdd94', '#ff8a47', '#ff6f59', '#a23b72']
  },
  {
    name: 'Purple Haze',
    colors: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4']
  },
  {
    name: 'Garden Party',
    colors: ['#9bc995', '#f4e7d4', '#fa7268', '#8ed4d8', '#bfcba8']
  },
  {
    name: 'Steel and Stone',
    colors: ['#5d5c61', '#6b6b70', '#8d8d92', '#b2b2b6', '#d1d1d4']
  },
  {
    name: 'Rustic Harvest',
    colors: ['#606c38', '#283618', '#fefae0', '#dda15e', '#bc6c25']
  },
  {
    name: 'Golden Hour',
    colors: ['#ffcc80', '#ffb74d', '#ffa726', '#ff7043', '#ff5252']
  },
  {
    name: 'Neon Nights',
    colors: ['#ff4d4d', '#ff66b2', '#ffdd57', '#33ccff', '#9900cc']
  },
  {
    name: 'Galactic Glow',
    colors: ['#ff007f', '#ff0099', '#00ffcc', '#00b3ff', '#ffff66']
  },    
];

const BaseColorsExamples: React.FC<Props> = ({ onSelected }) => {
  return (
    <Container>
      {palletes.map((palette, index) => (
        <PaletteExample
          key={index}
          palette={palette}
          onClick={() => onSelected(palletes[index].colors)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
`;

export { BaseColorsExamples };
