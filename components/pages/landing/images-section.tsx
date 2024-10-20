import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Routes } from '@/content/routes';
import { useObserver } from '@/hooks/use-observer';

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
    iconSize: '3rem',
  },
  {
    href: Routes.ImageToBase64Tool,
    Icon: ImageToBase64Icon,
    title: 'Image to Base64 Converter',
    description: 'Convert images to Base64 format for easy embedding in your code',
    iconSize: '3rem',
  },
  {
    href: Routes.Base64ToImageTool,
    Icon: Base64ToImageIcon,
    title: 'Base64 to Image Converter',
    description: 'Decode Base64 strings to view and download the original images',
    iconSize: '3rem',
  },
];

const ImagesSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();

  return (
    <StyledContainer ref={observerRef}>
      <StyledHeadline>{'{ IMAGES FEATURES }'}</StyledHeadline>

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
  align-items: flex-start;
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

export { ImagesSection };
