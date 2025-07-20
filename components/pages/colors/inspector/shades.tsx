import React from 'react';
import styled from 'styled-components';
import { adjustBrightness, adjustSaturation, convertColor, ColorFormat } from '@mirawision/colorize';

interface ShadesGridProps {
  baseColor: string;
  onShadeSelect: (shade: string) => void;
}

const generateHues = (baseColor: string, hues: number[]): string[] => {
  const [h, s, l] = convertColor(baseColor, ColorFormat.HSL).match(/\d+/g)?.map(Number) || [0, 0, 0];
  return hues.map(hue => convertColor(`hsl(${hue}, ${s}%, ${l}%)`, ColorFormat.HEX));
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

  const tintShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, amount), 7);
  const shadeShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, -amount), 7);
  const toneShades = generateShades(baseColor, (color, amount) => adjustSaturation(color, -amount), 7);

  const hueAngles = [30, 90, 150, 210, 270, 330];
  const hueVariations = generateHues(baseColor, hueAngles);

  const shadeTypes = [
    { name: 'Tint (more white)', shades: tintShades },
    { name: 'Shade (more black)', shades: shadeShades },
    { name: 'Tone (more grey)', shades: toneShades },
    { name: 'Hue Variations', shades: hueVariations }
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