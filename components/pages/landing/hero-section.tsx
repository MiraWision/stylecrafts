// components/HeroSection.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

import { Routes } from '@/content/routes';

import { Logo } from '@/components/ui/logo';

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
  width: 100%;
  height: 100%;
  background: url('/landing/background6.jpeg') no-repeat left center/cover;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 5vw;
  color: #ffffff;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  text-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  margin: 0.5rem 0;
  text-align: left;
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0 1rem;
  text-align: left;
  text-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const LinkStyled = styled(Link)`
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  padding: 1rem 1.25rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-shadow: 0 0 1rem rgba(0,0,0,0.5);
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export { HeroSection };
