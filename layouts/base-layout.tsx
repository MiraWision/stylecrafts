import React from 'react';
import styled from 'styled-components';

import { Logo } from '@/components/common/logo';
import { MenuList } from '@/components/menu/menu-list';

interface Props {
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
      </Sidebar>
      <Content>
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
`;

export { BaseLayout };