interface Shade {
  shade: number;
  hex: string;
}

interface PaletteColor {
  baseColor: string;
  title: string;
  shades: Shade[];
}

interface PaletteData {
  iconPath?: string;
  name: string;
  colors: PaletteColor[];
}

export type { Shade, PaletteColor, PaletteData };
