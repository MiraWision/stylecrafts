import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/default';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { HeroSection } from '@/components/pages/landing/hero-section';
import { ImagesSection } from '@/components/pages/landing/images-section';
import { ColorsSection } from '@/components/pages/landing/colors-section';
import { NpmToolsSection } from '@/components/pages/landing/npm-tools-section';
import { Footer } from '@/components/pages/landing/footer';
import { CheatsheetsSection } from '@/components/pages/landing/cheatsheets-section';
import { ColorMixingSection } from '@/components/pages/landing/color-mixing-section';
import { SlidesMenu } from '@/components/pages/landing/slides-menu';

const Sections = [
  {
    title: 'Colors',
    renderComponent: () => (<ColorsSection />),
  },
  {
    title: 'Images',
    renderComponent: () => (<ImagesSection />),
  },
  {
    title: 'Cheatsheets',
    renderComponent: () => (<CheatsheetsSection />),
  },
  {
    title: 'Npm Tools',
    renderComponent: () => (<NpmToolsSection />),
  },
  {
    title: 'Color Mixing',
    renderComponent: () => (<ColorMixingSection />),
  },
  {
    title: 'Footer',
    renderComponent: () => (<Footer />),
    isFullHeight: false,
  },
];

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < Sections.length + 1) {
      const targetSection = containerRef.current?.children?.[index];

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        setCurrentSection(index);
      }
    }
  };

  return (
    <>
      <MetaTags {...metaTags} />

        <MainContainer ref={containerRef}>      
          <Section id='Hero' $isFullHeight>
            <HeroSection />
          </Section>

          {Sections.map((section) => (
            <Section key={section.title} id={section.title} $isFullHeight={false}>
              {section.renderComponent()}
            </Section>
          ))}
        </MainContainer>

        <SlidesMenu 
          slidesCount={Sections.length + 1}
          currentSlideIndex={currentSection}
          onSlideChange={scrollToSection}
        />

    </> 
  );
};

const MainContainer = styled.div`
  scroll-behavior: smooth;
  width: calc(100% + 3rem);
  height: 100vh;
  margin: -1.5rem;
`;

const Section = styled.section.attrs<{ $isFullHeight?: boolean }>(({ $isFullHeight = true }) => ({
  style: {
    height: $isFullHeight ? '100vh' : 'auto',
  },
}))`
  width: 100%;
  display: flex;
  padding: 1.5rem;
  justify-content: center;
  overflow: hidden;
`;

export default HomePage;