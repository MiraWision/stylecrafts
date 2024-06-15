import React from 'react';
import styled from 'styled-components';
import { Routes } from '@/content/routes';

const Footer = () => {
  return (
    <Container>
      <Column>
        <Title>MiraWision</Title>
      </Column>
      
      <Column>
        <Link href={Routes.PrivacyPolicy}>Privacy Policy</Link>

        <Link href={Routes.TermsOfUse}>Terms of Use</Link>
        
        <Link href={Routes.CookiePolicy}>Cookies Policy</Link>
      </Column>
      <Column>
        <Link href='#'>Links</Link>
        
        <Link href='#'>Support Us</Link>
        
        <Link href='#'>Contact</Link>
      </Column>
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  justify-content: space-around;
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  color: var(--gray-400);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: var(--gray-50);
  }
`;

export { Footer };
