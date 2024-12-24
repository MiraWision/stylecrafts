import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';
import Link from 'next/link';

const TopMenu: React.FC = () => {
  return (
    <Container>
      <MenuItem href={Routes.AboutUs}>about us</MenuItem>
      <MenuItem href={Routes.SupportUs}>support us</MenuItem>
      <Icon href="/">
        <IconImage src="./landing/top-menu-logo.svg" alt="Logo" />
      </Icon>
      <MenuItem href={Routes.ContactUs}>contact us</MenuItem>
      <MenuItem  href={Routes.ImageCompressionTool}>go to app</MenuItem>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  width: 40rem;
  padding-top: 1rem;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  text-align: center;
  font-size: 1rem;
`;

const Icon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

export { TopMenu };
