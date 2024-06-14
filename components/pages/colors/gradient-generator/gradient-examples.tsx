import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { generateMultiSteppedGradient } from '@mirawision/colorize/generate-multi-stepped-gradient';

import { PaletteExample, Palette } from '../palette-example';

interface Gradient {
  name: string;
  colors: [string, ...Array<number | string>];
}

interface Props {
  onSelected: (gradient: Gradient['colors']) => void;
}

const GradientExamples: Gradient[] = [
  {
    name: 'Ice and Fire',
    colors: ['#3b4cc0', 3, '#ffffff', 3, '#b40426'],
  },
  {
    name: 'Vibrant Earth',
    colors: ['#009244', 3, '#feffb3', 3, '#e90012'],
  },
  {
    name: 'Autumn Leaves',
    colors: ['#6e2000', 3, '#e75000', 3, '#fff7b9'],
  },
  {
    name: 'Blue Sky',
    colors: ['#08306b', 7, '#f7fbff'],
  },
  {
    name: 'Deep Ocean',
    colors: ['#000428', 3, '#004e92', 3, '#005792'],
  },
  {
    name: 'Sunny Day',
    colors: ['#ffcc00', 3, '#ffffff', 3, '#ff6600'],
  },
  {
    name: 'Twilight Mist',
    colors: ['#544a7d', 3, '#ffd452', 3, '#d38312']
  },
  {
    name: 'Tropical Sunset',
    colors: ['#f12711', 3, '#f5af19', 3, '#ffcc33']
  },
  {
    name: 'Mystic Forest',
    colors: ['#004d00', 3, '#00cc00', 3, '#99ff99']
  },
  {
    name: 'Aurora Borealis',
    colors: ['#0f2027', 3, '#203a43', 3, '#2c5364']
  },
  {
    name: 'Desert Dawn',
    colors: ['#ff9a9e', 3, '#fad0c4', 3, '#fad390']
  },
  {
    name: 'Celestial Wave',
    colors: ['#1c92d2', 3, '#f2fcfe', 3, '#1d2671']
  },
  {
    name: 'Harvest Moon',
    colors: ['#ff4e50', 3, '#fc913a', 3, '#ffce00']
  },
  {
    name: 'Frozen Glacier',
    colors: ['#d7e1ec', 3, '#89b4d6', 3, '#0f4c75']
  },
  {
    name: 'Serene Lagoon',
    colors: ['#43cea2', 3, '#185a9d', 3, '#2b5876']
  },
  {
    name: 'Crimson Dawn',
    colors: ['#ff6f61', 3, '#d72638', 3, '#3a1c71']
  },
];

const GradientExamplesList: React.FC<Props> = ({ onSelected }) => {
  const palettes: Palette[] = useMemo(() => {
    return GradientExamples.map((example) => ({
      name: example.name,
      colors: generateMultiSteppedGradient(...example.colors),
    }));
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * GradientExamples.length);

    onSelected(GradientExamples[randomIndex].colors);
  }, []);

  return (
    <Container>
      {palettes.map((palette, index) => (
        <PaletteExample
          key={index}
          palette={palette}
          onClick={() => onSelected(GradientExamples[index].colors)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

export { GradientExamplesList };

export type { Gradient };
