import React from 'react';
import { content } from '@/content/function-descriptions/colors-palette-from-image';
import { metaTags } from '@/content/meta-data/function-colors-palette-from-image';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { NPMLink } from '@/components/ui/texts/npm-link';

import { PaletteFromImageMain } from '@/components/pages/colors/palette-from-image';

const PaletteFromImage: React.FC = () => {
  

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Extract Color Palettes from Images</Title>
        <Subtitle>Generate beautiful color palettes by analyzing your images for design inspiration</Subtitle>

        <PaletteFromImageMain />

        <NPMLink
          text="Need to have color tools like these in your app? Feel free to use our NPM package"
          packageName="@mirawision/colorize"
        />
      </MainContainer>

      <BlogContainer>
        <Markdown markdownText={content} />
      </BlogContainer>
    </BaseLayout>
  );
};

export default PaletteFromImage;