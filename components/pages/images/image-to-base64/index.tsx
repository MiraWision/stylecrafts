import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { useToast } from '@/components/ui/toast';

import { ImageData, ImageInput } from '@/components/ui/inputs/image-input';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { TextareaWithCopy } from '@/components/ui/inputs/textarea-with-copy';
import { UploadTextButton } from '@/components/ui/text-buttons/upload-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links';

interface Props {
}

export const ImageToBase64: React.FC<Props> = ({}) => {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);

  const callback = {
    onSuccess: (message: string) => toast.success('Copied!', message),
    onFail: undefined,
  }

  const handleImageChange = (image: ImageData) => {
    setImage(image.content);
  
    if (image.content?.length) {
      GAService.logEvent(analyticsEvents.images.imageToBase64.imageConverted(image.content.length.toString()));
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <TwoColumnsContainer>
        <ImageInputContainer>
          <ImageInputStyled 
            value={image}
            onChange={handleImageChange} 
          />
          <UploadButtonContainer>
            <UploadTextButton 
              text='Upload Image'
              onFileSelect={handleFileSelect}
            />
          </UploadButtonContainer>
        </ImageInputContainer>

        <TextareaWithCopy
          value={image ?? ''}
          copyOptions={[
            { 
              name: 'Copy Base64', 
              getValue: (text) => text, 
              onSuccess: () => {
                callback.onSuccess('Base64 copied to clipboard');

                GAService.logEvent(analyticsEvents.images.imageToBase64.imageCopied(image?.length?.toString() ?? '0'));
              },
              onFail: callback.onFail,
            },
            { 
              name: 'Copy to HTML', 
              getValue: (text) => `<img src="${text}" alt="Image"/>`, 
              onSuccess: () => {
                callback.onSuccess('HTML copied to clipboard');

                GAService.logEvent(analyticsEvents.images.imageToBase64.imageCopiedToHTML(image?.length?.toString() ?? '0'));
              },
              onFail: callback.onFail,
            },
            { 
              name: 'Copy to CSS', 
              getValue: (text) => `background-image: url('${text}');`, 
              onSuccess: () => {
                callback.onSuccess('CSS copied to clipboard');

                GAService.logEvent(analyticsEvents.images.imageToBase64.imageCopiedToCSS(image?.length?.toString() ?? '0'));
              },
              onFail: callback.onFail,
            },
          ]}
        />          
      </TwoColumnsContainer>

      <ToolCrossLinks
        toolKey="image-to-base64"
        title="Explore More Image Tools"
      />
    </>
  );
}

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInputStyled = styled(ImageInput)`
  width: 20rem;
  min-height: 10rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UploadButtonContainer = styled.div`
  text-align: center;
  margin: 0.5rem 0;
`;
