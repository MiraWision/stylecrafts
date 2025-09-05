import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Routes } from '@/content/routes';

import { ImageCompressionIcon } from '../icons/image-compression';
import { ImageToBase64Icon } from '../icons/image-to-base64';
import { Base64ToImageIcon } from '../icons/base64-to-image';
import { GradientGenerationIcon } from '../icons/gradient-generation';
import { PaletteGenerationIcon } from '../icons/palette-generation';
import { PaletteFromImageIcon } from '../icons/palette-from-image';
import { ContrastCheckerIcon } from '../icons/contrast-checker';
import { ColorConversionIcon } from '../icons/color-conversion';
import { ColorInspectorIcon } from '../icons/color-inspector';
import { ColorSwatchesIcon } from '../icons/color-swatches';
import { CharactersIcon } from '../icons/characters';
import { EmojisIcon } from '../icons/emojis';
import { GameIcon } from '../icons/game';
import { BlogIcon } from '../icons/blog';
import { QRCodeGeneratorIcon } from '../icons/qr-code-generator';
import { LoremIpsumGeneratorIcon } from '../icons/lorem-ipsum-generator';

interface Props {}

const MenuItems = [
  {
    name: 'Colors',
    items: [
      {
        icon: GradientGenerationIcon,
        name: 'Gradient Generation',
        url: Routes.ColorsGradientGeneratorTool,
      },
      {
        icon: PaletteGenerationIcon,
        name: 'Palette Generation',
        url: Routes.ColorsPaletteGeneratorTool,
      },
      {
        icon: PaletteFromImageIcon,
        name: 'Palette from Image',
        url: Routes.ColorsPaletteFromImageTool,
      },
      {
        icon: ContrastCheckerIcon ,
        name: 'Contrast Checking',
        url: Routes.ColorsContrastCheckerTool,
      },
      {
        icon: ColorConversionIcon,
        name: 'Color Conversion',
        url: Routes.ColorsConverterTool,
      },
      {
        icon: ColorInspectorIcon,
        name: 'Color Inspector',
        url: Routes.ColorsInspectorTool,
      },
    ],
  },
  {
    name: 'Images',
    items: [
      {
        icon: ImageCompressionIcon,
        name: 'Compression',
        url: Routes.ImageCompressionTool,
      },
      {
        icon: ImageToBase64Icon,
        name: 'Image to Base64',
        url: Routes.ImageToBase64Tool,
      },
      {
        icon: Base64ToImageIcon,
        name: 'Base64 to Image',
        url: Routes.Base64ToImageTool,
      },
    ],
  },
  {
    name: 'Generators',
    items: [
      {
        icon: QRCodeGeneratorIcon,
        name: 'QR Code Generator',
        url: Routes.GeneratorsQRCode,
      },
      {
        icon: LoremIpsumGeneratorIcon,
        name: 'Lorem Ipsum Generator',
        url: Routes.GeneratorsLoremIpsum,
      },
    ],
  },
  {
    name: 'Cheatsheets',
    items: [
      {
        icon: ColorSwatchesIcon,
        name: 'Color Swatches',
        url: Routes.ColorSwatchesCheatSheet,
      },
      {
        icon: CharactersIcon,
        name: 'Characters',
        url: Routes.CharactersCheatSheet,
      },
      {
        icon: EmojisIcon,
        name: 'Emojis',
        url: Routes.EmojisCheatSheet,
      },
    ],
  },
  {
    name: 'Games',
    items: [
      {
        icon: GameIcon,
        name: 'Guess Color Blend',
        url: Routes.GuessColorBlendGame,
      },
    ],
  },
];

const SideMenu: React.FC<Props> = ({}) => {
  const pathname = usePathname();

  return (
    <Container>
      {MenuItems.map((group) => (
        <Group key={group.name}>
          <GroupName>{group.name}</GroupName>

          {group.items.map((item) => (
            <MenuItem 
              key={item.url} 
              href={item.url}
              $active={item.url === pathname}
            >
              <item.icon width='24' height='24' />

              {item.name}
            </MenuItem>
          ))}
        </Group>
      ))}

      <Separator />
      
      <Group>
        <MenuItem
          href={Routes.Blog}
          $active={pathname.includes(Routes.Blog)}
        >
          <BlogIcon width='24' height='24' />

          Blog
        </MenuItem>
      </Group>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;

  @media (max-width: 768px) {
    height: 100vh;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

const Group = styled.div`
  margin-bottom: 1.5rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 0.0625rem;
  background-color: var(--surface-border);
  margin: 1rem 0;
`;

const GroupName = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 0;
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.0625rem;
  text-transform: uppercase;
  color: var(--text-color);
`;

const MenuItem = styled(Link).attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? 'active' : '',
}))`
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 0.175rem 0;
  color: var(--text-color);
  transition: all 0.3s;
  text-decoration: none;

  .icon {
    margin-right: 0.5rem;
  }

  .icon * {
    fill: var(--surface-500);
  }

  &:hover {
    font-weight: 700;

    .icon * {
      fill: var(--surface-900);
    }
  }

  &.active {
    font-weight: 700;

    .icon * {
      fill: var(--primary-color);
    }

    &:hover {

      .icon * {
        fill: var(--primary-color);
      }
    }
  }

  div {
    margin-left: 0.25rem;
  }
`;

export { SideMenu };