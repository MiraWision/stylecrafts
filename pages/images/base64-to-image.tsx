import { content } from '@/content/function-descriptions/base64-to-image';
import { metaTags } from '@/content/meta-data/function-base64-to-image';

import { BaseLayout } from '@/layouts/base-layout';
import { Markdown } from '@/components/ui/texts/markdown';
import { MetaTags } from '@/components/pages/meta-tags';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { MainContainer } from '@/components/ui/containers';
import { Subtitle, Title } from '@/components/ui/texts/typography';
import { Base64ToImage } from '@/components/pages/images/base64-to-image';

const Base64ToImageToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Base64 to Image Converter</Title>

        <Subtitle>Decode Base64 Strings to Images</Subtitle>
  
        <Base64ToImage />
      </MainContainer>
      
      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer>
    </BaseLayout>
  );
};

export default Base64ToImageToolPage;