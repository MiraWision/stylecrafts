import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { Label } from '@/components/ui/texts/label';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { CopyButton } from '@/components/ui/buttons/copy-button';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { ColorInputPreview } from '@/components/ui/inputs/color-input-preview';

type ConvertedColors = {
  [key in ColorFormat]?: string;
}

interface Props {
}

const ColorConverter: React.FC<Props> = ({}) => {
  const [color, setColor] = useState('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  };

  useEffect(() => {
    setColor(generateRandomColor());
  }, []);

  useEffect(() => {
    const newConvertedColors: ConvertedColors = {};

    Object.values(ColorFormat).forEach((format) => {
      try {
        newConvertedColors[format] = convertColor(color, format);

        GAService.logEvent(analyticsEvents.colors.converter.colorConverted(color));
      } catch (error) {
        console.error('Error converting color:', error);
        newConvertedColors[format] = '';
      }
    });
    
    setConvertedColors(newConvertedColors);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.colors.converter.colorCopied(text));
  };

  return (
    <TwoColumnsContainer>
      <ColorPickerContainer>
        <Label>Enter color</Label>

        <ColorInputPreview
          value={color}
          onChange={handleColorChange}
        />
      </ColorPickerContainer>

      <FormatsContainer>
        <FlexContainer>
          {Object.values(ColorFormat).map((format) => (
            <ResultColorContainer key={format}>
              <ColorTitle>{format.toUpperCase()}</ColorTitle>

              <ColorValue>{convertedColors[format]}</ColorValue>
              
              <CopyButton 
                text={convertedColors[format] || ''}
                label='Color'
                onCopyCallback={() => handleCopy(convertedColors[format] ?? '')} 
              />
            </ResultColorContainer>
          ))}
        </FlexContainer>
      </FormatsContainer>
    </TwoColumnsContainer>
  );
}

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const FormatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultColorContainer = styled.div`
  display: grid;
  grid-template-columns: 3rem 10rem 1rem;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
`;

const ColorTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--surface-900);
`;

const ColorValue = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--surface-900);
`;

export { ColorConverter };