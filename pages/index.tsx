import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { metaTags } from '@/content/meta-data/default';

import { MetaTags } from '@/components/pages/meta-tags';
import { HeroSection } from '@/components/pages/landing/hero-section';
import { FeaturesSection } from '@/components/pages/landing/features-section';
import { NpmToolsSection } from '@/components/pages/landing/npm-tools-section';
import { Footer } from '@/components/pages/landing/footer';
import { ThemeButton } from '@/components/ui/buttons/theme-button';

const Sections = [
  {
    title: 'Hero',
    renderComponent: () => (<HeroSection />),
  },
  {
    title: 'Features',
    renderComponent: () => (<FeaturesSection />),
  },
  {
    title: 'Npm Tools',
    renderComponent: () => (<NpmToolsSection />),
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
  const isScrolling = useRef(false);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < Sections.length) {
      const targetSection = containerRef.current?.children?.[index];

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      
        setCurrentSection(index);
      }
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();

    if (isScrolling.current) return;

    if (Math.abs(event.deltaY) < 20) return;

    isScrolling.current = true;

    if (event.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else {
      scrollToSection(currentSection - 1);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isScrolling.current) return;

    isScrolling.current = true;

    if (event.key === 'ArrowDown') {
      scrollToSection(currentSection + 1);
    } else if (event.key === 'ArrowUp') {
      scrollToSection(currentSection - 1);
    }

    event.preventDefault();

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };

  useEffect(() => {
    const container = containerRef.current;
    
    // @ts-ignore
    container?.addEventListener('wheel', handleWheel, { passive: false });
    
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // @ts-ignore
      container?.removeEventListener('wheel', handleWheel);
      
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  return (
    <>
      <MetaTags {...metaTags} />

      <ThemeButton />

      <MainContainer ref={containerRef}>
        {Sections.map((section) => (
          <Section key={section.title} id={section.title} isFullHeight={section.isFullHeight}>
            {section.renderComponent()}
          </Section>
        ))}
      </MainContainer>
    </> 
  );
}

const MainContainer = styled.div`
  scroll-behavior: smooth;
  overflow-y: hidden;
  height: 100vh;
`;

const Section = styled.section<{ isFullHeight?: boolean }>`
  height: ${({ isFullHeight = true }) => isFullHeight ? '100vh' : 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default HomePage;