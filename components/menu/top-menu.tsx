import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

interface TopBarItemProps {
  name: string;
  url: string;
  isButton?: boolean;
}

const items: TopBarItemProps[] = [
  {
    name: 'Links',
    url: '/links',
  },
  {
    name: 'Features',
    url: '/features',
  },
  {
    name: 'Support Us',
    url: '/support',
    isButton: true,
  },
  {
    name: 'Contact',
    url: '/contact',
  },
];

const TopBarMenu: React.FC = () => {
  return (
    <MenuContainer>
      {items.map((item, index) => (
        item.isButton ? (
          <TopBarButton key={index} href={item.url}>
            {item.name}
          </TopBarButton>
        ) : (
          <TopBarItem key={index} href={item.url}>
            {item.name}
          </TopBarItem>
        )
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 3.3rem;
  padding: 1rem;
`;

const TopBarItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const TopBarButton = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  
  &:hover {
    background-color: var(--text-color-secondary);
  }
`;

export { TopBarMenu };