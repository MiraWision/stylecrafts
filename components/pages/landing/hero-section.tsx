import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Logo } from '@/components/ui/logo';
import { ChevronDownIcon } from '@/components/icons/chevron-down';

interface Props {
  onScrollToNextSection: () => void;
}

const HeroSection: React.FC<Props> = ({ onScrollToNextSection }) => (
  <Container>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>

    <Headline>Empower Your Projects<br />with Our Cutting-Edge Solutions</Headline>

    <Subheadline>Optimize images, create vibrant palettes,<br />generate heatmaps, and many more<br />with our free tools and libraries</Subheadline>
  
    <ExploreButton onClick={onScrollToNextSection}>
      <span>Explore More</span>

      <ChevronDownIcon />
    </ExploreButton>
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 5rem;
  padding-top: 25vh;
  color: #4b5563;
  text-align: center;

  &::before, &::after {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 50%;
  }

  &::after {
    width: 60vw;
    height: 50vw;
    top: 5vh;
    left: 2rem;
    filter: blur(4rem);
    backdrop-filter: blur(4rem);
    background: linear-gradient(45deg, #ff1493 0%, #87cefa 70%);
    opacity: 0.25;
  }

  &::before {
    width: 30vw;
    height: 30vw;
    top: 40%;
    left: 60%;
    filter: blur(2rem);
    backdrop-filter: blur(2rem);
    background: linear-gradient(135deg, #87cefa 30%, #ff1493 100%);
    opacity: 0.25;
  }
`;

const LogoWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
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

const ExploreButton = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  animation: ${fadeInSlideUp} 0.8s ease-out;
  
  svg {
    margin-top: 0.25rem;
    transition: transform 0.3s ease-out;
  }

  &:hover {
    svg {
      transform: translateY(0.5rem);
    }
  }
`;

export { HeroSection };
