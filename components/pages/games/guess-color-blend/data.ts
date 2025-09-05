import { PaletteColor, Difficulty } from './types';

const PaletteColors: PaletteColor[] = [
  { name: 'Red', hex: '#e63946' },
  { name: 'Yellow', hex: '#ffbf00' },
  { name: 'Blue', hex: '#457b9d' },
  { name: 'White', hex: '#fafafa' },
  { name: 'Grey', hex: '#a9a9a9' },
  { name: 'Black', hex: '#1b1b1b' },
];

const ChallengeDifficulty: (Difficulty & { from: number, to: number})[] = [
  { 
    from: 0,
    to: 10,
    basicColorsCount: [1, 2],
    shadeColorsCount: [1, 1],
    dropsCount: [2, 2],
  },
  { 
    from: 10,
    to: 20,
    basicColorsCount: [1, 2],
    shadeColorsCount: [1, 1],
    dropsCount: [2, 3],
  },
  {
    from: 20,
    to: 35,
    basicColorsCount: [2, 2],
    shadeColorsCount: [1, 2],
    dropsCount: [3, 4],
  },
  {
    from: 35,
    to: 55,
    basicColorsCount: [2, 2],
    shadeColorsCount: [1, 2],
    dropsCount: [4, 5],
  },
  {
    from: 55,
    to: 80,
    basicColorsCount: [2, 2],
    shadeColorsCount: [2, 2],
    dropsCount: [5, 6],
  },
  {
    from: 80,
    to: 110,
    basicColorsCount: [2, 2],
    shadeColorsCount: [2, 2],
    dropsCount: [6, 7],
  },
  {
    from: 110,
    to: 145,
    basicColorsCount: [2, 2],
    shadeColorsCount: [2, 3],
    dropsCount: [7, 8],
  },
  { 
    from: 145,
    to: Infinity,
    basicColorsCount: [2, 3],
    shadeColorsCount: [2, 3],
    dropsCount: [8, 10],
  },
];

export { 
  PaletteColors,
  ChallengeDifficulty,
};
