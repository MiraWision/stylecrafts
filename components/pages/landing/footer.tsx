import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';

const footerData = [
  {
    groupName: 'Legal',
    items: [
      { name: 'Privacy Policy', href: Routes.PrivacyPolicy },
      { name: 'Terms of Use', href: Routes.TermsOfUse },
      { name: 'Cookie Policy', href: Routes.CookiePolicy },
    ],
  },
  {
    groupName: 'Images Tools',
    items: [
      { name: 'Image Optimization', href: Routes.ImageOptimizationTool },
      { name: 'Image to Base64 Converter', href: Routes.ImageToBase64Tool },
      { name: 'Base64 to Image Converter', href: Routes.Base64ToImageTool },
    ],
  },
  {
    groupName: 'Colors Tools',
    items: [
      { name: 'Color Blender', href: Routes.ColorsBlenderTool },
      { name: 'Gradient Generator', href: Routes.ColorsGradientGeneratorTool },
      { name: 'Color Converter', href: Routes.ColorsConverterTool },
    ],
  },
  {
    groupName: 'Other',
    items: [
      { name: 'Guess Color Blend Game', href: Routes.GuessColorBlendGame },
      { name: 'Blog', href: Routes.Blog },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <Container>
      <Title>MiraWision</Title>

      <Links>
        {footerData.map((group, index) => (
          <Column key={index}>
            <FooterHeading>{group.groupName}</FooterHeading>

            {group.items.map((item, itemIndex) => (
              <FooterLink key={itemIndex} href={item.href} rel='noopener noreferrer'>
                {item.name}
              </FooterLink>
            ))}
          </Column>
        ))}
      </Links>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--surface-100);
  color: var(--text-color);
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
`;

const FooterHeading = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 0.5rem;
  color: var(--text-color);

  &:hover {
    text-decoration: underline;
  }
`;

export { Footer };
