import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';

const footerData = [
  {
    groupName: 'MiraWision',
    items: [
      { name: 'About Us', href: Routes.AboutUs },
      { name: 'Contact Us', href: Routes.ContactUs },
      { name: 'Support Us', href: Routes.SupportUs },
    ],
    isPrimary: true,
  },
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
      { name: 'Image to Base64', href: Routes.ImageToBase64Tool },
      { name: 'Base64 to Image', href: Routes.Base64ToImageTool },
    ],
  },
  {
    groupName: 'Colors Tools',
    items: [
      { name: 'Gradient Generator', href: Routes.ColorsGradientGeneratorTool },
      { name: 'Palette Generator', href: Routes.ColorsPaletteGeneratorTool },
      { name: 'Color Converter', href: Routes.ColorsConverterTool },
      { name: 'Color Mixer', href: Routes.ColorsMixerTool },
    ],
  },
  {
    groupName: 'Other',
    items: [
      { name: 'Characters Cheatsheet', href: Routes.CharactersCheatSheet },
      { name: 'Emojis Cheatsheet', href: Routes.EmojisCheatSheet },
      { name: 'Guess Color Blend Game', href: Routes.GuessColorBlendGame },
      { name: 'Blog', href: Routes.Blog },
    ],
  },
];

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Links>
        {footerData.map((group, index) => (
          <Column key={index}>
            {group.isPrimary ? (
              <Title>MiraWision</Title>
            ) : (
              <FooterHeading>{group.groupName}</FooterHeading>
            )}

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
  padding: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  width: 100%;

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
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const FooterHeading = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
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
