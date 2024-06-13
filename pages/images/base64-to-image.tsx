import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { content } from '@/content/function-descriptions/base64-to-image';
import { MetaTagsPage } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/function-base64-to-image';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { Markdown } from '@/components/ui/markdown';
import { PostContainer } from '@/components/ui/post';
import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { Title } from '@/components/ui/typography';
import { TextareaWithCopy } from '@/components/ui/textarea-with-copy';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';

const Base64ToImageToolPage = () => {
  const [base64Text, setBase64Text] = useState<string>('');

  const toast = useRef<Toast>(null);

  const onChange = (value: string) => {
    setBase64Text(value);
  };

  return (
    <BaseLayout>
      <MetaTagsPage {...metaTags} />
      <Toast ref={toast} position='top-right' />

      <MainContainer>
        <Title>Base64 to Image Convertor</Title>
  
        <SingleColumnContainer>
          <TextareaWithCopy
            value={base64Text}
            // @ts-ignore
            onChange={onChange}
            placeholder='Paste Base64 text here...'
          />

          {base64Text.length > 0 
            ? (
              <ImageWithDownload 
                image={base64Text} 
                fileName={`image.${base64Text.split(';')[0].split('/')[1]}`}
              />
            )
            : (
              <ImagePlaceholder />
            )
          }
        </SingleColumnContainer>
      </MainContainer>
      
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer>
    </BaseLayout>
  );
};

const ImageSizeText = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledInputText = styled(InputTextarea)`
  width: 50%;
  min-height: 6rem;
  max-height: 18rem;
`;

export default Base64ToImageToolPage;