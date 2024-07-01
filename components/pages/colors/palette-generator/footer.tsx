import React from 'react';
import styled from 'styled-components';

interface FooterProps {
  bgColor: string;
  textColor: string;
}

const Footer: React.FC<FooterProps> = ({ bgColor, textColor }) => {
  return (
    <FooterContainer bgColor={bgColor} textColor={textColor}>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="#">Team</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="#">Web Development</FooterLink>
          <FooterLink href="#">Design</FooterLink>
          <FooterLink href="#">Marketing</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Follow Us</FooterTitle>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        &copy; 2024 Your Company. All rights reserved.
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer<{ bgColor: string, textColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterTitle = styled.h4`
  margin: 0 0 0.5rem 0;
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  margin-top: 1rem;
`;

export { Footer };
