import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { useToast } from '@/components/ui/toast';

import { ImageData, ImageInput } from '@/components/ui/inputs/image-input';
import { SingleColumnContainer } from '@/components/ui/containers';
import { TextareaWithCopy } from '@/components/ui/inputs/textarea-with-copy';

interface Props {
}

const ImageToBase64: React.FC<Props> = ({}) => {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);

  const callback = {
    onSuccess: (message: string) => toast.success(message, ''),
    onFail: undefined,
  }

  const handleImageChange = (image: ImageData) => {
    setImage(image.content);
    
    GAService.logEvent(analyticsEvents.imageConverter.imageUploaded('Image Uploaded'));
  }

  const handleCopyEvent = (label: string) => {
    GAService.logEvent(analyticsEvents.copyActions.textCopied(label));
  }

  return (
    <SingleColumnContainer>
      <ImageInputStyled 
        value={image}
        onChange={handleImageChange} 
      />

      <TextareaWithCopy
        value={image ?? ''}
        copyOptions={[
          { 
            name: 'Copy base64', 
            getValue: (text) => text, 
            onSuccess: () => {
              callback.onSuccess('Base64 Content copied to clipboard');
              handleCopyEvent('Base64 Content');
            },
            onFail: callback.onFail,
          },
          { 
            name: 'Copy to HTML', 
            getValue: (text) => `<img src="${text}" alt="Image"/>`, 
            onSuccess: () => {
              callback.onSuccess('HTML Image copied to clipboard');
              handleCopyEvent('HTML Image');
            },
            onFail: callback.onFail,
          },
          { 
            name: 'Copy to CSS', 
            getValue: (text) => `background-image: url('${text}');`, 
            onSuccess: () => {
              callback.onSuccess('CSS Style copied to clipboard');
              handleCopyEvent('CSS Style');
            },
            onFail: callback.onFail,
          },
        ]}
      />          
    </SingleColumnContainer>
  );
}

const ImageInputStyled = styled(ImageInput)`
  width: 20rem;
  min-height: 10rem;
`;

export { ImageToBase64 };