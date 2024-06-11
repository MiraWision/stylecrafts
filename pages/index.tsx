import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import { TopBarMenu } from '@/components/menu/top-menu';
import { LandingLogo } from '@/components/ui/landing/landing-logo';
import { GlassCard } from '@/components/ui/landing/cards/glass-card';
import { Button } from 'primereact/button';
import { NeonCard } from '@/components/ui/landing/cards/neon-card';
import { Footer } from '@/components/ui/footer';
import { Routes } from '@/content/routes';

const Home = () => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />

      <SectionContainer>
        <TopBarMenu />
        <Grid3Col>

          <LeftColumn>
            <GlassCard largeText='7+' smallText='SERVICES' index={0} />
            <GlassCard largeText='100+' smallText='REVIEWS' index={1} />
            <GlassCard largeText='100k+' smallText='CONVERTATIONS' index={2} />
          </LeftColumn>

          <CentralColumn>
            <LandingLogo />
            <Image src='../icons/landing-logo.png' alt='landing-image' />
            {/* <Glow /> */}
          </CentralColumn>

          <RightColumn>
            <TextBlock>
              <TextLine>Seamlessly convert colors, manipulate images,</TextLine>
              <TextLine>and more with our cutting-edge tools.</TextLine>
            </TextBlock>
            <StyledButton>GET STARTED</StyledButton>
          </RightColumn>

        </Grid3Col>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>Our Services</SectionHeader>
        <SectionSubHeader>Explore it now!</SectionSubHeader>

        <Grid3Col>
          <NeonCard 
            gradient='linear-gradient(135deg, rgba(178, 69, 146, 0.5), rgba(241, 95, 121, 0.5))' 
            image='../icons/color-converter.jpg' 
            title='Color Manipulation' 
            description='Convert, blend, and generate gradients or themes.' 
            link={Routes.ColorsConverterTool} 
          />
          <NeonCard 
            gradient='linear-gradient(135deg, rgba(113, 69, 178, 0.5), rgba(95, 102, 241, 0.5))' 
            image='../icons/image-converter.jpg' 
            title='Photo Manipulation' 
            description='Convert, crop, enhance quality, apply filters, and edit photos.' 
            link={Routes.ImageOptimizationTool} 
          />
          <NeonCard 
            gradient='linear-gradient(135deg, rgba(113, 69, 178, 0.5), rgba(95, 102, 241, 0.5))' 
            image='../icons/color-converter.jpg' 
            title='Games' 
            description='Games related to color or photo manipulation.' 
            link={Routes.GuessColorBlendGame} 
          />
        </Grid3Col>
        
      </SectionContainer>

      <SectionContainer>
        <Grid2Col>

          <RightColumn>
            <SectionHeader>Our Libraries</SectionHeader>
            <SectionSubHeader>You can use our libraries for your own projects</SectionSubHeader>
            <StyledButton>GET STARTED</StyledButton>
          </RightColumn>

          <LeftColumn>
            <Container>
              <CodeContainer>
              @mirawision/colorize
              npm install @mirawision/colorize
              yarn add @mirawision/colorize
              </CodeContainer>
              <Subtitle>@mirawision</Subtitle>
              <Paragraph>You can find a lot of libraries on different tastyies</Paragraph>
            </Container>
          </LeftColumn>

        </Grid2Col>
      </SectionContainer>
      <Footer />
    </>
  );
}

export default Home;

const SectionContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  min-height: 100vh;
`;

const SectionHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SectionSubHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
  margin-bottom: 2rem;
  color: gray;
`;

const Grid3Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 7rem;
`;

const Grid2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 7rem;
`;

const LeftColumn = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  position: relative;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 3rem;
`;

const TextBlock = styled.div`
  color: var(--surface-color);
  text-align: center;
  margin: 4rem 0 2rem 0;
`;

const TextLine = styled.p`
  margin: 0;
  padding: 0.5rem 0;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, var(--pink-400), var(--primary-color));
  border: none;
  border-radius: 3rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.5s ease, box-shadow 0.5s ease, color 0.5s ease, filter 0.5s ease, transform 0.5s ease;

  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, var(--pink-400), var(--primary-color));
    box-shadow: 0 0 0.625rem rgba(255, 255, 255, 0.5), 0 0 1.25rem rgba(255, 0, 150, 0.3), 0 0 1.875rem rgba(0, 204, 255, 0.3);
    transform: scale(1.1);
  }

  &:before {
    content: '';
    position: absolute;
    top: -0.3125rem;
    left: -0.3125rem;
    right: -0.3125rem;
    bottom: -0.3125rem;
    border-radius: 3rem;
    background: linear-gradient(45deg, rgba(255, 0, 150, 0.3), rgba(0, 204, 255, 0.3));
    z-index: -1;
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    transform: scale(0.8);
  }

  &:hover:before {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  background: var(--blue-600);
  border-radius: 1.5rem;
  padding: 1.5rem;
`;

const CodeContainer = styled.div`
  background: var(--gray-900);
  border-radius: 10px;
  padding: 1rem;
  color: var(--surface-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray-50);
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin: 0.2rem 0;
  color: var(--gray-50);
`;

const glowAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const Glow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0rem;
  right: -8rem;
  background: radial-gradient(circle,
    rgba(255, 0, 0, 0.1) 0%,
    rgba(218, 108, 125, 0.1) 15%,
    rgba(218, 112, 214, 0.1) 30%,
    rgba(255, 255, 255, 0) 45%);
  z-index: -1;
  border-radius: 1rem;
  overflow: hidden;
  background-size: 200% 200%;
  animation: ${glowAnimation} 10s ease infinite;
`;

export { Home };