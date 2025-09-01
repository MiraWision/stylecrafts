import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface CrossLink {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  externalLogo?: string;
}

interface Props {
  title?: string;
  links: CrossLink[];
  className?: string;
}

const CrossLinks: React.FC<Props> = ({ title = "Related Tools", links, className }) => {
  if (!links || links.length === 0) return null;

  return (
    <Container className={className}>
      <Title>{title}</Title>
      <LinksGrid>
        {links.map((link, index) => (
          <CrossLinkItem key={index} link={link} />
        ))}
      </LinksGrid>
    </Container>
  );
};

interface CrossLinkItemProps {
  link: CrossLink;
}

const CrossLinkItem: React.FC<CrossLinkItemProps> = ({ link }) => {
  const linkContent = (
    <LinkContent>
      <LinkHeader>
        {link.icon && <IconWrapper>{link.icon}</IconWrapper>}
        {link.isExternal && link.externalLogo && (
          <ExternalLogo src={link.externalLogo} alt="External site logo" />
        )}
        {link.isExternal && !link.externalLogo && (
          <IconWrapper>
            <img src="/logo/dev-logo.svg" alt="External site" width="24" height="24" />
          </IconWrapper>
        )}
        <LinkTitle>{link.title}</LinkTitle>
      </LinkHeader>
      <LinkDescription>{link.description}</LinkDescription>
    </LinkContent>
  );

  if (link.isExternal) {
    return (
      <LinkItem>
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {linkContent}
        </a>
      </LinkItem>
    );
  }

  return (
    <LinkItem>
      <Link href={link.href} passHref>
        {linkContent}
      </Link>
    </LinkItem>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--surface-900);
  margin: 0 0 1rem 0;
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LinkItem = styled.div`
  padding: 1rem;
  border: 1px solid var(--surface-border);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transform: scale(1.05);

    .icon * {
      fill: var(--primary-color);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const LinkHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--surface-500);
  transition: color 0.3s ease;
  flex-shrink: 0;
  margin: -0.25rem;
`;

const ExternalLogo = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  padding: 0.5rem;
  transition: filter 0.3s ease;
  flex-shrink: 0;
`;

const LinkTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: var(--surface-900);
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

const LinkDescription = styled.p`
  font-size: 0.875rem;
  color: var(--surface-600);
  margin: 0;
  line-height: 1.4;
`;

export { CrossLinks };
export type { CrossLink };
