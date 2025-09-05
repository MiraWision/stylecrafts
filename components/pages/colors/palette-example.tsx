import React from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { Label } from '@/components/ui/texts/label';

import { BridgertonIcon } from '@/components/icons/bridgerton';
import { HarryPotterIcon } from '@/components/icons/harry-potter';
import { ChristmasIcon } from '@/components/icons/christmas';
import { HalloweenIcon } from '@/components/icons/halloween';
import { ValentineIcon } from '@/components/icons/valentine';
import { EasterIcon } from '@/components/icons/easter';
import { TwilightsIcon } from '@/components/icons/twilights';

const iconMap: Record<string, React.ComponentType<any>> = {
  '/icons/bridgerton': BridgertonIcon,
  '/icons/harry-potter': HarryPotterIcon,
  '/icons/christmas': ChristmasIcon,
  '/icons/halloween': HalloweenIcon,
  '/icons/twilights': TwilightsIcon,
  '/icons/valentine': ValentineIcon,
  '/icons/easter': EasterIcon,
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
        lighter: baseColor.withBrightness(15),
        main: color,
        darker: baseColor.withBrightness(-15),
      };
    } catch {
      return {
        lighter: color,
        main: color,
        darker: color,
      };
    }
  };

  const IconComponent = palette.iconPath ? iconMap[palette.iconPath] : null;

  return (
    <Container onClick={onClick}>
      <TitleRow>
        {IconComponent && (
          <IconContainer>
            <IconComponent width="24" height="24" />
          </IconContainer>
        )}
        <PaletteExampleLabel>{palette.name}</PaletteExampleLabel>
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

const PaletteExampleLabel = styled(Label)`
  margin-bottom: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .icon * {
    fill: var(--primary-color);
  }
`;

const ColorsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
