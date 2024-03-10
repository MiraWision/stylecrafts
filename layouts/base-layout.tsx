import React from 'react';
import styled from 'styled-components';

import { Logo } from '@/components/common/logo';
import { MenuList } from '@/components/menu/menu-list';

import { DarkModeButton } from '@/components/common/dark-mode-button';
import { SelectTheme } from '@/components/common/theme-selector-button';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';

interface Props {
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  const [theme, themeActions] = useLocalStorage(themeStorageHandler);
  const darkMode = theme?.includes('dark') ?? false;

  return (
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
      </Sidebar>
      <Content>
        <DarkModeButton setTheme={themeActions.set} />
        <SelectTheme setTheme={themeActions.set} darkMode={darkMode} />
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 240px calc(100vw - 240px);
`;

const Sidebar = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export { BaseLayout };