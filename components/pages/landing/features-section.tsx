// components/FeaturesSection.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Card } from 'primereact/card';

const FeaturesSection: React.FC = () => (
  <FeaturesWrapper>
    <FeatureTitle>Our Key Features</FeatureTitle>

    <FeaturesGrid>
      <FeatureCard title='Image Optimization'>Achieve up to 99% image optimization for faster website loading and improved performance.</FeatureCard>
      
      <FeatureCard title='Gradient Generator'>Create stunning gradients for heatmaps, charts, and visual designs.</FeatureCard>
      
      <FeatureCard title='ColorBlender'>Generate beautiful color palettes for your projects with our intuitive ColorBlender.</FeatureCard>
      
      <FeatureCard title='Color Converter'>Easily switch between multiple color formats to suit your needs.</FeatureCard>
    </FeaturesGrid>
  </FeaturesWrapper>
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FeaturesWrapper = styled.div`
  padding: 3rem 2rem;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const FeatureCard = styled(Card)`
  background-color: #fff;
  padding: 2rem;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

export { FeaturesSection };
