import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';

import { FeatureCard } from './feature-card';
import { Container, FeaturesRow, Headline } from './common';
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
  },
  {
    href: Routes.ColorsGradientGeneratorTool,
    Icon: GradientGenerationIcon,
    title: 'Gradient Generator',
    description: 'Create stunning gradients for heatmaps, charts, and visual designs',
  },
  {
    href: Routes.ColorsPaletteFromImageTool,
    Icon: PaletteFromImageIcon,
    title: 'Palette From Image',
    description: 'Instantly create beautiful and harmonious color palettes or simply find inspiration',
  },
  {
    href: Routes.ColorsContrastCheckerTool,
    Icon: ContrastCheckerIcon,
    title: 'Color Contrast Checker',
    description: 'Check the contrast between colors for accessibility and readability',
  },
  {
    href: Routes.ColorsConverterTool,
    Icon: ColorConversionIcon,
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats with ease',
  },
  {
    href: Routes.ColorsInspectorTool,
    Icon: ColorInspectorIcon,
    title: 'Color Inspector',
    description: 'Inspect colors on your screen and get detailed color information',
  },
];

const ColorsSection: React.FC = () => {
  return (
    <Container>
      <Headline>{'{ COLORS TOOLS }'}</Headline>

      <FeaturesRow>
        {featureCardData.map((feature, index) => (
          <FeatureCard
            key={index}
            href={feature.href}
            icon={feature.Icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </FeaturesRow>
    </Container>
  );
};

export { ColorsSection };
