import React from 'react';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer';

import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';

const ImagesSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();

  return (
    <Container ref={observerRef}>
      <Headline>Images Features</Headline>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ImageOptimizationTool}
          isVisible={isVisible}
          imageSrc='/landing/image-optimization.png'
          title='Image Optimization'
          description='Achieve up to 99% image optimization for faster website loading and improved performance'
        />
      </FeaturesRow>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ImageToBase64Tool}
          isVisible={isVisible}
          imageSrc='/landing/image-to-base64.png'
          title='Image to Base64 Converter'
          description='Create stunning gradients for heatmaps, charts, and visual designs'
        />

        <FeatureCard
          href={Routes.Base64ToImageTool}
          isVisible={isVisible}
          imageSrc='/landing/base64-to-image.png'
          title='Base64 to Image Converter'
          description='Convert images to base64 and vice versa, switch between multiple color formats and many other useful tools'
        />
      </FeaturesRow>
    </Container>
  );
};

export { ImagesSection };
