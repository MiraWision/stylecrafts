// components/HeroSection.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Button } from 'primereact/button';

const HeroSection: React.FC = () => (
  <Container>
    <Headline>Empower Your Projects<br />with Our Cutting-Edge Solutions</Headline>

    <Subheadline>Optimize images, create vibrant palettes, generate heatmaps, and many more with our free tools and libraries</Subheadline>
    
    <ButtonStyled label='Explore Our Tools' className='p-button-outlined p-button-lg' />
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
  color: white;
  text-align: center;
`;

const Headline = styled.h1`
  width: 50vw;
  font-size: 2.5rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  margin: 0.5rem 0;
`;

const Subheadline = styled.h2`
  width: 50vw;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0 1rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const ButtonStyled = styled(Button)`
  color: white;
  border-color: white;
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

export { HeroSection };
