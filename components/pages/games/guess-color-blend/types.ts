enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Challenge = 'challenge',
}

type LevelType = keyof typeof Level;

interface Difficulty {
  colorsCount: [number, number];
  dropsCount: [number, number];
}

interface AvailableColor {
  name: string;
  hex: string;
}

interface SelectedColor {
  color: string;
  weight: number;
}

export { Level };

export type { LevelType, Difficulty, AvailableColor, SelectedColor };
