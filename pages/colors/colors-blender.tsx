import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';
import { BaseLayout } from '@/layouts/base-layout';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { blendMultipleColors } from '@mirawision/colorize';
import { Button } from 'primereact/button';
import ColorCircle from '@/components/ui/buttons/color-circle';
import { CopyButton } from '@/components/ui/buttons/copy-button';
import InfoButton from '@/components/ui/buttons/info-button';
import ColorPreview from '@/components/ui/outputs/color-preview';

type ConvertedColors = {
  [key in ColorFormat]?: string;
};

const availableColors = [
  { name: 'Yellow', hex: '#FFED00' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Magenta', hex: '#FF00AB' },
  { name: 'Blue', hex: '#0047AB' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Green', hex: '#00B500' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
];

const ColorsBlender = () => {
  const [color, setColor] = useState<string>('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const [selectedColors, setSelectedColors] = useState<{ color: string, weight: number }[]>([]);
  const toast = useRef<Toast>(null);

  const getContrastingColor = (color: string): string => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma > 186 ? '#000' : '#fff';
  };

  const resetColor = () => {
    const initialColors = getRandomColors(2).map(color => ({ color: color.hex, weight: 1 }));
    setSelectedColors(initialColors);
  };

  const getRandomColors = (count: number) => {
    const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const initialColors = getRandomColors(2).map(color => ({ color: color.hex, weight: 1 }));
    setSelectedColors(initialColors);
  }, []);

  useEffect(() => {
    if (selectedColors.length > 0) {
      const blendedColor = blendMultipleColors(selectedColors);
      setColor(blendedColor);
      const newConvertedColors: ConvertedColors = {};
      Object.values(ColorFormat).forEach((format) => {
        try {
          newConvertedColors[format] = convertColor(blendedColor, format);
        } catch (error) {
          console.error('Error converting color:', error);
          newConvertedColors[format] = '';
        }
      });
      setConvertedColors(newConvertedColors);
    } else {
      setColor('');
      setConvertedColors({});
    }
  }, [selectedColors]);

  const handleWeightChange = (color: string, newWeight: number) => {
    setSelectedColors(prev => {
      const existingColor = prev.find(c => c.color === color);
      if (existingColor) {
        if (newWeight === 0) {
          return prev.filter(c => c.color !== color);
        } else {
          return prev.map(c => c.color === color ? { ...c, weight: newWeight } : c);
        }
      } else {
        return [...prev, { color, weight: newWeight }];
      }
    });
  };

  const totalWeight = selectedColors.reduce((sum, c) => sum + c.weight, 0) || 1;
  const colorBar = selectedColors.map((c, index) => (
    <ColorBarSegment key={index} color={c.color} width={(c.weight / totalWeight) * 100 + '%'} />
  ));

  const contrastColor = color ? getContrastingColor(color) : 'var(--text-color-secondary)';

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <Title>Color Blender</Title>
      <ContentContainer>
        <ColorPreview color={color} contrastColor={contrastColor} resetColor={resetColor}>
          <CopyButton text={color} border={true} color={contrastColor} />
          <ColorCode>{color}</ColorCode>
          <InfoButton color={contrastColor}/>
        </ColorPreview>
        <ColorBarContainer>
          <ColorBar>{colorBar}</ColorBar>
        </ColorBarContainer>
        <ColorCirclesContainer>
          <SettingsButton icon="pi pi-cog" />
          {availableColors.map((c, index) => {
            const selectedColor = selectedColors.find(sc => sc.color === c.hex);
            const weight = selectedColor ? selectedColor.weight : 0;
            return (
              <ColorCircle
                key={index}
                color={c}
                weight={weight}
                totalWeight={totalWeight}
                onWeightChange={handleWeightChange}
              />
            );
          })}
        </ColorCirclesContainer>
      </ContentContainer>
    </BaseLayout>
  );
};

export default ColorsBlender;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;

  @media (max-width: 1200px) { 
    font-size: 1.8rem;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;

const ColorCode = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ColorBarContainer = styled.div`
  width: 50vw;
  margin-top: 1rem;

  @media (max-width: 1200px) { 
    width: 100%;
    max-width: 16rem;
  }

  @media (max-width: 900px) {
    max-width: 14rem; 
  }

  @media (max-width: 600px) {
    max-width: 12rem; 
  }

  @media (max-width: 400px) {
    max-width: 10rem; 
  }
`;

const ColorBar = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`;

const ColorBarSegment = styled.div<{ color: string; width: string }>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: 100%;
`;

const ColorCirclesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SettingsButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: var(--text-color);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;