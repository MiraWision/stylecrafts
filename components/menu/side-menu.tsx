import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SparklesIcon } from '../ui/icons/sparcles';

interface Props {}

const MenuItems = [
  {
    name: 'Colors',
    items: [
      {
        name: 'Colors Converter',
        url: '/colors/colors-converter',
      },
      {
        name: 'Colors Gradient',
        url: '/colors/colors-gradient',
      },
      {
        name: 'Colors Blender',
        url: '/colors/colors-blender',
      },
      // {
      //   name: 'Colors Palette',
      //   url: '/colors-palette',
      //   isAI: true,
      // },
    ],
  },
  {
    name: 'Images',
    items: [
      {
        name: 'Image to Base64',
        url: '/image/image-to-base64',
      },
      {
        name: 'Base64 to Image',
        url: '/image/base64-to-image',
      },
      {
        name: 'Image Resizer',
        url: '/image/image-resizer',
      },
    ],
  },
  {
    name: 'Games',
    items: [
      {
        name: 'Color Mixer',
        url: '/games/color-mixer',
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
        <GroupLink href='/blog'>
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
  justify-content: center;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
`;

export { SideMenu };