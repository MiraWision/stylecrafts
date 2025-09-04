import { ChallengeDifficulty } from './data';
import { Difficulty } from './types';
import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { int } from '@mirawision/imagine/number';

const getRandomNumber = (min: number, max: number) => {
  return int(min, max);
};

const getRandomColor = (colors: string[], difficulty: Difficulty): { color: string, dropsCount: number } => {
  const { basicColorsCount, shadeColorsCount, dropsCount } = difficulty;

  const randomColors = [
    ...(colors.slice(0, 3).sort(() => Math.random() - 0.5).slice(0, getRandomNumber(...basicColorsCount))),
    ...(colors.slice(3).sort(() => Math.random() - 0.5).slice(0, getRandomNumber(...shadeColorsCount))),
  ];

  const drops: Record<string, number> = {};

  const count = getRandomNumber(...dropsCount);

  for (let i = 0; i < count; i++) {
    const color = randomColors[getRandomNumber(0, randomColors.length - 1)];

    if (drops[color]) {
      drops[color]++;
    } else {
      drops[color] = 1;
    }
  }

  return {
    color: rybslColorsMixing(Object.entries(drops).map(([color, weight]) => ({ color, weight }))),
    dropsCount: count,
  };
};

const getDifficulty = (score: number): Difficulty => {
  const { from, to, ...difficulty } = ChallengeDifficulty.find((difficulty) => score >= difficulty.from && score < difficulty.to)!;

  return difficulty;
};

export {
  getRandomColor,
  getDifficulty,
};
