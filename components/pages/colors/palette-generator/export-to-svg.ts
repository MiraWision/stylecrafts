import { Color } from '@mirawision/colorize';
import { svgTemplate } from './svg-template';
import { PaletteColor } from './types';

const safeColorOperation = (fn: () => string, fallback: string): string => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

const getColorShades = (base: string) => {
  const c = new Color(base);
  return {
    MAIN: safeColorOperation(() => c.get(), base),
    _50:  safeColorOperation(() => c.withBrightness(-5), base),
    50:   safeColorOperation(() => c.withBrightness(5), base),
    _100: safeColorOperation(() => c.withBrightness(-10), base),
    100:  safeColorOperation(() => c.withBrightness(10), base),
    _200: safeColorOperation(() => c.withBrightness(-20), base),
    200:  safeColorOperation(() => c.withBrightness(20), base),
    _300: safeColorOperation(() => c.withBrightness(-30), base),
    300:  safeColorOperation(() => c.withBrightness(30), base),
  };
};

const downloadFile = (filename: string, content: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportToSVG = (selectedColors: PaletteColor[]): void => {
  let svg = svgTemplate;
  let totalHeight = 600;
  let additionalBlocks = '';

  const background = getColorShades(selectedColors[0].baseColor);
  svg = svg
    .replace('{BACKGROUND_MAIN}', background.MAIN)
    .replace('{BACKGROUND__50}', background._50)
    .replace('{BACKGROUND_50}', background[50])
    .replace('{BACKGROUND__100}', background._100)
    .replace('{BACKGROUND_100}', background[100])
    .replace('{BACKGROUND__200}', background._200)
    .replace('{BACKGROUND_200}', background[200])
    .replace('{BACKGROUND__300}', background._300)
    .replace('{BACKGROUND_300}', background[300]);

  const text = getColorShades(selectedColors[1].baseColor);
  svg = svg
    .replace('{TEXT_MAIN}', text.MAIN)
    .replace('{TEXT__50}', text._50)
    .replace('{TEXT_50}', text[50])
    .replace('{TEXT__100}', text._100)
    .replace('{TEXT_100}', text[100])
    .replace('{TEXT__200}', text._200)
    .replace('{TEXT_200}', text[200])
    .replace('{TEXT__300}', text._300)
    .replace('{TEXT_300}', text[300]);

  const primary = getColorShades(selectedColors[2].baseColor);
  svg = svg
    .replace('{PRIMARY_MAIN}', primary.MAIN)
    .replace('{PRIMARY__50}', primary._50)
    .replace('{PRIMARY_50}', primary[50])
    .replace('{PRIMARY__100}', primary._100)
    .replace('{PRIMARY_100}', primary[100])
    .replace('{PRIMARY__200}', primary._200)
    .replace('{PRIMARY_200}', primary[200])
    .replace('{PRIMARY__300}', primary._300)
    .replace('{PRIMARY_300}', primary[300]);

  const accent = getColorShades(selectedColors[3].baseColor);
  svg = svg
    .replace('{ACCENT_MAIN}', accent.MAIN)
    .replace('{ACCENT__50}', accent._50)
    .replace('{ACCENT_50}', accent[50])
    .replace('{ACCENT__100}', accent._100)
    .replace('{ACCENT_100}', accent[100])
    .replace('{ACCENT__200}', accent._200)
    .replace('{ACCENT_200}', accent[200])
    .replace('{ACCENT__300}', accent._300)
    .replace('{ACCENT_300}', accent[300]);

  const extraColors = selectedColors.slice(4);
  if (extraColors.length > 0) {
    const startY = 394.5;
    const blockHeight = 82;

    extraColors.forEach((clr, idx) => {
      const offsetY = startY + idx * blockHeight;
      const shades = getColorShades(clr.baseColor);

      // 9 прямоугольников
      additionalBlocks += `
        <!-- MAIN -->
        <rect x="8.5" y="${offsetY}" width="23" height="51" rx="3.5" 
              fill="${shades.MAIN}" stroke="#EFEFEF"/>

        <!-- -50 -->
        <rect x="36.5" y="${offsetY}" width="23" height="23" rx="3.5" 
              fill="${shades._50}" stroke="#EFEFEF"/>
        <!-- +50 -->
        <rect x="36.5" y="${offsetY + 28}" width="23" height="23" rx="3.5" 
              fill="${shades[50]}" stroke="#EFEFEF"/>

        <!-- -100 -->
        <rect x="64.5" y="${offsetY}" width="23" height="23" rx="3.5" 
              fill="${shades._100}" stroke="#EFEFEF"/>
        <!-- +100 -->
        <rect x="64.5" y="${offsetY + 28}" width="23" height="23" rx="3.5" 
              fill="${shades[100]}" stroke="#EFEFEF"/>

        <!-- -200 -->
        <rect x="92.5" y="${offsetY}" width="23" height="23" rx="3.5" 
              fill="${shades._200}" stroke="#EFEFEF"/>
        <!-- +200 -->
        <rect x="92.5" y="${offsetY + 28}" width="23" height="23" rx="3.5" 
              fill="${shades[200]}" stroke="#EFEFEF"/>

        <!-- -300 -->
        <rect x="120.5" y="${offsetY}" width="23" height="23" rx="3.5" 
              fill="${shades._300}" stroke="#EFEFEF"/>
        <!-- +300 -->
        <rect x="120.5" y="${offsetY + 28}" width="23" height="23" rx="3.5" 
              fill="${shades[300]}" stroke="#EFEFEF"/>
      `;
    });

    totalHeight += extraColors.length * blockHeight;
  }

  svg = svg.replace('{ADDITIONAL_BLOCKS}', additionalBlocks);
  svg = svg.replace(/\{TOTAL_HEIGHT\}/g, String(totalHeight));

  downloadFile('palette.svg', svg, 'image/svg+xml');
};
