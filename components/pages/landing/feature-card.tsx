import React from 'react';
import styled, { css } from 'styled-components';

import { fadeInSlideUp } from './common';
import { GoToAppButton } from './go-to-app-button';
import { IconProps } from '@/components/icons/icon';

interface Props {
  href: string;
  isVisible: boolean;
  Icon: React.FC<IconProps>;
  title: string;
  description: string;
  iconSize?: string;
}

const FeatureCard: React.FC<Props> = ({
  href,
  isVisible,
  Icon,
  title,
  description,
  iconSize
}) => {
  return (
    <Card $isVisible={isVisible}>
      <IconWrapper>
        <Icon width={iconSize} height={iconSize} />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <GoToAppButton href={href} />
      </Content>
    </Card>
  );
};

const fadeInAnimation = css`
  animation: ${fadeInSlideUp} 1s ease-out;
`;

const Card = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 18rem;
  height: 100%;
  padding: 1rem;
  text-align: left;
  opacity: 0;
  animation-fill-mode: both;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 1rem;
  transition: all 0.3s ease-out;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      ${fadeInAnimation}
      opacity: 1;
      transform: translateY(0);
    `}

  @media (max-width: 768px) {
    width: 15rem;
    padding: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  margin-bottom: 3rem;
  align-self: center;

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export { FeatureCard };