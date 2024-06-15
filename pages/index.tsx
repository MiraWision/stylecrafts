import React from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/default';

import { MetaTags } from '@/components/pages/meta-tags';
import { HeroSection } from '@/components/pages/landing/hero-section';
import { FeaturesSection } from '@/components/pages/landing/features-section';
import { NpmToolsSection } from '@/components/pages/landing/npm-tools-section';
import { Footer } from '@/components/pages/landing/footer';

const HomePage: React.FC = () => (
  <>
    <MetaTags {...metaTags} />

    <MainContainer>
      <HeroSection />

      <FeaturesSection />
      
      <NpmToolsSection />
      
      <Footer />
    </MainContainer>
  </>
);

const MainContainer = styled.div`
  scroll-behavior: smooth;
`;

export default HomePage;