import React from 'react';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer'
;
import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';

const ColorsSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();

  return (
    <Container ref={observerRef}>
      <Headline>Colors Features</Headline>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ColorsGradientGeneratorTool}
          isVisible={isVisible}
          imageSrc='/landing/gradient-generator.png'
          title='Gradient Generator'
          description='Create stunning gradients for heatmaps, charts, and visual designs'
        />

        <FeatureCard
          href={Routes.ColorsPaletteGeneratorTool}
          isVisible={isVisible}
          imageSrc='/landing/palette-generator.png'
          title='Palette Generator'
          description='Generate beautiful color palettes for your projects with our intuitive Palette Generator'
        />
      </FeaturesRow>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ColorsPaletteGeneratorTool}
          isVisible={isVisible}
          imageSrc='/landing/palette-generator.png'
          title='Palette Generator'
          description='Generate beautiful color palettes for your projects with our intuitive Palette Generator'
        />
        
        <FeatureCard
          href={Routes.ColorsPaletteGeneratorTool}
          isVisible={isVisible}
          imageSrc='/landing/palette-generator.png'
          title='Palette Generator'
          description='Generate beautiful color palettes for your projects with our intuitive Palette Generator'
        />
      </FeaturesRow>
    </Container>
  );
};

export { ColorsSection };
