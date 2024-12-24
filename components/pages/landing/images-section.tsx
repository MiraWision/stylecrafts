import React from 'react';

import { Routes } from '@/content/routes';

import { Container, FeaturesRow, Headline } from './common';
import { FeatureCard } from './feature-card';

import { ImageCompressionIcon } from '@/components/icons/image-compression';
import { ImageToBase64Icon } from '@/components/icons/image-to-base64';
import { Base64ToImageIcon } from '@/components/icons/base64-to-image';

const featureCardData = [
  {
    href: Routes.ImageCompressionTool,
    Icon: ImageCompressionIcon,
    title: 'Image Compression',
    description: 'Achieve up to 99% image compression for faster website loading and improved performance',
  },
  {
    href: Routes.ImageToBase64Tool,
    Icon: ImageToBase64Icon,
    title: 'Image to Base64 Converter',
    description: 'Convert images to Base64 format for easy embedding in your code',
  },
  {
    href: Routes.Base64ToImageTool,
    Icon: Base64ToImageIcon,
    title: 'Base64 to Image Converter',
    description: 'Decode Base64 strings to view and download the original images',
  },
];

const ImagesSection: React.FC = () => {
  return (
    <Container>
      <Headline>{'{ IMAGES FEATURES }'}</Headline>

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

export { ImagesSection };
