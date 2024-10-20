import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { TopMenu } from '../../menu/top-menu';
import { ExploreMoreButton } from './explore-more-button';
import { GoToAppButton } from './go-to-app-button';
import { Routes } from '@/content/routes';

interface Props {}

const HeroSection: React.FC<Props> = () => (
  <MainContainer>
    <TopMenu />
    <Container>
      <HeroContainer>
        <CentralContainer>
          <TopContainer>
            <TopLeftText>DESIGN<br />GETS<br />EASIER</TopLeftText>
            <StyledImageTop src="./landing/hero-top.png" alt="Hero Top Image" />
            <div />
          </TopContainer>
          <CenterText>STYLE CRAFTS</CenterText>
          <BottomContainer>
            <BottomLeftPlaceholder />
            
            <StyledImageBottom src="./landing/hero-bottom.png" alt="Hero Bottom Image" />
            <ParagraphContainer>
              <Paragraph>
                Optimize images, create vibrant palettes, generate heatmaps, and many more with our free tools and libraries
              </Paragraph>
              <GoToAppButton
                href={Routes.ImageCompressionTool}
                fontSize="1.5vw"
                iconSize="1.5vw"
              />
            </ParagraphContainer>
          </BottomContainer>
        </CentralContainer>
        <ExploreMoreButton href="#explore-more" />
      </HeroContainer>
    </Container>
  </MainContainer>
);

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(5vh);
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
  align-items: center;
  width: 100%;
  padding-bottom: 3vw;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 63%;
  padding-top: 10vw;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
`;

const TopLeftText = styled.div`
  font-family: 'Montagu Slab', serif;
  grid-column: 1;
  font-size: 2.5vw;
  font-weight: 50;
  color: #75468A;
  text-align: left;
  line-height: 0.9;
  letter-spacing: 0.1em;
  width: 100%;
  ${fadeInAnimation}
  animation-delay: 0.3s;
  animation-fill-mode: both;
`;

const StyledImageTop = styled.img`
  grid-column: 2;
  width: 25vw;
  height: auto;
  object-fit: contain;
`;

const StyledImageBottom = styled.img`
  grid-column: 2;
  width: 25vw;
  height: auto;
  object-fit: contain;
`;

const BottomLeftPlaceholder = styled.div`
  grid-column: 1;
  width: 100%;
  height: 100%;
`;

const CenterText = styled.div`
  font-family: 'Montagu Slab', serif;
  font-size: 4.5vw;
  font-weight: 450;
  color: #75468A;
  text-align: center;
  letter-spacing: 0.5em;
  white-space: nowrap;
  margin: 0.4vw 0;
  ${fadeInAnimation}
  animation-delay: 0.5s;
  animation-fill-mode: both;
`;

const ParagraphContainer = styled.div`
  grid-column: 3;
  display: flex;
  flex-direction: column;

  ${fadeInAnimation}
  animation-delay: 0.6s;
  animation-fill-mode: both;
  margin-left: 5vw;
`;

const Paragraph = styled.div`
  font-size: 1.2vw;
  font-weight: 300;
  color: #4b5563;
  text-align: left;
  margin-bottom: 0.8vw;
`;

export { HeroSection };