const calculateContrast = (color1: string, color2: string) => {
  const luminance = (color: string) => {
    let r = parseInt(color.slice(1, 3), 16) / 255;
    let g = parseInt(color.slice(3, 5), 16) / 255;
    let b = parseInt(color.slice(5, 7), 16) / 255;

    r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
    g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
    b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const luminance1 = luminance(color1);
  const luminance2 = luminance(color2);
  const l1 = Math.max(luminance1, luminance2);
  const l2 = Math.min(luminance1, luminance2);
  const contrast = (l1 + 0.05) / (l2 + 0.05);

  return {
    contrast,
    isSuitableForAA: contrast >= 4.5,
    isSuitableForAAA: contrast >= 7.0,
  };
};

export { calculateContrast };