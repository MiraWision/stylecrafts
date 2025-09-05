import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { BurgerIcon } from '@/components/icons/burger';

interface Props {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const MobileTopBar: React.FC<Props> = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <TopBarContainer>
      <HamburgerButton $isOpen={isSidebarOpen} onClick={onToggleSidebar}>
        <BurgerIcon width="24" height="24" />
      </HamburgerButton>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: var(--surface-ground);
  border-bottom: 1px solid var(--surface-border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
  z-index: 30;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const HamburgerButton = styled(Button).attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  className: $isOpen ? 'open' : 'closed',
}))`
  && {
    background-color: transparent !important;
    border: none !important;
    color: inherit;
    height: 2rem;
    padding: 0;
    z-index: 32;
    
    &:hover {
      background-color: var(--surface-hover) !important;
    }
    
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export { MobileTopBar };
