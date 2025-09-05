import React from 'react';

import { content } from '@/content/function-descriptions/generators-qr-code';
import { metaTags } from '@/content/meta-data/function-generators-qr-code';

import { BaseLayout } from '@/layouts/base-layout';
import { Title, Subtitle } from '@/components/ui/texts/typography';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { QRCodeGenerator } from '../../components/pages/generators/qr-code-generator';

const URLFormatterPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>QR Code Generator</Title>

        <Subtitle>Generate Free, Forever-Lasting, Unlimited QR Codes for Your URLs, Texts, and More</Subtitle>

        <QRCodeGenerator />
      </MainContainer>

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer>
    </BaseLayout>
  );
};

export default URLFormatterPage;
