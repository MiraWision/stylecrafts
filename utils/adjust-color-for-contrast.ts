import { Color, calculateContrast } from '@mirawision/colorize';

/**
 * Корректирует яркость цвета для достижения желаемого коэффициента контрастности с другим цветом.
 *
 * @param {string} colorHex - Цвет, который нужно корректировать (в формате HEX).
 * @param {string} oppositeColorHex - Цвет, с которым нужно достичь контраста (в формате HEX).
 * @param {number} targetContrast - Желаемый коэффициент контрастности (по умолчанию 7 для соответствия WCAG AAA).
 * @returns {string} - Скорректированный цвет в формате HEX.
 */
export const adjustColorForContrast = (
  colorHex: string,
  oppositeColorHex: string,
  targetContrast: number = 7
): string => {
  let color = new Color(colorHex);
  const oppositeColor = new Color(oppositeColorHex);

  let contrast = calculateContrast(color, oppositeColor);

  if (contrast >= targetContrast) {
    return color.hex();
  }

  const maxIterations = 20;
  const adjustmentStep = 5;
  let iterations = 0;

  const directions = [adjustmentStep, -adjustmentStep];
  for (const step of directions) {
    let tempColor = new Color(color.hex());
    iterations = 0;
    contrast = calculateContrast(tempColor, oppositeColor);

    while (contrast < targetContrast && iterations < maxIterations) {
      const adjustedColorHex = tempColor.withBrightness(step);
      tempColor = new Color(adjustedColorHex);

      contrast = calculateContrast(tempColor, oppositeColor);
      iterations++;
    }

    if (contrast >= targetContrast) {
      return tempColor.hex();
    }
  }

  return color.hex();
};
