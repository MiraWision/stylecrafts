import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const footerData = [
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
      { name: 'Palette from Image', href: Routes.ColorsPaletteFromImageTool },
      { name: 'Contrast Checker', href: Routes.ColorsContrastCheckerTool },
      { name: 'Color Converter', href: Routes.ColorsConverterTool },
      { name: 'Color Mixer', href: Routes.ColorsMixerTool },
    ],
  },
  {
    groupName: 'Other',
    items: [
      { name: 'Colors Swatches', href: Routes.ColorSwatchesCheatSheet },
      { name: 'Characters Cheatsheet', href: Routes.CharactersCheatSheet },
      { name: 'Emojis Cheatsheet', href: Routes.EmojisCheatSheet },
      { name: 'Guess Color Blend Game', href: Routes.GuessColorBlendGame },
      { name: 'Blog', href: Routes.Blog },
    ],
  },
  {
    groupName: 'Company',
    items: [
      { name: 'About Us', href: Routes.AboutUs },
      { name: 'Contact Us', href: Routes.ContactUs },
      { name: 'Support Us', href: Routes.SupportUs },
    ],
  },
  {
    groupName: 'Terms & Policies',
    items: [
      { name: 'Privacy Policy', href: Routes.PrivacyPolicy },
      { name: 'Terms of Use', href: Routes.TermsOfUse },
      { name: 'Cookie Policy', href: Routes.CookiePolicy },
    ],
  },
];

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Row>
        <Company>
          <Title>
            <span>
              <Logo src='/logo/mwicon.png' alt='MiraWision Logo' />
            </span>

            MiraWision
          </Title>

          <Description>
            Our vision is to bridge creativity and technology, delivering versatile tools that support 
            designers and developers in crafting extraordinary digital experiences.
          </Description>
        </Company>

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
      </Row>

      <Separator />

      <Row>
        <Description>
          © 2024 MiraWision. All rights reserved.
        </Description>

        <SocialNetworks>
          <FooterLink href='https://www.linkedin.com/company/mirawision' target='_blank' rel='noopener noreferrer'>
            <SocialIcon icon={faLinkedin} />
          </FooterLink>

          <FooterLink href='https://x.com/MiraWision' target='_blank' rel='noopener noreferrer'>
            <SocialIcon icon={faXTwitter} />
          </FooterLink>
        </SocialNetworks>
      </Row>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-100);
  color: var(--text-color);
  padding: 4rem 4rem 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const Company = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 15rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 1.75rem;
  margin-right: 1rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const SocialNetworks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SocialIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  color: var(--text-color-secondary);
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const FooterHeading = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
  color: var(--text-color-secondary);
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 0.25rem;
  color: var(--text-color-secondary);

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: linear-gradient(to right, transparent 0%, var(--surface-border) 20%, var(--surface-border) 80%, transparent 100%);
  margin: 2rem 0;
`;

export { Footer };
