import React, { useState } from 'react';
import styled from 'styled-components';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageWithDownload } from '@/components/ui/images/image-with-download';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { TextareaWithCopy } from '@/components/ui/inputs/textarea-with-copy';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { DownloadTextButton } from '@/components/ui/text-buttons/download-text-button';
import { ToolCrossLinks } from '@/components/ui/cross-links';

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
    GAService.logEvent(analyticsEvents.images.base64ToImage.imageDownloaded(base64Text.length.toString()));
  };

  return (
    <>
      <StyledTwoColumnsContainer>
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
      </StyledTwoColumnsContainer>
      
      <ToolCrossLinks
        toolKey="base64-to-image"
        title="Explore More Image Tools"
      />
    </>
  );
}

const StyledTwoColumnsContainer = styled(TwoColumnsContainer)`
  align-items: stretch;
  
  & > * {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    row-gap: 1.5rem;
    & > * {
      min-height: 12rem;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 10rem;
`;

const DownloadButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export { Base64ToImage };
