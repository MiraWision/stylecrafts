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
      
      <Content>
        <Title>{title}</Title>

        <Description>{description}</Description>
      </Content>
    </Card>
  );
}

const Card = styled(Link).attrs<{ $isVisible: boolean }>(({ $isVisible }) => ({
  className: $isVisible ? 'visible' : '',
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 25rem;
  height: 100%;
  padding: 0.5rem;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 5rem;
  height: 5rem;

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
  margin: 0 0 0.5rem 0;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  text-decoration: none;
  text-align: left;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export { FeatureCard };