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
          description='Instantly create beautiful and harmonious color palettes or simply find inspiration'
        />
      </FeaturesRow>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ColorsInspectorTool}
          isVisible={isVisible}
          imageSrc='/landing/color-mixer.png'
          title='Color Mixer'
          description='Blend colors seamlessly to find the perfect shade for your designs'
        />
        
        <FeatureCard
          href={Routes.ColorsConverterTool}
          isVisible={isVisible}
          imageSrc='/landing/color-converter.png'
          title='Color Converter'
          description='Convert colors between HEX, RGB, HSL, and CMYK formats with ease'
        />
      </FeaturesRow>
    </Container>
  );
};

export { ColorsSection };
