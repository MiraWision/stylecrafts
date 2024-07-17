import React from 'react';
import styled from 'styled-components';

const TopMenu: React.FC = () => {
  return (
    <Container>
      <Left>
        <MenuItem href="/about">about</MenuItem>
        <MenuItem href="/support">support</MenuItem>
      </Left>
      <Center>
        <Icon href="/">
          <IconImage src="./landing/top-menu-logo.svg" alt="Logo" />
        </Icon>
      </Center>
      <Right>
        <MenuItem href="/contact">contact</MenuItem>
        <MenuItem href="/go-to-app">go to app</MenuItem>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 40rem;
  padding: 10px 20px;
`;

const Left = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 16px;
`;

const Icon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
`;

export default TopMenu;
