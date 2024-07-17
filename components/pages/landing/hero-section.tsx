import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import TopMenu from '../../menu/top-menu';
import { ExploreMoreButton } from './explore-more-button';
import { GoToAppButton } from './go-to-app-button';
import { Routes } from '@/content/routes';

interface Props {}

const HeroSection: React.FC<Props> = () => (
  <MainContainer>
    <TopMenu />
    <Container>
      <HeroContainer>
        <StyledImage src="./landing/main.png" alt="Hero Image" />
        <TextContainer>
          <TopLeftText>DESIGN<br />GETS<br />EASIER</TopLeftText>
          <CenterText>STYLE CRAFTS</CenterText>
          <ParagraphContainer>
            <Paragrapgh>optimize images, create vibrant palettes, generate heatmaps, and many more with our free tools and libraries</Paragrapgh>
            <GoToAppButton href={Routes.ImageCompressionTool} fontSize="1.5rem" iconSize="1.5rem" />
          </ParagraphContainer>
        </TextContainer>
        <ExploreMoreButton href="#explore-more"/>
      </HeroContainer>
    </Container>
  </MainContainer>
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

const fadeInAnimation = css`
  animation: ${fadeInSlideUp} 1s ease-out;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding-bottom: 14rem;
  }
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 1rem;
  width: 60%;
  padding-top: 8rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    padding-top: 0rem;
  }
`;

const TopLeftText = styled.div`
  grid-row: 1;
  justify-self: start;
  font-size: 2rem;
  font-weight: 100;
  color: #75468A;
  text-align: left;
  line-height: 0.9;
  letter-spacing: 0.1em;
  ${fadeInAnimation}

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 15%;
  left: 36%;
  transform: translateX(-50%);
  max-width: 30vw;
  max-height: 30vw;
  object-fit: contain;
  ${fadeInAnimation}
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @media (max-width: 1024px) {
    top: 20%;
    left: 34%;
    transform: translateX(-50%);
    max-width: 40vw;
    max-height: 40vw;
  }

  @media (max-width: 480px) {
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 50vw;
    max-height: 50vw;
  }
`;

const CenterText = styled.div`
  grid-row: 2;
  justify-self: center;
  font-size: 4rem;
  font-weight: 700;
  color: #75468A;
  text-align: center;
  ${fadeInAnimation}
  animation-delay: 0.4s;
  animation-fill-mode: both;
  letter-spacing: 0.7em;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ParagraphContainer = styled.div`
  grid-row: 3;
  justify-self: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-row: 3;
  margin-top: 6rem;
  margin-right: 3rem; 
  width: 15rem;

  @media (max-width: 1024px) {
    margin-right: 0rem; 
    width: 13rem;
    margin-top: 4rem;
  }
`;

const Paragrapgh = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  color: #4b5563;
  text-align: left;
  ${fadeInAnimation}
  animation-delay: 0.6s;
  animation-fill-mode: both;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export { HeroSection };
