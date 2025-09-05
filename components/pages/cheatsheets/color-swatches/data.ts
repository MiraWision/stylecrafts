// Utility function to convert hex to HSL
const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
};

// Function to calculate distance from 50% for saturation and lightness
const getDistanceFrom50 = (s: number, l: number): number => {
  const sDistance = Math.abs(s - 50);
  const lDistance = Math.abs(l - 50);
  return sDistance + lDistance;
};

// Function to sort colors by saturation and lightness (closest to 50% first)
const sortColorsBySaturationLightness = (colors: Array<{ title: string; hex: string }>) => {
  return [...colors].sort((a, b) => {
    const hslA = hexToHSL(a.hex);
    const hslB = hexToHSL(b.hex);
    
    const distanceA = getDistanceFrom50(hslA.s, hslA.l);
    const distanceB = getDistanceFrom50(hslB.s, hslB.l);
    
    return distanceA - distanceB;
  });
};

// Special sorting functions for specific color groups
const sortWhiteColors = (colors: Array<{ title: string; hex: string }>) => {
  return [...colors].sort((a, b) => {
    const hslA = hexToHSL(a.hex);
    const hslB = hexToHSL(b.hex);
    
    // Sort by lightness (lighter first)
    return hslB.l - hslA.l;
  });
};

const sortBlackColors = (colors: Array<{ title: string; hex: string }>) => {
  return [...colors].sort((a, b) => {
    const hslA = hexToHSL(a.hex);
    const hslB = hexToHSL(b.hex);
    
    // Sort by lightness (darker first)
    return hslA.l - hslB.l;
  });
};

const sortGrayColors = (colors: Array<{ title: string; hex: string }>) => {
  return [...colors].sort((a, b) => {
    const hslA = hexToHSL(a.hex);
    const hslB = hexToHSL(b.hex);
    
    // Sort by saturation (greyer colors first - lower saturation)
    return hslA.s - hslB.s;
  });
};

