import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Logo } from '@/components/ui/logo';
import { SideMenu } from '@/components/menu/side-menu';
import { Footer } from '@/components/pages/landing/footer';
import { MobileTopBar } from '@/components/ui/mobile-top-bar';

import { GlobalDropdownStyles } from '@/components/ui/inputs/select';
import 'primereact/resources/primereact.min.css';

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
    <LayoutWrapper>
      <Sidebar $isOpen={isSidebarOpen}>
        <Logo onClick={handleLogoClick} />

        <SideMenu />
      </Sidebar>

      <Content>
        <Overlay $isOpen={isSidebarOpen} onClick={toggleSidebar} />
        
        <MobileTopBar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        
        {children}
      </Content>
      {includeFooter && <BaseFooter />}

      <GlobalDropdownStyles />
    </LayoutWrapper>
  );
};

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
    z-index: 50;

    &::after {
      background: none;
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

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: hidden;
`;

const Content = styled.main`
  flex: 1 0 auto;
  width: calc(100vw - 15rem);
  margin-left: 15rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    width: 100vw;
    margin-left: 0;
    padding: 1rem;
    padding-top: 4rem;
  }

  @media (max-width: 600px) {
    padding: 0 1rem;
    padding-top: 4rem;
  }
`;

const BaseFooter = styled(Footer)`
  margin: 0;
  width: 100%;
`;

export { BaseLayout };