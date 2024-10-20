import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer';
import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';
import { ExploreMoreButton } from './explore-more-button';

import { GradientGenerationIcon } from '@/components/icons/gradient-generation';
import { PaletteGenerationIcon } from '@/components/icons/palette-generation';
import { PaletteFromImageIcon } from '@/components/icons/palette-from-image';
import { ContrastCheckerIcon } from '@/components/icons/contrast-checker';
import { ColorConversionIcon } from '@/components/icons/color-conversion';
import { ColorInspectorIcon } from '@/components/icons/color-inspector';

const featureCardData = [
  {
    href: Routes.ColorsPaletteGeneratorTool,
    Icon: PaletteGenerationIcon,
    title: 'Palette Generator',
    description: 'Instantly create beautiful and harmonious color palettes or simply find inspiration',
    iconSize: '3rem',
  },
  {
    href: Routes.ColorsGradientGeneratorTool,
    Icon: GradientGenerationIcon,
    title: 'Gradient Generator',
    description: 'Create stunning gradients for heatmaps, charts, and visual designs',
    iconSize: '3rem',
  },
  {
    href: Routes.ColorsPaletteFromImageTool,
    Icon: PaletteFromImageIcon,
    title: 'Palette From Image',
    description: 'Instantly create beautiful and harmonious color palettes or simply find inspiration',
    iconSize: '3rem',
  },
];

const moreFeatureCardData = [
  {
    href: Routes.ColorStepsForHeatmapsBlog,
    Icon: ContrastCheckerIcon,
    title: 'Color Mixer',
    description: 'Blend colors seamlessly to find the perfect shade for your designs',
    iconSize: '3rem',
  },
  {
    href: Routes.ColorsConverterTool,
    Icon: ColorConversionIcon,
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats with ease',
    iconSize: '3rem',
  },
  {
    href: Routes.ColorsInspectorTool,
    Icon: ColorInspectorIcon,
    title: 'Color Inspector',
    description: 'Inspect colors on your screen and get detailed color information',
    iconSize: '3rem',
  },
];

const ColorsSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <StyledContainer ref={observerRef}>
      <StyledHeadline>{'{ COLORS FEATURES }'}</StyledHeadline>

      <StyledFeaturesRow>
        {featureCardData.map((feature, index) => (
          <FeatureCard
            key={index}
            href={feature.href}
            isVisible={isVisible}
            Icon={feature.Icon}
            title={feature.title}
            description={feature.description}
            iconSize={feature.iconSize}
          />
        ))}
      </StyledFeaturesRow>

      {showMore && (
        <StyledFeaturesRow>
          {moreFeatureCardData.map((feature, index) => (
            <FeatureCard
              key={index}
              href={feature.href}
              isVisible={isVisible}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
              iconSize={feature.iconSize}
            />
          ))}
        </StyledFeaturesRow>
      )}

      <ExploreMoreButton onClick={handleShowMoreClick} text={showMore ? "SHOW LESS" : "SHOW MORE"} absolutePosition={false} />
    </StyledContainer>
  );
};

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  position: relative;
`;

const StyledHeadline = styled(Headline)`
  color: #75468A;
`;

const StyledFeaturesRow = styled(FeaturesRow)`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
`;

export { ColorsSection };
