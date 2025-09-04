import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TopMenu } from './top-menu';
import { Routes } from '@/content/routes';
import { GoToAppIcon } from '@/components/icons/go-to-app';
import { ExpandIcon } from '@/components/icons/expand';
import { fadeInAnimation } from './common';

interface Props {}

const HeroSection: React.FC<Props> = () => {
  const onScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
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
              
                <GoToAppLink href={Routes.ColorsGradientGeneratorTool}>
                  GO TO APP <GoToAppIcon width='2.5vw' height='2.5vw' />
                </GoToAppLink>
              </ParagraphContainer>
            </BottomContainer>
          </CentralContainer>
        </HeroContainer>
      </Container>

      <ExploreContainer onClick={onScroll}>
        <ExploreLink>EXPLORE MORE</ExploreLink>
        
        <ExpandIcon
          width='2.5rem'
          height='2.5rem'
        />
      </ExploreContainer>
    </MainContainer>
  );
};

const ExploreContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;

  .icon {
    margin-left: -1rem;

    * {
      fill: var(--primary-color);
    }
  }

  @media (max-width: 768px) {
    left: 1rem;
    bottom: 1rem;
  }
`;

const ExploreLink = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--primary-color);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 3vw;

  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  ${fadeInAnimation}
`;

const HeroContainer = styled.div`
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
  position: absolute;
  top: 45vh;
  transform: translateY(-55%);

  @media (max-width: 768px) {
    width: 90%;
    top: 32vh;
    transform: translateY(-28%);
  }
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

const TopLeftText = styled.div`
  font-family: 'Montagu Slab', serif;
  grid-column: 1;
  font-size: 2.5vw;
  font-weight: 50;
  color: var(--primary-color);
  text-align: left;
  line-height: 0.9;
  letter-spacing: 0.1em;
  width: 100%;
  animation-delay: 0.3s;
  animation-fill-mode: both;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 3.6vw;
    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size: 4.5vw;
  }
`;

const StyledImageTop = styled.img`
  grid-column: 2;
  width: 25vw;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 31.5vw;
  }

  @media (max-width: 480px) {
    width: 36vw;
  }
`;

const StyledImageBottom = styled.img`
  grid-column: 2;
  width: 25vw;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 31.5vw;
  }

  @media (max-width: 480px) {
    width: 36vw;
  }
`;

const BottomLeftPlaceholder = styled.div`
  grid-column: 1;
  width: 100%;
  height: 100%;
`;

const CenterText = styled.div`
  font-family: 'Montagu Slab', serif;
  font-size: 5.25vw;
  line-height: 5vw;
  font-weight: 450;
  color: var(--primary-color);
  text-align: center;
  letter-spacing: 0.35em;
  white-space: nowrap;
  margin: 0.4vw 0;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 7.2vw;
    line-height: 6.8vw;
    letter-spacing: 0.2em;
    margin: 1rem 0;
  }

  @media (max-width: 480px) {
    font-size: 9vw;
    line-height: 8.1vw;
    letter-spacing: 0.15em;
  }
`;

const ParagraphContainer = styled.div`
  grid-column: 3;
  display: flex;
  flex-direction: column;
  margin-left: 5vw;

  @media (max-width: 768px) {
    margin-left: 2vw;
  }

  @media (max-width: 480px) {
    margin-left: 1vw;
  }
`;

const GoToAppLink = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  color: #ff4500;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  .icon * {
    fill: #ff4500;
  }

  @media (max-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Paragraph = styled.div`
  font-size: 1.2vw;
  font-weight: 300;
  color: var(--text-color);
  text-align: left;
  margin-bottom: 0.8vw;

  @media (max-width: 768px) {
    font-size: 2.25vw;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 3.15vw;
    margin-bottom: 1.5rem;
  }
`;

export { HeroSection };