import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { rybslColorsMixing } from '../../../../utils/rybsl-colors-mixing';
import { ColorExamples } from './color-examples';
import { ColorExample } from './types';
import { ShadesGrid } from './shades';
import { HarmonyCircles } from '@/components/pages/colors/inspector/harmony-circles';

import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ColorDescription } from './color-description';
import { TwoColumnsContainer as BaseTwoColumnsContainer } from '@/components/ui/containers';

interface BaseColor {
  color: string;
  weight: number;
}

const ColorInspectorMain: React.FC = () => {
  const router = useRouter();
  const { color: queryColor } = router.query;

  const [baseColors, setBaseColors] = useState<BaseColor[]>([
    { color: '#ff0000', weight: 0 },
    { color: '#ffff00', weight: 0 },
    { color: '#0000ff', weight: 0 },
    { color: '#ffffff', weight: 0 },
    { color: '#808080', weight: 0 },
    { color: '#000000', weight: 0 },
  ]);

  const [selectedColor, setSelectedColor] = useState<Color>(new Color('#ffffff'));

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').trim();
      if (/^[0-9a-fA-F]{6}$/.test(hash)) {
        try {
          setSelectedColor(new Color('#' + hash));
        } catch {}
      }
    }
    if (typeof window !== 'undefined' && window.location.search) {
      const hash = window.location.hash || '#ffffff';
      router.replace(`/colors/inspector${hash}`, undefined, { shallow: true });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hex = selectedColor.hex().replace('#', '');
      if (window.location.hash !== '#' + hex) {
        if (window.location.search) {
          router.replace(`/colors/inspector#${hex}`, undefined, { shallow: true });
        } else {
          window.history.replaceState(null, '', `#${hex}`);
        }
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
    setSelectedColor(new Color(colorExample.color));
  };

  const selectShade = (shade: string) => {
    setSelectedColor(new Color(shade));
    // router.push(`/colors/inspector?color=${encodeURIComponent(shade)}`, undefined, { shallow: true });
  };

  const handleColorInputChange = (newColor: string) => {
    try {
      const updatedColor = new Color(newColor);
      setSelectedColor(updatedColor);
      // router.push(`/colors/inspector?color=${encodeURIComponent(newColor)}`, undefined, { shallow: true });
    } catch (error) {
      console.error('Invalid color format:', error);
      alert('Invalid color format. Please enter a valid color.');
    }
  };

  return (
    <MainContainer>
      <TwoColumnsContainer ratio="1fr 1fr">
        <LeftColumn>
          <ColorInputBig
            value={selectedColor.hex()}
            onChange={handleColorInputChange}
          />
          <ColorDescription color={selectedColor} />
        </LeftColumn>

        <Column>
          <ShadesGrid baseColor={selectedColor.hex()} onShadeSelect={selectShade} />
          <HarmonyCircles color={selectedColor.hex()} />
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
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  @media (max-width: 768px) {
    align-items: stretch;
    padding: 0.7rem 0.3rem;
    background: #fff;
    border: none;
    border-radius: 0;
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
  margin-top: 2rem;
  @media (max-width: 768px) {
    margin-top: 1.2rem;
  }
`;

const StyledTextButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  color: #e53935;
  background: none;
  border: none;
  font-size: 1.13rem;
  font-weight: 600;
  padding: 0.6em 1.1em;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.18s, background 0.18s;
  box-shadow: none;
  .arrow {
    font-size: 1.1em;
    margin-left: 0.2em;
    transition: transform 0.18s;
  }
  &:hover, &:focus {
    color: #fff;
    background: #e53935;
    text-decoration: none;
    .arrow {
      transform: translateX(4px);
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    font-size: 1.18rem;
    padding: 0.9em 0.5em;
  }
`;

export { ColorInspectorMain };
