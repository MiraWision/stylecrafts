import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/router';

import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';

import { Logo } from '@/components/ui/logo';
import { MenuList } from '@/components/menu/menu-list';

import { ThemeButton } from '@/components/ui/buttons/theme-button';

interface Props {
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [theme, themeActions] = useLocalStorage(themeStorageHandler);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <Container>
      {!isSidebarOpen && (
        <StyledButton
          isOpen={isSidebarOpen}
          icon='pi pi-bars'
          onClick={toggleSidebar}
          className='p-button-rounded p-button-text'
          aria-label='Toggle Menu'
        />
      )}
      <Sidebar isOpen={isSidebarOpen}>
        <Logo onClick={handleLogoClick} />
        <MenuList />
      </Sidebar>
      <Content isOpen={isSidebarOpen}>
        <ThemeButton setTheme={themeActions.set} />
        <Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
        {children}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  display: flex;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 15rem;
  height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: fixed; 
  left: 0;
  top: 0;
  background-color: var(--surface-ground);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -0.0625rem; 
    height: 100%;
    width: 0.0625rem; 
    background: linear-gradient(to bottom, var(--primary-color) 50%, transparent 95%);
    z-index: 10;
  }

  @media (max-width: 768px) {
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 20;
  }
`;

const StyledButton = styled(Button)<{ isOpen: boolean }>`
  && {
    background-color: transparent !important;
    border: none !important;
    color: inherit;
    position: fixed;
    top: 1.75rem;
    left: 1.75rem;
    z-index: 30;
    display: none; 

    @media (max-width: 768px) {
      display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
    }
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Content = styled.div<{ isOpen: boolean }>`
  flex-grow: 1;
  padding: 1.5rem;
  margin-left: 15rem;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    transition: filter 0.3s; 
  }
`;

export { BaseLayout };