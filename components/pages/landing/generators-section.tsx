import React from 'react';
import styled from 'styled-components';

import { Routes } from '@/content/routes';

import { FeatureCard } from './feature-card';
import { Container, FeaturesRow, Headline } from './common';
import { QRCodeGeneratorIcon } from '@/components/icons/qr-code-generator';
import { LoremIpsumGeneratorIcon } from '@/components/icons/lorem-ipsum-generator';

const featureCardData = [
  {
    href: Routes.GeneratorsQRCode,
    Icon: QRCodeGeneratorIcon,
    title: 'QR Code Generator',
    description: 'Generate QR codes for your website, business card, or any other use case',
  },
  {
    href: Routes.GeneratorsLoremIpsum,
    Icon: LoremIpsumGeneratorIcon,
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs or websites',
  },
];

const GeneratorsSection: React.FC = () => {
  return (
    <Container>
      <Headline>{'{ GENERATORS }'}</Headline>

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

export { GeneratorsSection };
