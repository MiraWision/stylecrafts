import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Icon, IconProps } from '@/components/icons/icon';

interface Props {
  href: string;
  icon: React.FC<IconProps>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Props> = ({
  href,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <Card href={href}>
      <IconWrapper>
        <Icon width='6rem' height='6rem' />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
};

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: center;
  width: 18rem;
  height: 100%;
  padding: 1rem;
  text-align: left;
  animation-fill-mode: both;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 1rem;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

    .icon * {
      fill: url(#landing);
    }
  }

  &:active {
    transform: scale(1.025);
  }

  @media (max-width: 768px) {
    width: 15rem;
    padding: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  align-self: center;
  position: relative;
  width: 6rem;
  height: 6rem;

  @media (max-width: 768px) {
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