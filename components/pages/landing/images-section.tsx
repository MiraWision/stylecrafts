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
          href={Routes.ImageCompressionTool}
          isVisible={isVisible}
          imageSrc='/landing/image-compression.png'
          title='Image Compression'
          description='Achieve up to 99% image compression for faster website loading and improved performance'
        />
      </FeaturesRow>

      <FeaturesRow>
        <FeatureCard
          href={Routes.ImageToBase64Tool}
          isVisible={isVisible}
          imageSrc='/landing/image-to-base64.png'
          title='Image to Base64 Converter'
          description='Convert images to Base64 format for easy embedding in your code'
        />

        <FeatureCard
          href={Routes.Base64ToImageTool}
          isVisible={isVisible}
          imageSrc='/landing/base64-to-image.png'
          title='Base64 to Image Converter'
          description='Decode Base64 strings to view and download the original images'
        />
      </FeaturesRow>
    </Container>
  );
};

export { ImagesSection };
