import { Color, calculateContrast } from '@mirawision/colorize';

export const adjustColorForContrast = (
  textColorHex: string,
  bgColorHex: string,
  targetContrast: number = 7,
  currentContrast?: number
): { textColor: string; bgColor: string; newTarget: number } => {
  let textColor = new Color(textColorHex);
  let bgColor = new Color(bgColorHex);

  let contrast = calculateContrast(textColor, bgColor);
  
  // If no current contrast provided, use the calculated one
  if (currentContrast === undefined) {
    currentContrast = contrast;
  }

  // If we're already at or above the target, increment the target by 2 and try to improve
  if (contrast >= targetContrast) {
    // Don't improve beyond 21:1 contrast ratio
    if (targetContrast >= 21) {
      return { textColor: textColor.hex(), bgColor: bgColor.hex(), newTarget: targetContrast };
    }
    
    const newTarget = targetContrast + 1;
    
    // Try to improve to the new target
    const maxIterations = 100;
    let iterations = 0;
    let improvedTextColor = textColor;
    let improvedBgColor = bgColor;
    let improvedContrast = contrast;

    while (improvedContrast < newTarget && iterations < maxIterations) {
      // Determine which color is lighter and which is darker
      const textLuminance = improvedTextColor.luminance();
      const bgLuminance = improvedBgColor.luminance();
      
      const isTextLighter = textLuminance > bgLuminance;
      let lighterColor = isTextLighter ? improvedTextColor : improvedBgColor;
      let darkerColor = isTextLighter ? improvedBgColor : improvedTextColor;

      // Calculate how close each color is to its edge
      const lighterDistanceFromEdge = 1.0 - lighterColor.luminance();
      const darkerDistanceFromEdge = darkerColor.luminance();

      // Calculate total distance to determine step size weights
      const totalDistance = lighterDistanceFromEdge + darkerDistanceFromEdge;
      
      // Weighted step sizes - color further from edge moves faster
      const lighterStepWeight = darkerDistanceFromEdge / totalDistance;
      const darkerStepWeight = lighterDistanceFromEdge / totalDistance;

      // Calculate step sizes based on weights
      const baseStep = 2;
      let lighterStep = Math.round(baseStep * lighterStepWeight);
      let darkerStep = Math.round(baseStep * darkerStepWeight);

      // Ensure minimum step sizes to prevent getting stuck
      lighterStep = Math.max(lighterStep, 1);
      darkerStep = Math.max(darkerStep, 1);

      // Move lighter color towards white (increase brightness)
      let newLighterColor: Color;
      try {
        newLighterColor = new Color(lighterColor.withBrightness(lighterStep));
      } catch {
        newLighterColor = new Color(lighterColor.withBrightness(1));
      }

      // Move darker color towards black (decrease brightness)
      let newDarkerColor: Color;
      try {
        newDarkerColor = new Color(darkerColor.withBrightness(-darkerStep));
      } catch {
        newDarkerColor = new Color(darkerColor.withBrightness(-1));
      }

      // Update the improved color variables
      if (isTextLighter) {
        improvedTextColor = newLighterColor;
        improvedBgColor = newDarkerColor;
      } else {
        improvedBgColor = newLighterColor;
        improvedTextColor = newDarkerColor;
      }

      // Recalculate contrast
      improvedContrast = calculateContrast(improvedTextColor, improvedBgColor);
      iterations++;
    }

    return { 
      textColor: improvedTextColor.hex(), 
      bgColor: improvedBgColor.hex(), 
      newTarget 
    };
  }

  // Original logic for improving from below target
  const maxIterations = 100;
  let iterations = 0;

  while (contrast < targetContrast && iterations < maxIterations) {
    // Determine which color is lighter and which is darker
    const textLuminance = textColor.luminance();
    const bgLuminance = bgColor.luminance();
    
    const isTextLighter = textLuminance > bgLuminance;
    let lighterColor = isTextLighter ? textColor : bgColor;
    let darkerColor = isTextLighter ? bgColor : textColor;

    // Calculate how close each color is to its edge
    const lighterDistanceFromEdge = 1.0 - lighterColor.luminance();
    const darkerDistanceFromEdge = darkerColor.luminance();

    // Calculate total distance to determine step size weights
    const totalDistance = lighterDistanceFromEdge + darkerDistanceFromEdge;
    
    // Weighted step sizes - color further from edge moves faster
    const lighterStepWeight = darkerDistanceFromEdge / totalDistance;
    const darkerStepWeight = lighterDistanceFromEdge / totalDistance;

    // Calculate step sizes based on weights
    const baseStep = 2;
    let lighterStep = Math.round(baseStep * lighterStepWeight);
    let darkerStep = Math.round(baseStep * darkerStepWeight);

    // Ensure minimum step sizes to prevent getting stuck
    lighterStep = Math.max(lighterStep, 1);
    darkerStep = Math.max(darkerStep, 1);

    // Move lighter color towards white (increase brightness)
    let newLighterColor: Color;
    try {
      newLighterColor = new Color(lighterColor.withBrightness(lighterStep));
    } catch {
      newLighterColor = new Color(lighterColor.withBrightness(1));
    }

    // Move darker color towards black (decrease brightness)
    let newDarkerColor: Color;
    try {
      newDarkerColor = new Color(darkerColor.withBrightness(-darkerStep));
    } catch {
      newDarkerColor = new Color(darkerColor.withBrightness(-1));
    }

    // Update the original color variables
    if (isTextLighter) {
      textColor = newLighterColor;
      bgColor = newDarkerColor;
    } else {
      bgColor = newLighterColor;
      textColor = newDarkerColor;
    }

    // Recalculate contrast
    contrast = calculateContrast(textColor, bgColor);
    iterations++;

    // If we're not making progress, try more aggressive steps
    if (iterations > 20 && contrast < targetContrast * 0.5) {
      // Force one color to move more aggressively
      if (isTextLighter) {
        textColor = new Color(textColor.withBrightness(5));
        bgColor = new Color(bgColor.withBrightness(-5));
      } else {
        bgColor = new Color(bgColor.withBrightness(5));
        textColor = new Color(textColor.withBrightness(-5));
      }
      contrast = calculateContrast(textColor, bgColor);
    }
  }

  return { textColor: textColor.hex(), bgColor: bgColor.hex(), newTarget: targetContrast };
};
