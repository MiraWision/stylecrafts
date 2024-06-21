import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Routes } from '@/content/routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircle, 
  faCubes,
  faRetweet,
  faFillDrip,
  faQuoteRight,
  faPuzzlePiece,
  faBlog,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFileCode,
  faFileImage,
  faImages,
  faFaceSmile,
} from '@fortawesome/free-regular-svg-icons';

interface Props {}

const MenuItems = [
  {
    name: 'Images',
    items: [
      {
        icon: faImages,
        name: 'Image Optimization',
        url: Routes.ImageOptimizationTool,
      },
      {
        icon: faFileCode,
        name: 'Image to Base64',
        url: Routes.ImageToBase64Tool,
      },
      {
        icon: faFileImage,
        name: 'Base64 to Image',
        url: Routes.Base64ToImageTool,
      },
    ],
  },
  {
    name: 'Colors',
    items: [
      {
        icon: faCubes,
        name: 'Colors Gradient',
        url: Routes.ColorsGradientGeneratorTool,
      },
      {
        icon: faRetweet,
        name: 'Colors Converter',
        url: Routes.ColorsConverterTool,
      },
      {
        icon: faFillDrip,
        name: 'Colors Blender',
        url: Routes.ColorsBlenderTool,
      },
    ],
  },
  {
    name: 'Cheatsheets',
    items: [
      {
        icon: faQuoteRight,
        name: 'Characters',
        url: Routes.CharactersCheatSheet,
      },
      {
        icon: faFaceSmile,
        name: 'Emojis',
        url: Routes.EmojisCheatSheet,
      },
    ],
  },
  {
    name: 'Games',
    items: [
      {
        icon: faPuzzlePiece,
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
              active={item.url === pathname}
            >
              <Icon icon={item.icon ?? faCircle} />

              {item.name}
            </MenuItem>
          ))}
        </Group>
      ))}

      <Separator />
      
      <Group>
        <MenuItem
          href={Routes.Blog}
          active={pathname.includes(Routes.Blog)}
        >
          <Icon icon={faBlog} />

          Blog
        </MenuItem>
      </Group>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1.5rem;
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
  font-weight: 500;
  letter-spacing: 0.0625rem;
  text-transform: uppercase;
  color: var(--surface-500);
`;

const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  margin-right: 0.5rem;
  transition: color 0.3s;
`;

const MenuItem = styled(Link)<{ active: boolean }>`
  font-weight: 400;
  display: flex;
  padding: 0.375rem 0;
  color: var(--surface-600);
  transition: all 0.3s;
  text-decoration: none;
  display: flex;

  ${Icon} {
    color: var(--surface-400);
  }

  &:hover {
    font-weight: 500;
    color: var(--surface-900);

    ${Icon} {
      color: var(--surface-800);
    }
  }

  ${({ active }) => active && css`
    font-weight: 500;
    color: var(--primary-color);

    ${Icon} {
      color: var(--primary-color);
    }

    &:hover {
      color: var(--primary-color);

      ${Icon} {
        color: var(--primary-color);
      }
    }
  `}

  div {
    margin-left: 0.25rem;
  }
`;

export { SideMenu };