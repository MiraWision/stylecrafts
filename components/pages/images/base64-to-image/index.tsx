import React, { useState } from 'react';
import styled from 'styled-components';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageWithDownload } from '@/components/ui/images/image-with-download';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { TextareaWithCopy } from '@/components/ui/inputs/textarea-with-copy';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';

interface Props {
}

const Base64ToImage: React.FC<Props> = ({}) => {
  const [base64Text, setBase64Text] = useState<string>('');

  const onChange = (value: string) => {
    setBase64Text(value);
    
    if (value.length > 0) {
      GAService.logEvent(analyticsEvents.images.base64ToImage.imageConverted(value.length.toString()));
    }
  };

  const onDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Text.split(',')[1]}`;
    link.download = `image.${base64Text.split(';')[0].split('/')[1]}`;
    link.click();

    GAService.logEvent(analyticsEvents.images.base64ToImage.imageDownloaded(base64Text.length.toString()));
  };

  return (
    <TwoColumnsContainer>
      <TextareaWithCopy
        value={base64Text}
        onChange={onChange}
        placeholder='Paste Base64 text here...'
      />

      {base64Text.length > 0 
        ? (
          <ImageContainer>
            <ImageWithDownload 
              image={base64Text} 
              fileName={`image.${base64Text.split(';')[0].split('/')[1]}`}
              onDownloadCallback={onDownload}
            />
            <DownloadButtonContainer>
              <DownloadTextButton
                text='Download Image'
                onClick={onDownload}
              />
            </DownloadButtonContainer>
          </ImageContainer>
        )
        : (
          <ImagePlaceholder />
        )
      }
    </TwoColumnsContainer>
  );
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DownloadButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export { Base64ToImage };
