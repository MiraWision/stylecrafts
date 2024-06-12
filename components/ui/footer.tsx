import React from 'react';
import styled from 'styled-components';
import { Routes } from '@/content/routes';

const Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <FooterTitle>mirawision corp</FooterTitle>
      </Column>
      <Column>
        <FooterLink href={Routes.PrivacyPolicy}>Privacy Policy</FooterLink>
        <FooterLink href={Routes.TermsOfUse}>Terms of Use</FooterLink>
        <FooterLink href={Routes.CookiePolicy}>Cookies Policy</FooterLink>
      </Column>
      <Column>
        <FooterLink href="#">Links</FooterLink>
        <FooterLink href="#">Support Us</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </Column>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
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

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: var(--gray-400);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: var(--gray-50);
  }
`;

export { Footer };
