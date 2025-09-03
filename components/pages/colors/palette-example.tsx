import React from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { Label } from '@/components/ui/texts/label';

// Import existing icons
import { BridgertonIcon } from '@/components/icons/bridgerton';
import { HarryPotterIcon } from '@/components/icons/harry-potter';
import { ChristmasIcon } from '@/components/icons/christmas';
import { HalloweenIcon } from '@/components/icons/halloween';
import { HeartIcon } from '@/components/icons/heart';
import { GameIcon } from '@/components/icons/game';
import { InstagramIcon } from '@/components/icons/instagram';
import { TiktokIcon } from '@/components/icons/tiktok';
import { SunIcon } from '@/components/icons/sun';
import { Star } from '@/components/icons/star';
import { MoonIcon } from '@/components/icons/moon';
import { BlogIcon } from '@/components/icons/blog';

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  '/icons/bridgerton': BridgertonIcon,
  '/icons/harry-potter': HarryPotterIcon,
  '/icons/christmas': ChristmasIcon,
  '/icons/halloween': HalloweenIcon,
  '/icons/heart': HeartIcon,
  '/icons/game': GameIcon,
  '/icons/instagram': InstagramIcon,
  '/icons/tiktok': TiktokIcon,
  '/icons/sun': SunIcon,
  '/icons/star': Star,
  '/icons/moon': MoonIcon,
  '/icons/blog': BlogIcon,
};

interface Palette {
  name: string;
  colors: string[];
  iconPath?: string;
}

interface Props {
  palette: Palette;
  onClick: () => void;
}

const PaletteExample: React.FC<Props> = ({ palette, onClick }) => {
  const generateShades = (color: string) => {
    try {
      const baseColor = new Color(color);
      return {
        lightest: baseColor.withBrightness(25),
        lighter: baseColor.withBrightness(15),
        main: color,
        darker: baseColor.withBrightness(-15),
        darkest: baseColor.withBrightness(-25)
      };
    } catch {
      return {
        lightest: color,
        lighter: color,
        main: color,
        darker: color,
        darkest: color
      };
    }
  };

  const IconComponent = palette.iconPath ? iconMap[palette.iconPath] : null;

  return (
    <Container onClick={onClick}>
      <TitleRow>
        {IconComponent && (
          <IconContainer>
            <IconComponent width="1rem" height="1rem" />
          </IconContainer>
        )}
        <Label>{palette.name}</Label>
      </TitleRow>

      <ColorsRow>
        {palette.colors.map((color, index) => {
          const shades = generateShades(color);
          return (
            <ColorColumn key={index}>
              <ShadeBox $backgroundColor={shades.lighter} />
              <ShadeBox $backgroundColor={shades.main} />
              <ShadeBox $backgroundColor={shades.darker} />
            </ColorColumn>
          );
        })}
      </ColorsRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShadeBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 1.5rem;
  height: 1rem;
`;

export { PaletteExample };

export type { Palette };