const colorPalettes = [
  {
    groupName: 'Red',
    usage: 'Primary',
    colors: sortColorsBySaturationLightness([
      { title: 'Crimson', hex: '#FF0000' },
      { title: 'Firebrick', hex: '#E60000' },
      { title: 'Ruby Red', hex: '#CC0000' },
      { title: 'Garnet', hex: '#B30000' },
      { title: 'Maroon', hex: '#990000' },
      { title: 'Burgundy', hex: '#800000' },
      { title: 'Cherry', hex: '#FF1A1A' },
      { title: 'Flame', hex: '#FF3333' },
      { title: 'Tomato', hex: '#FF4C4C' },
      { title: 'Coral', hex: '#FF6666' },
      { title: 'Salmon', hex: '#FF7F7F' },
      { title: 'Rosy Red', hex: '#FF9999' },
      { title: 'Carnation', hex: '#FFB2B2' },
      { title: 'Light Coral', hex: '#FFC4C4' },
      { title: 'Blush', hex: '#FFD6D6' },
      { title: 'Misty', hex: '#FFEBEB' },
      { title: 'Pastel Red', hex: '#FFCCCC' },
      { title: 'Indian Red', hex: '#CD5C5C' },
      { title: 'Dark Red', hex: '#8B0000' },
      { title: 'Scarlet', hex: '#FF2400' },
    ]),
  },
  {
    groupName: 'Pink',
    usage: 'Accent',
    colors: sortColorsBySaturationLightness([
      { title: 'Pink', hex: '#FFC0CB' },
      { title: 'Light Pink', hex: '#FFB6C1' },
      { title: 'Hot Pink', hex: '#FF69B4' },
      { title: 'Deep Pink', hex: '#FF1493' },
      { title: 'Pale Violet Red', hex: '#DB7093' },
      { title: 'Blush Pink', hex: '#FF87A2' },
      { title: 'Raspberry Pink', hex: '#FF5C8D' },
      { title: 'Baby Pink', hex: '#F4C2C2' },
      { title: 'Neon Pink', hex: '#FF6FFF' },
      { title: 'Candy Pink', hex: '#FFB3DE' },
      { title: 'Watermelon', hex: '#FF85A1' },
      { title: 'Bubblegum', hex: '#FF99CC' },
      { title: 'Fuchsia', hex: '#FF66B2' },
      { title: 'Cotton Candy', hex: '#FF7FBA' },
      { title: 'Powder Pink', hex: '#FF9FCF' },
      { title: 'Ballet Pink', hex: '#FFB6D5' },
      { title: 'Peach Pink', hex: '#FFCCD9' },
      { title: 'Misty Pink', hex: '#FFE4E1' },
      { title: 'Soft Pink', hex: '#FFDAE9' },
      { title: 'Rose Pink', hex: '#FFB7C5' },
    ]),
  },
  {
    groupName: 'Yellow',
    usage: 'Accent',
    colors: sortColorsBySaturationLightness([
      { title: 'Yellow', hex: '#FFFF00' },
      { title: 'Canary Yellow', hex: '#FFFF33' },
      { title: 'Lemon Yellow', hex: '#FFFF66' },
      { title: 'Light Yellow', hex: '#FFFF99' },
      { title: 'Mellow Yellow', hex: '#FFFFB2' },
      { title: 'Cream Yellow', hex: '#FFFFCC' },
      { title: 'Pale Yellow', hex: '#FFFFE0' },
      { title: 'Ivory Yellow', hex: '#FFFFF0' },
      { title: 'Banana Yellow', hex: '#FFFAE6' },
      { title: 'Cornsilk Yellow', hex: '#FFF8DC' },
      { title: 'Lemon Chiffon', hex: '#FFFACD' },
      { title: 'Light Goldenrod', hex: '#FAFAD2' },
      { title: 'Papaya Whip', hex: '#FFEFD5' },
      { title: 'Gold', hex: '#FFD700' },
      { title: 'Sunshine Yellow', hex: '#FFEA00' },
      { title: 'Saffron', hex: '#FFC300' },
      { title: 'Buttercup', hex: '#FFDD00' },
      { title: 'Dandelion', hex: '#FFEE00' },
      { title: 'Flaxen', hex: '#FFEB00' },
      { title: 'Golden Yellow', hex: '#FFD700' },
    ]),
  },
  {
    groupName: 'Orange',
    usage: 'Primary',
    colors: sortColorsBySaturationLightness([
      { title: 'Orange', hex: '#FFA500' },
      { title: 'Dark Orange', hex: '#FF8C00' },
      { title: 'Pumpkin', hex: '#FF7F00' },
      { title: 'Tiger Orange', hex: '#FF6700' },
      { title: 'Orange Red', hex: '#FF4500' },
      { title: 'Tomato Orange', hex: '#FF6347' },
      { title: 'Coral Orange', hex: '#FF8243' },
      { title: 'Light Salmon', hex: '#FFA07A' },
      { title: 'Apricot', hex: '#FFB07C' },
      { title: 'Peach', hex: '#FFC7A1' },
      { title: 'Light Peach', hex: '#FFDAB9' },
      { title: 'Moccasin Orange', hex: '#FFE4B5' },
      { title: 'Goldenrod', hex: '#FFD700' },
      { title: 'Tangerine', hex: '#FFBA00' },
      { title: 'Honey', hex: '#FFB347' },
      { title: 'Bisque Orange', hex: '#FFCC99' },
      { title: 'Blanched Almond', hex: '#FFE5B4' },
      { title: 'Desert Sand', hex: '#FFEB99' },
      { title: 'Papaya', hex: '#FFF0D4' },
      { title: 'Sandy Orange', hex: '#F4A460' },
    ]),
  },
  {
    groupName: 'Green',
    usage: 'Primary',
    colors: sortColorsBySaturationLightness([
      { title: 'Lime', hex: '#00FF00' },
      { title: 'Lime Green', hex: '#32CD32' },
      { title: 'Forest Green', hex: '#228B22' },
      { title: 'Green', hex: '#008000' },
      { title: 'Dark Green', hex: '#006400' },
      { title: 'Medium Aquamarine', hex: '#66CDAA' },
      { title: 'Dark Sea Green', hex: '#8FBC8F' },
      { title: 'Light Sea Green', hex: '#20B2AA' },
      { title: 'Medium Spring Green', hex: '#00FA9A' },
      { title: 'Pale Green', hex: '#98FB98' },
      { title: 'Chartreuse', hex: '#7FFF00' },
      { title: 'Lawn Green', hex: '#7CFC00' },
      { title: 'Green Yellow', hex: '#ADFF2F' },
      { title: 'Spring Green', hex: '#00FF7F' },
      { title: 'Medium Sea Green', hex: '#3CB371' },
      { title: 'Sea Green', hex: '#2E8B57' },
      { title: 'Olive Green', hex: '#6B8E23' },
      { title: 'Dark Olive Green', hex: '#556B2F' },
      { title: 'Olive Drab', hex: '#6B8E23' },
      { title: 'Olive', hex: '#808000' },
    ]),
  },
  {
    groupName: 'Blue',
    usage: 'Primary',
    colors: sortColorsBySaturationLightness([
      { title: 'Blue', hex: '#0000FF' },
      { title: 'Medium Blue', hex: '#0000CD' },
      { title: 'Dark Blue', hex: '#00008B' },
      { title: 'Navy', hex: '#000080' },
      { title: 'Dodger Blue', hex: '#1E90FF' },
      { title: 'Cornflower Blue', hex: '#6495ED' },
      { title: 'Steel Blue', hex: '#4682B4' },
      { title: 'Royal Blue', hex: '#4169E1' },
      { title: 'Deep Sky Blue', hex: '#00BFFF' },
      { title: 'Sky Blue', hex: '#87CEEB' },
      { title: 'Light Sky Blue', hex: '#87CEFA' },
      { title: 'Light Blue', hex: '#ADD8E6' },
      { title: 'Powder Blue', hex: '#B0E0E6' },
      { title: 'Cadet Blue', hex: '#5F9EA0' },
      { title: 'Medium Turquoise', hex: '#48D1CC' },
      { title: 'Dark Turquoise', hex: '#00CED1' },
      { title: 'Turquoise', hex: '#40E0D0' },
      { title: 'Pale Turquoise', hex: '#AFEEEE' },
      { title: 'Light Cyan', hex: '#E0FFFF' },
      { title: 'Light Steel Blue', hex: '#B0C4DE' },
    ]),
  },
  {
    groupName: 'Purple',
    usage: 'Accent',
    colors: sortColorsBySaturationLightness([
      { title: 'Purple', hex: '#800080' },
      { title: 'Blue Violet', hex: '#8A2BE2' },
      { title: 'Dark Violet', hex: '#9400D3' },
      { title: 'Dark Orchid', hex: '#9932CC' },
      { title: 'Medium Orchid', hex: '#BA55D3' },
      { title: 'Thistle', hex: '#D8BFD8' },
      { title: 'Plum', hex: '#DDA0DD' },
      { title: 'Violet', hex: '#EE82EE' },
      { title: 'Orchid', hex: '#DA70D6' },
      { title: 'Magenta', hex: '#FF00FF' },
      { title: 'Fuchsia Purple', hex: '#FF00CC' },
      { title: 'Medium Violet Red', hex: '#C71585' },
      { title: 'Pale Violet Red', hex: '#DB7093' },
      { title: 'Lavender', hex: '#E6E6FA' },
      { title: 'Hot Pink Purple', hex: '#FF69B4' },
      { title: 'Deep Pink Purple', hex: '#FF1493' },
      { title: 'Medium Purple', hex: '#9370DB' },
      { title: 'Slate Blue', hex: '#6A5ACD' },
      { title: 'Dark Slate Blue', hex: '#483D8B' },
      { title: 'Medium Slate Blue', hex: '#7B68EE' },
    ]),
  },
  {
    groupName: 'Brown',
    usage: 'Background',
    colors: sortColorsBySaturationLightness([
      { title: 'Brown', hex: '#A52A2A' },
      { title: 'Saddle Brown', hex: '#8B4513' },
      { title: 'Sienna', hex: '#A0522D' },
      { title: 'Chocolate', hex: '#D2691E' },
      { title: 'Peru', hex: '#CD853F' },
      { title: 'Sandy Brown', hex: '#F4A460' },
      { title: 'Burly Wood', hex: '#DEB887' },
      { title: 'Tan', hex: '#D2B48C' },
      { title: 'Rosy Brown', hex: '#BC8F8F' },
      { title: 'Blanched Almond Brown', hex: '#FFEBCD' },
      { title: 'Bisque Brown', hex: '#FFE4C4' },
      { title: 'Navajo White', hex: '#FFDEAD' },
      { title: 'Peach Puff', hex: '#FFDAB9' },
      { title: 'Pale Goldenrod', hex: '#EEE8AA' },
      { title: 'Wheat', hex: '#F5DEB3' },
      { title: 'Moccasin Brown', hex: '#FFE4B5' },
      { title: 'Seashell Brown', hex: '#FFF5EE' },
      { title: 'Linen Brown', hex: '#FAF0E6' },
      { title: 'Cornsilk Brown', hex: '#FFF8DC' },
      { title: 'Old Lace Brown', hex: '#FDF5E6' },
    ]),
  },
  {
    groupName: 'White',
    usage: 'Background',
    colors: sortWhiteColors([
      { title: 'White', hex: '#FFFFFF' },
      { title: 'Alice Blue', hex: '#F0F8FF' },
      { title: 'Antique White', hex: '#FAEBD7' },
      { title: 'Beige', hex: '#F5F5DC' },
      { title: 'Bisque White', hex: '#FFE4C4' },
      { title: 'Cornsilk White', hex: '#FFF8DC' },
      { title: 'Honeydew', hex: '#F0FFF0' },
      { title: 'Lavender Blush', hex: '#FFF0F5' },
      { title: 'Mint Cream', hex: '#F5FFFA' },
      { title: 'Old Lace White', hex: '#FDF5E6' },
      { title: 'Seashell White', hex: '#FFF5EE' },
      { title: 'Ivory', hex: '#FFFFF0' },
      { title: 'Linen White', hex: '#FAF0E6' },
      { title: 'Floral White', hex: '#FFFAF0' },
      { title: 'Snow', hex: '#FFFAFA' },
    ]),
  },
  {
    groupName: 'Gray',
    usage: 'Text',
    colors: sortGrayColors([
      { title: 'Gray', hex: '#808080' },
      { title: 'Dark Gray', hex: '#A9A9A9' },
      { title: 'Silver', hex: '#C0C0C0' },
      { title: 'Light Gray', hex: '#D3D3D3' },
      { title: 'Gainsboro', hex: '#DCDCDC' },
      { title: 'White Smoke', hex: '#F5F5F5' },
      { title: 'Dark Slate Gray', hex: '#2F4F4F' },
      { title: 'Dim Gray', hex: '#696969' },
      { title: 'Light Slate Gray', hex: '#778899' },
      { title: 'Slate Gray', hex: '#708090' },
      { title: 'Gray Web', hex: '#BEBEBE' },
      { title: 'Gray X11', hex: '#DCDCDC' },
      { title: 'Light Grey', hex: '#D3D3D3' },
      { title: 'Dark Grey', hex: '#A9A9A9' },
      { title: 'Dim Grey', hex: '#696969' },
    ]),
  },
  {
    groupName: 'Black',
    usage: 'Text',
    colors: sortBlackColors([
      { title: 'Black', hex: '#000000' },
      { title: 'Jet Black', hex: '#0C0C0C' },
      { title: 'Charcoal', hex: '#181818' },
      { title: 'Onyx', hex: '#2C2C2C' },
      { title: 'Dark Charcoal', hex: '#363636' },
      { title: 'Dim Gray', hex: '#404040' },
      { title: 'Dark Slate Gray', hex: '#4D4D4D' },
      { title: 'Granite', hex: '#5A5A5A' },
      { title: 'Slate Gray', hex: '#666666' },
      { title: 'Ash Gray', hex: '#737373' },
      { title: 'Light Charcoal', hex: '#8D8D8D' },
      { title: 'Light Slate Gray', hex: '#9A9A9A' },
      { title: 'Pale Gray', hex: '#A6A6A6' },
      { title: 'Smoke Black', hex: '#B3B3B3' },
      { title: 'Light Gray', hex: '#BFBFBF' },
    ]),
  },
];

export { colorPalettes };
