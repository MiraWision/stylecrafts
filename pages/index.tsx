import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/default';

import { MetaTags } from '@/components/pages/meta-tags';
import { HeroSection } from '@/components/pages/landing/hero-section';
import { ImagesSection } from '@/components/pages/landing/images-section';
import { ColorsSection } from '@/components/pages/landing/colors-section';
import { GeneratorsSection } from '@/components/pages/landing/generators-section';
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
    title: 'Generators',
    renderComponent: () => (<GeneratorsSection />),
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

  const handleScroll = () => {
    const sections = containerRef.current?.children;
    if (sections) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      let newCurrentSection = 0;
  
      Array.from(sections).forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top + scrollTop;
        const sectionHeight = section.clientHeight;
  
        if (scrollTop >= sectionTop - sectionHeight / 2) {
          newCurrentSection = index;
        }
      });
  
      if (scrollTop + viewportHeight >= documentHeight) {
        newCurrentSection = Sections.length - 1;
      }
  
      setCurrentSection(newCurrentSection);
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

        {Sections.map((section, index) => (
          <Section 
            key={section.title} 
            id={section.title} 
            $isFullHeight={false} 
            $isLast={index === Sections.length - 1}
          >
            {section.renderComponent()}
          </Section>
        ))}
      </MainContainer>

      <SlidesMenu 
        slidesCount={Sections.length}
        currentSlideIndex={currentSection}
        onSlideChange={scrollToSection}
      />
    </>
  );
};

const MainContainer = styled.div`
  scroll-behavior: smooth;
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const Section = styled.section.attrs<{ $isFullHeight?: boolean; $isLast?: boolean }>(({ $isFullHeight = true }) => ({
  style: {
    height: $isFullHeight ? '100vh' : 'auto',
  },
}))<{ $isLast?: boolean }>`
  width: 100%;
  display: flex;
  padding: ${({ $isLast }) => ($isLast ? '0' : '1.5rem')};
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${({ $isLast }) => ($isLast ? '0' : '1rem 0.5rem')};
  }
`;

export default HomePage;