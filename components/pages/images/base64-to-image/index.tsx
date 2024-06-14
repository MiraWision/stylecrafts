import React, { useState, useEffect } from 'react';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageWithDownload } from '@/components/ui/outputs/image-with-download';
import { SingleColumnContainer } from '@/components/ui/containers';
import { TextareaWithCopy } from '@/components/ui/inputs/textarea-with-copy';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';

interface Props {
}

const Base64ToImage: React.FC<Props> = ({}) => {
  const [base64Text, setBase64Text] = useState<string>('');

  const onChange = (value: string) => {
    setBase64Text(value);
    
    GAService.logEvent(analyticsEvents.imageConverter.base64Converted('Base64 Text Entered'));
  };

  useEffect(() => {
    if (base64Text.length > 0) {
      GAService.logEvent(analyticsEvents.imageConverter.imageUploaded('Image Displayed'));
    }
  }, [base64Text]);

  return (
    <SingleColumnContainer>
      <TextareaWithCopy
        value={base64Text}
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
  );
}

export { Base64ToImage };