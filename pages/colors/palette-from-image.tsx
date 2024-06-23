import React, { useState } from 'react';
import { content } from '@/content/function-descriptions/colors-palette';
import { metaTags } from '@/content/meta-data/function-colors-palette';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { NPMLink } from '@/components/ui/texts/npm-link';
import { useToast } from '@/components/ui/toast';

import { PaletteFromImageComponent } from '@/components/pages/colors/palette-from-image';

const PaletteFromImage: React.FC = () => {
  const { toast } = useToast();

  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [userPalette, setUserPalette] = useState<string[]>([]);

  const handlePaletteChange = (newAutoPalette: string[], newUserPalette: string[]) => {
    setAutoPalette(newAutoPalette);
    setUserPalette(newUserPalette);
  };

  const handleRemoveColor = (index: number, paletteType: 'auto' | 'user') => {
    if (paletteType === 'auto') {
      const newPalette = [...autoPalette];
      newPalette.splice(index, 1);
      setAutoPalette(newPalette);
    } else {
      const newPalette = [...userPalette];
      newPalette.splice(index, 1);
      setUserPalette(newPalette);
    }
  };

  const handleRefreshPalette = () => {
    setUserPalette([]);
  };

  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Colors Palette from Image</Title>
        <Subtitle>Design Custom Color Palettes or Find Inspiration</Subtitle>

        <PaletteFromImageComponent
          autoPalette={autoPalette}
          userPalette={userPalette}
          handlePaletteChange={handlePaletteChange}
          handleRemoveColor={handleRemoveColor}
          handleRefreshPalette={handleRefreshPalette}
        />

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