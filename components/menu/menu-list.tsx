import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface Props {
}

const MenuItems = [
  {
    name: 'Colors',
    items: [
      {
        name: 'Colors Converter',
        url: '/colors-converter',
      },
      {
        name: 'Colors Mixer',
        url: '/colors-mixer',
      },
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
            </MenuItem>
          ))}
        </React.Fragment>
      ))}
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
`;

export { MenuList };