import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { fadeInSlideUp } from './common';

interface Props {
  href: string;
  isVisible: boolean;
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Props> = ({
  href,
  isVisible,
  imageSrc,
  title,
  description,
}) => {
  return (
    <Card href={href} $isVisible={isVisible}>
      <Logo src={imageSrc} alt={title} />
      
      <Title>{title}</Title>

      <Description>{description}</Description>
    </Card>
  );
}

const Card = styled(Link).attrs<{ $isVisible: boolean }>(({ $isVisible }) => ({
  className: $isVisible ? 'visible' : '',
}))`
  width: 20rem;
  height: 100%;
  padding: 1rem;
  text-align: center;
  opacity: 0;
  animation-fill-mode: both;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 1rem;
  transition: all 0.3s ease-out;

  &:hover {
    background: var(--surface-100);
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &.visible {
    animation: ${fadeInSlideUp} 1s ease-out;
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.img`
  width: 7rem;
  height: 7rem;

  @media (max-width: 768px) {
    width: 5rem;
    height: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export { FeatureCard };