import { useState, useRef } from 'react';
import styled from 'styled-components';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import TopBarMenu from '@/components/menu/top-menu';
import LandingLogo from '@/components/ui/landing-logo';
import GlassCard from '@/components/ui/glass-card';
import { Button } from 'primereact/button';

const Home = () => {
  const toast = useRef<Toast>(null);

  return (
    <BaseLayout>
      <Toast ref={toast} />

      <SectionContainer>
        <TopBarMenu />
        <Grid>
          <LeftColumn>
          <GlassCard largeText='7+' smallText='SERVICES' index={0} />
            <GlassCard largeText='100+' smallText='REVIEWS' index={1} />
            <GlassCard largeText='100k+' smallText='CONVERTATIONS' index={2} />
          </LeftColumn>

          <CentralColumn>
            <LandingLogo />
            <TextBlock>  
              <TextLine>Seamlessly convert colors, manipulate images,</TextLine>
              <TextLine>and more with our cutting-edge tools.</TextLine>
            </TextBlock>
            <StyledButton>GET STARTED</StyledButton>
          </CentralColumn>
          <RightColumn>
            <RightGlow />
          </RightColumn>
        </Grid>
      </SectionContainer>   
      <SectionContainer>
      </SectionContainer>  
    </BaseLayout>
  );
}

export default Home;

const SectionContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

const LeftGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -40rem;
  background: radial-gradient(circle, var(--primary-color) 0%, rgba(255, 255, 255, 0) 45%);
  z-index: -10;
  border-radius: 1rem;
  overflow: hidden;
`;

const RightGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 10rem;
  right: -55rem;
  background: radial-gradient(circle, var(--pink-400) 0%, rgba(255, 255, 255, 0) 45%);
  z-index: -1;
  border-radius: 1rem;
  overflow: hidden;
`;