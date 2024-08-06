import React from 'react';
import styled from 'styled-components';
import { adjustBrightness, adjustSaturation, convertColor, ColorFormat } from '@mirawision/colorize';

interface ShadesGridProps {
  baseColor: string;
  onShadeSelect: (shade: string) => void;
}

const getRgbArray = (color: string): number[] => {
  const rgbString = convertColor(color, ColorFormat.RGB);
  const rgbArray = rgbString.match(/\d+/g)?.map(Number);
  if (!rgbArray || rgbArray.length !== 3) {
    throw new Error('Invalid RGB color format');
  }
  return rgbArray;
};

export const adjustLuminosity = (color: string, amount: number) => {
  const rgb = getRgbArray(color);
  const adjustedRgb = rgb.map(value => Math.min(Math.max(value + amount, 0), 255));
  const adjustedColor = `rgb(${adjustedRgb[0]}, ${adjustedRgb[1]}, ${adjustedRgb[2]})`;
  return convertColor(adjustedColor, ColorFormat.HEX);
};

export const adjustTemperature = (color: string, amount: number) => {
  const rgb = getRgbArray(color);
  const adjustedRgb = [
    Math.min(Math.max(rgb[0] + amount, 0), 255),
    rgb[1],
    Math.min(Math.max(rgb[2] - amount, 0), 255)
  ];
  const adjustedColor = `rgb(${adjustedRgb[0]}, ${adjustedRgb[1]}, ${adjustedRgb[2]})`;
  return convertColor(adjustedColor, ColorFormat.HEX);
};

const generateShades = (color: string, adjustmentFunc: (color: string, amount: number) => string, steps: number) => {
  const shades = [];
  const adjustmentStep = 35 / steps; 
  for (let i = 1; i <= steps; i++) {
    shades.push(adjustmentFunc(color, adjustmentStep * i));
  }
  return shades;
};

const ShadesGrid: React.FC<ShadesGridProps> = ({ baseColor, onShadeSelect }) => {
  const tintShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, amount), 5);
  const shadeShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, -amount), 5);
  const toneShades = generateShades(baseColor, (color, amount) => adjustSaturation(color, -amount), 5);
  const luminosityShades = generateShades(baseColor, adjustLuminosity, 5);
  const temperatureShades = generateShades(baseColor, adjustTemperature, 5);

  const shadeTypes = [
    { name: 'Tint (more white)', shades: tintShades },
    { name: 'Shade (more black)', shades: shadeShades },
    { name: 'Tone (more grey)', shades: toneShades },
    { name: 'Luminosity', shades: luminosityShades },
    { name: 'Temperature', shades: temperatureShades }
  ];

  return (
    <Container>
      <ShadesContainer>
        {shadeTypes.map((shadeType, index) => (
          <ShadesColumn key={index}>
            <ShadeType>{shadeType.name}</ShadeType>
            <ShadesRow>
              {shadeType.shades.map((shade, shadeIndex) => (
                <ShadeSquare
                  key={`${shadeType.name}-${shadeIndex}`}
                  $backgroundColor={shade}
                  onClick={() => onShadeSelect(shade)}
                />
              ))}
            </ShadesRow>
          </ShadesColumn>
        ))}
      </ShadesContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShadesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ShadesRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ShadesColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ShadeType = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
`;

const ShadeSquare = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export { ShadesGrid };