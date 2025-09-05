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

export type { Difficulty, PaletteColor, SelectedColor };
