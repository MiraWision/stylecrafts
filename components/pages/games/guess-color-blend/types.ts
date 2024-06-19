enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Challenge = 'challenge',
}

type LevelType = keyof typeof Level;

interface Difficulty {
  basicColorsCount: [number, number];
  shadeColorsCount: [number, number];
  dropsCount: [number, number];
}

interface PaletteColor {
  name: string;
  hex: string;
}

interface SelectedColor extends PaletteColor {
  weight: number;
}

export { Level };

export type { LevelType, Difficulty, PaletteColor, SelectedColor };
