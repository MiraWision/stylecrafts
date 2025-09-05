import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ColorExamples } from './color-examples';
import { ColorExample } from './types';
import { colorsExamples } from './examples';
import { ShadesGrid } from './shades';
import { HarmonyCircles } from '@/components/pages/colors/inspector/harmony-circles';

import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ColorDescription } from './color-description';
import { TwoColumnsContainer as BaseTwoColumnsContainer } from '@/components/ui/containers';
import { ToolCrossLinks } from '@/components/ui/cross-links';

// Helper function to get a random color from examples
const getRandomColor = (): ColorExample => {
  const randomIndex = Math.floor(Math.random() * colorsExamples.length);
  return colorsExamples[randomIndex];
};

const ColorInspectorMain: React.FC = () => {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState('#ffffff');

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
          setSelectedColor('#' + hash);
        }
      } else {
        // No color provided in URL, select a random color
        const randomColorExample = getRandomColor();
        setSelectedColor(randomColorExample.color);
      }
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const color = new Color(selectedColor);
        const hex = color.hex().replace('#', '');
        if (window.location.hash !== '#' + hex) {
          window.history.replaceState(null, '', `#${hex}`);
        }
      } catch (error) {
        console.warn('Failed to update URL hash:', error);
      }
    }
  }, [selectedColor]);

  const selectColorExample = (colorExample: ColorExample) => {
    setSelectedColor(colorExample.color);
    
    GAService.logEvent(analyticsEvents.colors.inspector.exampleColorSelected(colorExample.color));
  };

  const selectShade = (shade: string) => {
    setSelectedColor(shade);
  };

  const handleColorInputChange = (newColor: string) => {
    setSelectedColor(newColor);
  };

  // Safely get the current color's hex value
  const currentColorHex = new Color(selectedColor).hex();

  return (
    <MainContainer>
      <TwoColumnsContainer ratio="1fr 1fr">
        <LeftColumn>
          <ColorInputBig
            value={selectedColor}
            onChange={handleColorInputChange}
          />
          <ColorDescription color={new Color(selectedColor)} />
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
        <Link 
          href="/cheatsheets/colors-swatches"
          passHref
          legacyBehavior
          onClick={() => GAService.logEvent(analyticsEvents.colors.inspector.colorSwatchesOpened())}
        >
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
