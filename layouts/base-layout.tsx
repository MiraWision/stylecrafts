import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Logo } from '@/components/common/logo';
import { MenuList } from '@/components/menu/menu-list';

interface Props {
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      {!isSidebarOpen && (
        <StyledButton
          isOpen={isSidebarOpen}
          icon="pi pi-bars"
          onClick={toggleSidebar}
          className="p-button-rounded p-button-text"
          aria-label="Toggle Menu"
        />
      )}
      <Sidebar isOpen={isSidebarOpen}>
        <Logo />
        <MenuList />
      </Sidebar>
      <Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <Content isOpen={isSidebarOpen}>
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 240px calc(100vw - 240px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  min-height: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative; 

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px; 
    height: 100%;
    width: 1px; 
    background: linear-gradient(to bottom, rgba(196, 36, 211, 0.5) 0%, rgba(169, 37, 37, 0.3) 70%, rgba(0, 0, 0, 0.0) 100%);
    z-index: 10;
  }

  @media (max-width: 768px) {
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    position: fixed;
    height: 100%;
    width: 240px;
    left: 0;
    top: 0;
    z-index: 20;
  }
`;

const StyledButton = styled(Button)<{ isOpen: boolean }>`
 
  && {
    background-color: transparent !important;
    border: none !important;
    color: inherit;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 30;
    display: none; 

    @media (max-width: 768px) {
      display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
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
  padding: 24px;
  display: flex;
  margin-top: 50px;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
    filter: ${({ isOpen }) => (isOpen ? 'blur(4px)' : 'none')}; 
  }
`;

export { BaseLayout };