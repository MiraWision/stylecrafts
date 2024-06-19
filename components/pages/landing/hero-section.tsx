// components/HeroSection.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

import { Routes } from '@/content/routes';

const HeroSection: React.FC = () => (
  <Container>
    <Headline>Empower Your Projects<br />with Our Cutting-Edge Solutions</Headline>

    <Subheadline>Optimize images, create vibrant palettes,<br />generate heatmaps, and many more<br />with our free tools and libraries</Subheadline>
    
    <LinkStyled href={Routes.ImageOptimizationTool}>
      Explore Our Tools
    </LinkStyled>
  </Container>
);

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/landing/background.jpeg') no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  margin: 0.5rem 0;
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0 1rem;
  text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const LinkStyled = styled(Link)`
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  padding: 1rem 2rem;
  border: 0.0625rem solid #ffffff;
  border-radius: 1rem;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.3);
  }

  &:active, &:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.5);
  }
`;

export { HeroSection };
