import { PaletteColor, Difficulty, Level } from './types';

const LevelOptions = [
  { value: Level.Easy, label: 'Easy' },
  { value: Level.Medium, label: 'Medium' },
  { value: Level.Hard, label: 'Hard' },
  { value: Level.Challenge, label: 'Challenge' },
];

const PaletteColors: PaletteColor[] = [
  { name: 'Red', hex: '#e63946' },
  { name: 'Yellow', hex: '#ffbf00' },
  { name: 'Green', hex: '#2a9d8f' },
  { name: 'Blue', hex: '#457b9d' },
  { name: 'White', hex: '#f1faee' },
  { name: 'Black', hex: '#1b1b1e' },
];

const LevelDifficulty: Partial<Record<Level, Difficulty>> = {
  [Level.Easy]: { dropsCount: [2, 3] },
  [Level.Medium]: { dropsCount: [4, 5] },
  [Level.Hard]: { dropsCount: [6, 8] },
};

const ChallengeDifficulty: (Difficulty & { from: number, to: number})[] = [
  { from: 0, to: 10, dropsCount: [2, 3] },
  { from: 10, to: 25, dropsCount: [3, 4] },
  { from: 25, to: 45, dropsCount: [4, 5] },
  { from: 45, to: 70, dropsCount: [5, 6] },
  { from: 70, to: 100, dropsCount: [6, 7] },
  { from: 100, to: 135, dropsCount: [7, 8] },
  { from: 135, to: 175, dropsCount: [8, 9] },
  { from: 175, to: Infinity, dropsCount: [9, 10] },
];

export { 
  LevelOptions, 
  PaletteColors,
  LevelDifficulty,
  ChallengeDifficulty,
};
