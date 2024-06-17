import { AvailableColor, Difficulty, Level } from './types';

const LevelOptions = [
  { value: Level.Easy, label: 'Easy' },
  { value: Level.Medium, label: 'Medium' },
  { value: Level.Hard, label: 'Hard' },
  { value: Level.Challenge, label: 'Challenge' },
];

const AvailableColors: AvailableColor[] = [
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Green', hex: '#00ff00' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
];

const LevelDifficulty: Partial<Record<Level, Difficulty>> = {
  [Level.Easy]: { colorsCount: [2, 3], dropsCount: [3, 4] },
  [Level.Medium]: { colorsCount: [4, 6], dropsCount: [5, 8] },
  [Level.Hard]: { colorsCount: [7, 8], dropsCount: [9, 12] },
};

const ChallengeDifficulty: (Difficulty & { from: number, to: number})[] = [
  { from: 0, to: 15, colorsCount: [2, 2], dropsCount: [3, 4] },
  { from: 15, to: 35, colorsCount: [3, 3], dropsCount: [4, 5] },
  { from: 25, to: 50, colorsCount: [4, 4], dropsCount: [5, 6] },
  { from: 50, to: 80, colorsCount: [5, 5], dropsCount: [6, 7] },
  { from: 80, to: 115, colorsCount: [6, 6], dropsCount: [7, 8] },
  { from: 115, to: 155, colorsCount: [7, 7], dropsCount: [8, 9] },
  { from: 155, to: 200, colorsCount: [8, 8], dropsCount: [9, 10] },
  { from: 200, to: Infinity, colorsCount: [8, 8], dropsCount: [10, 12] },
];

export { 
  LevelOptions, 
  AvailableColors,
  LevelDifficulty,
  ChallengeDifficulty,
};
