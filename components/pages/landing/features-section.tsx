import React from 'react';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer';

const FeaturesSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();

  return (
    <Container ref={observerRef}>
      <Headline>Our Features</Headline>

      <FeaturesGrid>
        <Card href={Routes.ImageOptimizationTool} isVisible={isVisible}>
          <Logo src='/landing/feature1.png' alt='Image Optimization' />
          
          <Title>Image Optimization</Title>

          <Description>Achieve up to 99% image optimization for faster website loading and improved performance</Description>
        </Card>
        
        <Card href={Routes.ColorsGradientGeneratorTool} isVisible={isVisible}>
          <Logo src='/landing/feature3.png' alt='Gradient Generator' />
          
          <Title>Gradient Generator</Title>

          <Description>Create stunning gradients for heatmaps, charts, and visual designs</Description>
        </Card>

        <Card href={Routes.ColorsBlenderTool} isVisible={isVisible}>
          <Logo src='/landing/feature2.png' alt='Color Blender' />
          
          <Title>Color Blender</Title>

          <Description>Generate beautiful color palettes for your projects with our intuitive Color Blender</Description>
        </Card>      

        <Card href={Routes.ImageToBase64Tool} isVisible={isVisible}>
          <Logo src='/landing/feature4.png' alt='Other Tools Converter' />
          
          <Title>Other Tools</Title>

          <Description>Convert images to base64 and vice versa, switch between multiple color formats and many other useful tools</Description>
        </Card>      
      </FeaturesGrid>
    </Container>
  );
};

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(250px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: url('/landing/background5.jpeg') no-repeat center center/cover; */

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Headline = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  animation: ${fadeInSlideUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  width: 80%;
  height: 80%;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Card = styled(Link)<{ isVisible: boolean }>`
  padding: 2rem;
  text-align: center;
  opacity: 0;
  animation-fill-mode: both;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 1rem;
  /* background-color: var(--surface-50); */
  transition: all 0.3s ease-out;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-shadow: 0 0 0.25rem rgba(0,0,0,0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    /* background-color: var(--surface-100); */
    transform: scale(1.05);
  }

  ${({ isVisible }) => isVisible && css`
    animation: ${fadeInSlideUp} 1s ease-out;
    opacity: 1;
    transform: translateY(0);
  `}

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.img`
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 5rem;
    height: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export { FeaturesSection };
