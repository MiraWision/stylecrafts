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
  const isScrolling = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < Sections.length + 1) {
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

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const handleTouchEnd = (event: TouchEvent) => {
    touchEndY.current = event.changedTouches[0].clientY;

    if (isScrolling.current || touchStartY.current === null || touchEndY.current === null) return;

    isScrolling.current = true;

    const touchDifference = touchStartY.current - touchEndY.current;

    if (Math.abs(touchDifference) > 20) {
      if (touchDifference > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    }

    touchStartY.current = null;
    touchEndY.current = null;

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
    
    container?.addEventListener('touchstart', handleTouchStart, { passive: false });
    container?.addEventListener('touchmove', handleTouchMove, { passive: false });
    container?.addEventListener('touchend', handleTouchEnd);

    return () => {
      // @ts-ignore
      container?.removeEventListener('wheel', handleWheel);
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDown);
      
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection]);

  return (
    <>
      <MetaTags {...metaTags} />

      <BaseLayout includeFooter={false}>
        <MainContainer ref={containerRef}>      
          <Section id='Hero' $isFullHeight>
            <HeroSection onScrollToNextSection={() => scrollToSection(1)} />
          </Section>

          {Sections.map((section) => (
            <Section key={section.title} id={section.title} $isFullHeight={section.isFullHeight}>
              {section.renderComponent()}
            </Section>
          ))}
        </MainContainer>

        <SlidesMenu 
          slidesCount={Sections.length + 1}
          currentSlideIndex={currentSection}
          onSlideChange={scrollToSection}
        />
      </BaseLayout>
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
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default HomePage;