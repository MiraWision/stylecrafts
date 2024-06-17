import { ColorFormat, RGB, blendMultipleColors, convertColor, parseColorNumbers } from '@mirawision/colorize';

import { AvailableColors, LevelDifficulty, ChallengeDifficulty } from './data';
import { Difficulty, Level } from './types';

// TODO add method to colorize library
const calculateSimilarity = (color1: string, color2: string): number => {
  const { r: r1, g: g1, b: b1 } = parseColorNumbers(convertColor(color1, ColorFormat.RGB), ColorFormat.RGB) as RGB;

  const { r: r2, g: g2, b: b2 } = parseColorNumbers(convertColor(color2, ColorFormat.RGB), ColorFormat.RGB) as RGB;  

  const difference = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);

  const maxDifference = Math.sqrt(3 * 255 ** 2);

  return 100 - (difference / maxDifference) * 100;
};

// TODO add method to imagine library
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomAvailableColors = (colorsCount: Difficulty['colorsCount']) => {
  const count = getRandomNumber(...colorsCount);

  return [...AvailableColors].sort(() => 0.5 - Math.random()).slice(0, count);
};

const getRandomColor = (colors: string[], dropsCount: Difficulty['dropsCount']): string => {
  const drops: Record<string, number> = {};

  const count = getRandomNumber(...dropsCount);

  for (let i = 0; i < count; i++) {
    const color = colors[getRandomNumber(0, colors.length - 1)];

    if (drops[color]) {
      drops[color]++;
    } else {
      drops[color] = 1;
    }
  }

  return blendMultipleColors(Object.entries(drops).map(([color, weight]) => ({ color, weight })));
};

const getDifficulty = (level: Level, score: number): Difficulty => {
  if (level === Level.Challenge) {
    const { from, to, ...difficulty } = ChallengeDifficulty.find((difficulty) => score >= difficulty.from && score < difficulty.to)!;

    return difficulty;
  }

  return LevelDifficulty[level]!;
};


export {
  calculateSimilarity,
  getRandomAvailableColors,
  getRandomColor,
  getDifficulty,
};





// const resetGame = (difficulty: string, setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setTimerKey: Function, setMessage: Function, setInitialDropsCount: Function) => {
//   let colorCount;
//   let dropCount;

//   switch (difficulty) {
//     case 'Easy':
//       colorCount = Math.floor(Math.random() * 2) + 2; // 2-3 colors
//       dropCount = Math.floor(Math.random() * 2) + 3; // 3-4 drops
//       break;
//     case 'Medium':
//       colorCount = Math.floor(Math.random() * 3) + 4; // 4-6 colors
//       dropCount = Math.floor(Math.random() * 4) + 5; // 5-8 drops
//       break;
//     case 'Hard':
//       colorCount = Math.floor(Math.random() * 2) + 7; // 7-8 colors
//       dropCount = Math.floor(Math.random() * 4) + 9; // 9-12 drops
//       break;
//     default:
//       colorCount = 3;
//       dropCount = 4;
//       break;
//   }

//   let blendedTargetColor;
//   let randomDrops;
//   const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

//   do {
//     randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
//     blendedTargetColor = blendColorsWithWeights(
//       randomDrops.map((color) => ({ color, weight: 1 }))
//     );
//   } while (isInvalidColor(blendedTargetColor));

//   setSelectedColors(initialColors);
//   setTargetColor(blendedTargetColor);
//   setCurrentColor('');
//   setConvertedColors({});
//   setTimerKey((prevKey: number) => prevKey + 1);
//   setMessage(null);
//   setInitialDropsCount(dropCount);
// };

// const resetChallenge = (setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setTimerKey: Function, setMessage: Function, setScore: Function, setTimerDuration: Function, setInitialDropsCount: Function) => {
//   let colorCount = 2;
//   let dropCount = 3 + Math.floor(Math.random() * 2); // 3-4 drops

//   let blendedTargetColor;
//   let randomDrops;
//   const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

//   do {
//     randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
//     blendedTargetColor = blendColorsWithWeights(
//       randomDrops.map((color) => ({ color, weight: 1 }))
//     );
//   } while (isInvalidColor(blendedTargetColor));

//   setSelectedColors(initialColors);
//   setTargetColor(blendedTargetColor);
//   setCurrentColor('');
//   setConvertedColors({});
//   setTimerKey((prevKey: number) => prevKey + 1);
//   setMessage(null);
//   setScore(0);
//   setTimerDuration(60);
//   setInitialDropsCount(dropCount);
// };

// const increaseDifficulty = (score: number, setSelectedColors: Function, setTargetColor: Function, setCurrentColor: Function, setConvertedColors: Function, setInitialDropsCount: Function) => {
//   let colorCount;
//   let dropCount;

//   if (score < 10) {
//     colorCount = 2;
//     dropCount = 3;
//   } else if (score < 20) {
//     colorCount = 3;
//     dropCount = 4;
//   } else if (score < 30) {
//     colorCount = 4;
//     dropCount = 5;
//   } else if (score < 40) {
//     colorCount = 5;
//     dropCount = 6;
//   } else if (score < 50) {
//     colorCount = 6;
//     dropCount = 7;
//   } else {
//     colorCount = 7;
//     dropCount = 8;
//   }

//   let blendedTargetColor;
//   let randomDrops;
//   const initialColors = getRandomColors(colorCount).map((color) => ({ color: color.hex, weight: 0 }));

//   do {
//     randomDrops = getRandomDrops(initialColors.map((c) => ({ hex: c.color })), dropCount);
//     blendedTargetColor = blendColorsWithWeights(
//       randomDrops.map((color) => ({ color, weight: 1 }))
//     );
//   } while (isInvalidColor(blendedTargetColor));

//   setSelectedColors(initialColors);
//   setTargetColor(blendedTargetColor);
//   setCurrentColor('');
//   setConvertedColors({});
//   setInitialDropsCount(dropCount);
// };
