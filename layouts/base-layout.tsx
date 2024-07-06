import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Button } from 'primereact/button';
import { Logo } from '@/components/ui/logo';
import { SideMenu } from '@/components/menu/side-menu';
import { ThemeButton } from '@/components/ui/buttons/theme-button';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Footer } from '@/components/pages/landing/footer';

interface Props {
  includeFooter?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ includeFooter = true, children }) => {
  const router = useRouter();
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
          $isOpen={isSidebarOpen}
          icon='pi pi-bars'
          onClick={toggleSidebar}
          className='p-button-rounded p-button-text'
          aria-label='Toggle Menu'
        />
      )}

      <Sidebar $isOpen={isSidebarOpen}>
        <Logo onClick={handleLogoClick} />

        <SideMenu />
      </Sidebar>

      <Content>
        <ThemeButton />
        
        <Overlay $isOpen={isSidebarOpen} onClick={toggleSidebar} />
        
        {children}

        {includeFooter && <BaseFooter />}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  display: flex;
`;

const Sidebar = styled.div.attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  className: $isOpen ? 'open' : 'closed',
}))`
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
    background: linear-gradient(to bottom, var(--surface-border) 80%, transparent 95%);
    z-index: 10;
  }

  &.open {
    @media (max-width: 768px) {
      transform: translateX(0);
    }
  }

  &.closed {
    @media (max-width: 768px) {
      transform: translateX(-100%);
    }
  }

  @media (max-width: 768px) {
    transition: transform 0.3s ease-in-out;
    z-index: 20;

    &::after {
      background: none;
    }
  }
`;

const StyledButton = styled(Button).attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  className: $isOpen ? 'open' : 'closed',
}))`
  && {
    background-color: transparent !important;
    border: none !important;
    color: inherit;
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;
    z-index: 30;
    display: none; 

    @media (max-width: 768px) {
      &.open {
        display: none;
      }

      &.closed {
        display: flex;
      }
    }
  }
`;

const Overlay = styled.div.attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  className: $isOpen ? 'open' : 'closed',
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;

  &.open {
    display: block;
  }

  &.closed {
    display: none;
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  margin-left: 15rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const BaseFooter = styled(Footer)`
  margin: 4rem -1.5rem -1.5rem;
  width: calc(100% + 3rem);
`;

export { BaseLayout };