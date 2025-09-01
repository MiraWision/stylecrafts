import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { useRouter } from 'next/router';
import imagineColor from '@mirawision/imagine/color';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { Label } from '@/components/ui/texts/label';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { IconLink } from '@/components/ui/links/icon-link';

type ConvertedColors = {
  [key in ColorFormat]?: string;
};

interface Props {}

const ColorConverter: React.FC<Props> = () => {
  const [color, setColor] = useState('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { color: queryColor } = router.query;

  const generateRandomColor = () => {
    return imagineColor.hex();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (queryColor && typeof queryColor === 'string') {
      try {
        setColor(queryColor);
      } catch (error) {
        setColor(generateRandomColor());
      }
    } else {
      setColor(generateRandomColor());
    }
  }, [queryColor]);

  useEffect(() => {
    if (!color) return;

    const newConvertedColors: ConvertedColors = {};

    Object.values(ColorFormat).forEach((format) => {
      try {
        newConvertedColors[format] = convertColor(color, format);

        GAService.logEvent(
          analyticsEvents.colors.converter.colorConverted(color)
        );
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

  if (!isClient) {
    return null;
  }

  return (
    <MainContainer>
      <TwoColumnsContainer ratio="1fr 2fr">
        <ColorPickerContainer>
          <Label fontSize="1rem">Enter color</Label>
          <ColorInputBig value={color} onChange={handleColorChange} />

          <IconLinkContainer>
            <InspectLink
              href={`/colors/inspector#${color.replace(/^#/, '')}`}
              text="Inspect Color"
            />
          </IconLinkContainer>
        </ColorPickerContainer>

        <FormatsContainer>
          <FlexContainer>
            {Object.values(ColorFormat).map((format) => (
              <ResultColorContainer key={format}>
                <ColorTitle>{format.toUpperCase()}</ColorTitle>

                <ColorValue>{convertedColors[format]}</ColorValue>

                <CopyIconButton
                  text={convertedColors[format] || ''}
                  onCopyCallback={() =>
                    handleCopy(convertedColors[format] ?? '')
                  }
                />
              </ResultColorContainer>
            ))}
          </FlexContainer>
        </FormatsContainer>
      </TwoColumnsContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const IconLinkContainer = styled.div`
  margin-top: 1rem;
`;

const InspectLink = styled(IconLink)`
  display: inline-block;
  color: var(--primary-500);
  font-weight: 500;         
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-600);
    text-decoration: underline;  
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

const FormatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultColorContainer = styled.div`
  display: grid;
  grid-template-columns: 3rem 12rem 1rem;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
`;

const ColorTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--surface-900);
`;

const ColorValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--surface-900);
`;

export { ColorConverter };
