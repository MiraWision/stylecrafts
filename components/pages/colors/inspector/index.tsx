import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { ColorExamples } from './color-examples';
import { ColorExample } from './types';
import { colorsExamples } from './examples';
import { ShadesGrid } from './shades';
import { HarmonyCircles } from '@/components/pages/colors/inspector/harmony-circles';

import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ColorDescription } from './color-description';
import { TwoColumnsContainer as BaseTwoColumnsContainer } from '@/components/ui/containers';
import { ToolCrossLinks } from '@/components/ui/cross-links';

interface BaseColor {
  color: string;
  weight: number;
}

// Helper function to safely create Color objects
const createSafeColor = (colorString: string): Color => {
  try {
    return new Color(colorString);
  } catch (error) {
    console.warn('Failed to create Color object:', colorString, error);
    // Return a default white color
    return new Color('#ffffff');
  }
};

// Helper function to safely get hex value
const getSafeHex = (color: Color): string => {
  try {
    return color.hex();
  } catch (error) {
    console.warn('Failed to get hex value:', error);
    return '#ffffff';
  }
};

// Helper function to get a random color from examples
const getRandomColor = (): ColorExample => {
  const randomIndex = Math.floor(Math.random() * colorsExamples.length);
  return colorsExamples[randomIndex];
};

const ColorInspectorMain: React.FC = () => {
  const router = useRouter();

  const [baseColors, setBaseColors] = useState<BaseColor[]>([
    { color: '#ff0000', weight: 0 },
    { color: '#ffff00', weight: 0 },
    { color: '#0000ff', weight: 0 },
    { color: '#ffffff', weight: 0 },
    { color: '#808080', weight: 0 },
    { color: '#000000', weight: 0 },
  ]);

  const [selectedColor, setSelectedColor] = useState<Color>(createSafeColor('#ffffff'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always redirect query params to hash format
      if (window.location.search) {
        const hash = window.location.hash || '#ffffff';
        router.replace(`/colors/inspector${hash}`, undefined, { shallow: true });
        return;
      }
      
      // Load color from hash
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '').trim();
        if (/^[0-9a-fA-F]{6}$/.test(hash)) {
          try {
            setSelectedColor(createSafeColor('#' + hash));
          } catch (error) {
            console.warn('Failed to load color from hash:', hash, error);
            setSelectedColor(createSafeColor('#ffffff'));
          }
        }
      } else {
        // No color provided in URL, select a random color
        const randomColorExample = getRandomColor();
        setSelectedColor(createSafeColor(randomColorExample.color));
        setBaseColors([
          { color: '#ff0000', weight: randomColorExample.red },
          { color: '#ffff00', weight: randomColorExample.yellow },
          { color: '#0000ff', weight: randomColorExample.blue },
          { color: '#ffffff', weight: randomColorExample.white },
          { color: '#808080', weight: randomColorExample.grey },
          { color: '#000000', weight: randomColorExample.black },
        ]);
      }
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const hex = getSafeHex(selectedColor).replace('#', '');
        if (window.location.hash !== '#' + hex) {
          window.history.replaceState(null, '', `#${hex}`);
        }
      } catch (error) {
        console.warn('Failed to update URL hash:', error);
      }
    }
  }, [selectedColor]);

  const selectColorExample = (colorExample: ColorExample) => {
    setBaseColors([
      { color: '#ff0000', weight: colorExample.red },
      { color: '#ffff00', weight: colorExample.yellow },
      { color: '#0000ff', weight: colorExample.blue },
      { color: '#ffffff', weight: colorExample.white },
      { color: '#808080', weight: colorExample.grey },
      { color: '#000000', weight: colorExample.black },
    ]);
    setSelectedColor(createSafeColor(colorExample.color));
  };

  const selectShade = (shade: string) => {
    setSelectedColor(createSafeColor(shade));
  };

  const handleColorInputChange = (newColor: string) => {
    try {
      const updatedColor = createSafeColor(newColor);
      setSelectedColor(updatedColor);
    } catch (error) {
      console.error('Invalid color format:', error);
      // Don't show alert, just log the error and keep the current color
    }
  };

  // Safely get the current color's hex value
  const currentColorHex = getSafeHex(selectedColor);

  return (
    <MainContainer>
      <TwoColumnsContainer ratio="1fr 1fr">
        <LeftColumn>
          <ColorInputBig
            value={currentColorHex}
            onChange={handleColorInputChange}
          />
          <ColorDescription color={selectedColor} />
        </LeftColumn>

        <Column>
          <ShadesGrid baseColor={currentColorHex} onShadeSelect={selectShade} />
          <HarmonyCircles color={currentColorHex} />
        </Column>
      </TwoColumnsContainer>

      <ColorListContainer>
        <ColorExamples onColorSelect={selectColorExample} />
      </ColorListContainer>
      <LinkContainer>
        <Link href="/cheatsheets/colors-swatches" passHref legacyBehavior>
          <StyledTextButton>
            Discover More Color Palettes <span className="arrow">→</span>
          </StyledTextButton>
        </Link>
      </LinkContainer>

      <ToolCrossLinks
        toolKey="color-inspector"
        title="Explore More Color Tools"
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TwoColumnsContainer = styled(BaseTwoColumnsContainer)`
  @media (max-width: 768px) {
    flex-direction: column !important;
    gap: 2rem !important;
    padding: 0 0.5rem !important;
  }
`;

const ColorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.7rem;
    margin-top: 1.2rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    align-items: stretch;
    padding: 0.7rem 0.3rem;
  }
`;

const LinkContainer = styled.div`
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1.2rem;
  }
`;

const StyledTextButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  color: #666;
  background: none;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: none;
  .arrow {
    font-size: 0.9em;
    transition: transform 0.2s ease;
  }
  &:hover, &:focus {
    color: #333;
    background: #f8f9fa;
    border-color: #bbb;
    .arrow {
      transform: translateX(2px);
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    font-size: 0.95rem;
    padding: 0.7em 1em;
  }
`;

export { ColorInspectorMain };
