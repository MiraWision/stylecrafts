import React from 'react';
import styled from 'styled-components';
import { adjustBrightness, adjustSaturation } from '@mirawision/colorize';

interface ShadesGridProps {
  baseColor: string;
  //onColorSelect: (color: string) => void;
}

const generateShades = (color: string, adjustmentFunc: (color: string, amount: number) => string, steps: number) => {
  const shades = [];
  const adjustmentStep = 35 / steps; 
  for (let i = 1; i <= steps; i++) {
    shades.push(adjustmentFunc(color, adjustmentStep * i));
  }
  return shades;
};

const ShadesGrid: React.FC<ShadesGridProps> = ({ baseColor }) => {
  const tintShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, amount), 5);
  const shadeShades = generateShades(baseColor, (color, amount) => adjustBrightness(color, -amount), 5);
  const toneShades = generateShades(baseColor, (color, amount) => adjustSaturation(color, -amount), 5);

  const shadeTypes = [
    { name: 'Tint (more white)', shades: tintShades },
    { name: 'Shade (more black)', shades: shadeShades },
    { name: 'Tone (more grey)', shades: toneShades }
  ];

  return (
    <Container>
      <ShadesContainer>
        {shadeTypes.map((shadeType, index) => (
          <ShadesColumn key={index}>
            <ShadeType>{shadeType.name}</ShadeType>
            <ShadesRow>
              {shadeType.shades.map((color, shadeIndex) => (
                <ShadeSquare
                  key={`${shadeType.name}-${shadeIndex}`}
                  $backgroundColor={color}
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
  align-items: flex-start;
`;

const ShadesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const ShadesRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ShadesColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
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