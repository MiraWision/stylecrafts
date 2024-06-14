import { content } from '@/content/function-descriptions/image-to-base64';
import { metaTags } from '@/content/meta-data/function-image-to-base64';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { MainContainer } from '@/components/ui/containers';
import { BlogContainer } from '@/components/pages/blog/blog-container';
import { Markdown } from '@/components/ui/texts/markdown';
import { Title } from '@/components/ui/texts/typography';
import { ImageToBase64Converter } from '@/components/pages/images/image-to-base64/image-to-base64-converter';

const ImageToBase64ToolPage = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      
      <MainContainer>
        <Title>Image to Base64 Converter</Title>
  
        <ImageToBase64Converter />
      </MainContainer>   

      <BlogContainer>
        <Markdown 
          markdownText={content}
        />
      </BlogContainer> 
    </BaseLayout>
  );
};

export default ImageToBase64ToolPage;
