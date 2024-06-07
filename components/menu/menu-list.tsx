import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import { SparklesIcon } from '../ui/icons/sparcles';

interface Props {}

const MenuItems = [
  {
    name: 'Colors',
    items: [
      {
        name: 'Colors Converter',
        url: '/colors-converter',
      },
      {
        name: 'Colors Gradient',
        url: '/colors-gradient',
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
        url: '/image-to-base64',
      },
      {
        name: 'Base64 to Image',
        url: '/base64-to-image',
      },
      {
        name: 'Image Resizer',
        url: '/image-resizer',
      },
    ],
  },
];

const MenuList: React.FC<Props> = ({}) => {
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
        <GroupLink href='/blog' passHref>
          Blog
        </GroupLink>
      </BlogContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 24px;
`;

const GroupName = styled.div`
  padding: 8px 8px 8px 0;
  margin: 8px 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--surface-900);
`;

const GroupLink = styled(Link)`
  padding: 8px 8px 8px 0;
  margin: 8px 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--surface-900);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuItem = styled(Link)<{ active: boolean }>`
  border-left: 1px solid var(--surface-border);
  font-weight: 450;
  display: flex;
  padding: 8px 8px 8px 16px;
  color: var(--surface-700);
  transition: all .2s;
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
    margin-left: 4px;
  }
`;

const BlogContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

export { MenuList };