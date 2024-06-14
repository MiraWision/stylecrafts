import { content } from '@/content/function-descriptions/base64-to-image';
import { MetaTags } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/function-base64-to-image';

import { BaseLayout } from '@/layouts/base-layout';
import { Markdown } from '@/components/ui/texts/markdown';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { MainContainer } from '@/components/ui/containers';
import { Title } from '@/components/ui/texts/typography';
import { Base64ToImageConverter } from '@/components/pages/images/base64-to-image/base64-to-image-converter';

const Base64ToImageToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />

      <MainContainer>
        <Title>Base64 to Image Convertor</Title>
  
        <Base64ToImageConverter />
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