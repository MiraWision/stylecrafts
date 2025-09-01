import React, { useMemo } from 'react';
import { Color, convertColor, ColorFormat } from '@mirawision/colorize';
import { ColorDescriptionItem } from './color-description-item';
import styled from 'styled-components';

interface Props {
  color: Color;
}

const calculateTemperature = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues.map(v => v / 255);
  
  // Calculate color temperature using RGB ratios
  // This is a simplified but more reliable approach
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  if (max === 0) return 6500; // Black
  
  const delta = max - min;
  const saturation = max === 0 ? 0 : delta / max;
  
  // Calculate hue-based temperature
  let hue = 0;
  if (delta === 0) {
    hue = 0; // Grayscale
  } else if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  
  hue = hue * 60;
  if (hue < 0) hue += 360;
  
  // Map hue to temperature (warm colors = lower temp, cool colors = higher temp)
  // Red (0°) = ~2000K, Yellow (60°) = ~3000K, Green (120°) = ~5000K, 
  // Cyan (180°) = ~7000K, Blue (240°) = ~10000K, Magenta (300°) = ~8000K
  let temperature;
  if (hue <= 60) {
    // Red to Yellow: 2000K to 3000K
    temperature = 2000 + (hue / 60) * 1000;
  } else if (hue <= 120) {
    // Yellow to Green: 3000K to 5000K
    temperature = 3000 + ((hue - 60) / 60) * 2000;
  } else if (hue <= 180) {
    // Green to Cyan: 5000K to 7000K
    temperature = 5000 + ((hue - 120) / 60) * 2000;
  } else if (hue <= 240) {
    // Cyan to Blue: 7000K to 10000K
    temperature = 7000 + ((hue - 180) / 60) * 3000;
  } else if (hue <= 300) {
    // Blue to Magenta: 10000K to 8000K
    temperature = 10000 - ((hue - 240) / 60) * 2000;
  } else {
    // Magenta to Red: 8000K to 2000K
    temperature = 8000 - ((hue - 300) / 60) * 6000;
  }
  
  // Adjust for saturation (more saturated = more extreme temperature)
  const saturationFactor = 0.5 + (saturation * 0.5);
  temperature = 6500 + (temperature - 6500) * saturationFactor;
  
  return Math.round(Math.max(1000, Math.min(40000, temperature)));
};

const calculateLuminosity = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues.map(v => v / 255);
  return Math.round((0.2126 * r + 0.7152 * g + 0.0722 * b) * 100);
};

const calculateSaturation = (color: Color) => {
  return parseFloat(color.hsl().match(/(\d+(\.\d+)?)/g)?.[1] || '0') / 100;
};

const ColorDescription: React.FC<Props> = ({ color }) => {
  const values = useMemo(() => [
    { label: 'HEX', value: color.hex(), copyable: true },
    { label: 'RGB', value: color.rgb(), copyable: true },
    { label: 'HSL', value: color.hsl(), copyable: true },
  ], [color]);

  const luminosity = useMemo(() => calculateLuminosity(color), [color]);
  const saturation = useMemo(() => calculateSaturation(color), [color]);

  return (
    <Container>
      {values.map(({ label, value, copyable }) => (
        <ColorDescriptionItem key={label} label={label} value={value} copyable={copyable} />
      ))}

      <FullWidthItem>
        <ColorDescriptionItem
          label="Temperature"
          value={`${calculateTemperature(color)}K`}
          scaleValue={(calculateTemperature(color) - 1000) / 39000}
          scaleGradient={['#1E90FF', '#ADD8E6', '#FFFFFF', '#FFD700', '#FF4500']}
          singleColumn={true}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Luminosity"
          value={`${luminosity}%`}
          scaleValue={luminosity / 100}
          scaleGradient={['#000000', '#777777', '#FFFFFF']}
          singleColumn={true}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Saturation"
          value={`${Math.round(saturation * 100)}%`}
          scaleValue={saturation}
          scaleGradient={['#808080', color.hex()]}
          singleColumn={true}
        />
      </FullWidthItem>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.3rem;
  align-items: start;
`;

const FullWidthItem = styled.div`
  grid-column: 1 / -1;
`;

export { ColorDescription };
