// components/HeroSection.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const HeroSection: React.FC = () => (
  <Container>
    <Headline>Empower Your Projects<br />with Our Cutting-Edge Solutions</Headline>

    <Subheadline>Optimize images, create vibrant palettes,<br />generate heatmaps, and many more<br />with our free tools and libraries</Subheadline>
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
  background: url('/landing/background.jpeg') no-repeat left center/cover;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 5rem;
  padding-top: 25vh;
  color: #4b5563;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  animation: ${fadeInSlideUp} 0.8s ease-out;
  margin: 0.5rem 0;
  text-align: left;
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0.5rem 0 1rem;
  text-align: left;
  animation: ${fadeInSlideUp} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

export { HeroSection };
