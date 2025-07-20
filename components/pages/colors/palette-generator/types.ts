interface Shade {
  shade: number;
  hex: string;
}

interface PaletteColor {
  baseColor: string;
  title: string;
  shades: Shade[];
}

export type { Shade, PaletteColor };
