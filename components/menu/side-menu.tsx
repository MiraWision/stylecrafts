import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Routes } from '@/content/routes';

import { SparklesIcon } from '../ui/icons/sparcles';

interface Props {}

const MenuItems = [
  {
    name: 'Images',
    items: [
      {
        name: 'Image Optimization',
        url: Routes.ImageOptimizationTool,
      },
      {
        name: 'Image to Base64',
        url: Routes.ImageToBase64Tool,
      },
      {
        name: 'Base64 to Image',
        url: Routes.Base64ToImageTool,
      },
    ],
  },
  {
    name: 'Colors',
    items: [
      {
        name: 'Colors Gradient',
        url: Routes.ColorsGradientGeneratorTool,
      },
      {
        name: 'Colors Converter',
        url: Routes.ColorsConverterTool,
      },
      {
        name: 'Colors Blender',
        url: Routes.ColorsBlenderTool,
      },
      // {
      //   name: 'Colors Palette',
      //   url: Routes.ColorsPalette,
      //   isAI: true,
      // },
    ],
  },
  {
    name: 'Games',
    items: [
      {
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
        <React.Fragment key={group.name}>
          <GroupName>{group.name}</GroupName>

          {group.items.map((item) => (
            <MenuItem 
              key={item.url} 
              href={item.url}
              active={item.url === pathname}
            >
              {item.name}
              {/* {item.isAI && (
                <SparklesIcon />
              )} */}
            </MenuItem>
          ))}
        </React.Fragment>
      ))}
      
      <BlogContainer>
        {/* <PinkGroupLink href='/support-us'>
          Support Us
        </PinkGroupLink> */}
        <GroupLink href={Routes.Blog}>
          Blog
        </GroupLink>
      </BlogContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1.5rem;
`;

const GroupName = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.0625rem;
  color: var(--surface-900);
`;

const GroupLink = styled(Link)`
  padding: 0.5rem 0.5rem 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.0625rem;
  color: var(--surface-900);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PinkGroupLink = styled(GroupLink)`
  color: var(--primary-color);
`;

const MenuItem = styled(Link)<{ active: boolean }>`
  border-left: 0.0625rem solid var(--surface-border);
  font-weight: 500;
  display: flex;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  color: var(--surface-700);
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    color: var(--surface-900);
    border-left-color: var(--surface-500);
  }

  ${({ active }) => active && css`
    color: var(--primary-color);
    border-left-color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
      border-left-color: var(--primary-color);
    }
  `}

  div {
    margin-left: 0.25rem;
  }
`;

const BlogContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
`;

export { SideMenu };