import { ColorFormat, getLuminance } from '@mirawision/colorize';

export type ConvertedColors = {
  [key in ColorFormat]?: string;
};

const availableColors = [
  { name: 'Yellow', hex: '#ffed00' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Magenta', hex: '#ff00ab' },
  { name: 'Blue', hex: '#0047ab' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Green', hex: '#00b500' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
];

const difficultyLevels = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

const getRandomColors = (count: number) => {
  const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomColorFromSelection = (colors: { hex: string }[]) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex].hex;
};

const getRandomDrops = (colors: { hex: string }[], count: number) => {
  const drops = [];
  for (let i = 0; i < count; i++) {
    drops.push(getRandomColorFromSelection(colors));
  }
  return drops;
};

const blendColorsWithWeights = (colorsWithWeights: { color: string; weight: number }[]) => {
  const totalWeight = colorsWithWeights.reduce((sum, c) => sum + c.weight, 0);
  const r = Math.round(
    colorsWithWeights.reduce((sum, c) => sum + parseInt(c.color.slice(1, 3), 16) * c.weight, 0) / totalWeight
  );
  const g = Math.round(
    colorsWithWeights.reduce((sum, c) => sum + parseInt(c.color.slice(3, 5), 16) * c.weight, 0) / totalWeight
  );
  const b = Math.round(
    colorsWithWeights.reduce((sum, c) => sum + parseInt(c.color.slice(5, 7), 16) * c.weight, 0) / totalWeight
  );

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const isInvalidColor = (color: string) => {
  const invalidColors = ['#000000', '#ffffff'];
  return invalidColors.includes(color.toLowerCase());
};

const calculateColorDistance = (color1: string, color2: string) => {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
};

const calculateMinDrops = (colors: { color: string; weight: number }[], targetColor: string): number => {
  let currentColor = '#000000'; // Start with black
  let drops = 0;

  while (calculateColorDistance(currentColor, targetColor) > 10 && drops < 100) {
    let bestColor = '';
    let bestDistance = Infinity;

    for (let color of colors) {
      const blendedColor = blendColorsWithWeights([
        { color: currentColor, weight: drops },
        { color: color.color, weight: 1 },
      ]);
      const distance = calculateColorDistance(blendedColor, targetColor);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestColor = color.color;
      }
    }

    currentColor = blendColorsWithWeights([
      { color: currentColor, weight: drops },
      { color: bestColor, weight: 1 },
    ]);
    drops++;
  }

  return drops;
};

const resetGame = (difficulty: string, setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setTimerKey: Function, setMessage: Function, setInitialDropsCount: Function) => {
  let colorCount;
  let dropCount;

  switch (difficulty) {
    case 'Easy':
      colorCount = Math.floor(Math.random() * 2) + 2; // 2-3 colors
      dropCount = Math.floor(Math.random() * 2) + 3; // 3-4 drops
      break;
    case 'Medium':
      colorCount = Math.floor(Math.random() * 3) + 4; // 4-6 colors
      dropCount = Math.floor(Math.random() * 4) + 5; // 5-8 drops
      break;
    case 'Hard':
      colorCount = Math.floor(Math.random() * 2) + 7; // 7-8 colors
      dropCount = Math.floor(Math.random() * 4) + 9; // 9-12 drops
      break;
    default:
      colorCount = 3;
      dropCount = 4;
      break;
  }

  let blendedTargetColor;
  let randomDrops;
  const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

  do {
    randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
    blendedTargetColor = blendColorsWithWeights(
      randomDrops.map((color) => ({ color, weight: 1 }))
    );
  } while (isInvalidColor(blendedTargetColor));

  setSelectedColors(initialColors);
  setTargetColor(blendedTargetColor);
  setCurrentColor('');
  setConvertedColors({});
  setTimerKey((prevKey: number) => prevKey + 1);
  setMessage(null);
  setInitialDropsCount(dropCount);
};

const resetChallenge = (setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setTimerKey: Function, setMessage: Function, setScore: Function, setTimerDuration: Function, setInitialDropsCount: Function) => {
  let colorCount = 2;
  let dropCount = 3 + Math.floor(Math.random() * 2); // 3-4 drops

  let blendedTargetColor;
  let randomDrops;
  const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

  do {
    randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
    blendedTargetColor = blendColorsWithWeights(
      randomDrops.map((color) => ({ color, weight: 1 }))
    );
  } while (isInvalidColor(blendedTargetColor));

  setSelectedColors(initialColors);
  setTargetColor(blendedTargetColor);
  setCurrentColor('');
  setConvertedColors({});
  setTimerKey((prevKey: number) => prevKey + 1);
  setMessage(null);
  setScore(0);
  setTimerDuration(60);
  setInitialDropsCount(dropCount);
};

const increaseDifficulty = (score: number, setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setInitialDropsCount: Function) => {
  let colorCount;
  let dropCount;

  if (score < 10) {
    colorCount = 2;
    dropCount = 3;
  } else if (score < 20) {
    colorCount = 3;
    dropCount = 4;
  } else if (score < 30) {
    colorCount = 4;
    dropCount = 5;
  } else if (score < 40) {
    colorCount = 5;
    dropCount = 6;
  } else if (score < 50) {
    colorCount = 6;
    dropCount = 7;
  } else {
    colorCount = 7;
    dropCount = 8;
  }

  let blendedTargetColor;
  let randomDrops;
  const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

  do {
    randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
    blendedTargetColor = blendColorsWithWeights(
      randomDrops.map((color) => ({ color, weight: 1 }))
    );
  } while (isInvalidColor(blendedTargetColor));

  setSelectedColors(initialColors);
  setTargetColor(blendedTargetColor);
  setCurrentColor('');
  setConvertedColors({});
  setInitialDropsCount(dropCount);
};

const calculateSimilarity = (color1: string, color2: string) => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  return 100 - Math.abs(luminance1 - luminance2) * 100;
};

export {
  availableColors,
  difficultyLevels,
  getRandomColors,
  getRandomColorFromSelection,
  getRandomDrops,
  calculateMinDrops,
  calculateSimilarity,
  resetGame,
  resetChallenge,
  increaseDifficulty
};