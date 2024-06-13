import React from 'react';
import styled from 'styled-components';
import { DownloadButton } from '@/components/ui/buttons/download-button';

interface Props {
  image: string;
  fileName?: string;
  className?: string;
}

const ImageWithDownload: React.FC<Props> = ({
  image,
  fileName = 'image.jpeg',
  className,
}) => {
  const onDownload = () => {
    const link = document.createElement('a');

    link.href = image;
    
    link.download = fileName;
    
    document.body.appendChild(link);

    link.click();
    
    document.body.removeChild(link);
  };

  return (
    <ImageContainer className={className}>
      <StyledImage src={image} alt='Uploaded Image' />

      <DownloadContainer>
        <DownloadButton onClick={onDownload} />
      </DownloadContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  min-width: 5rem;
  min-height: 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-width: 20rem;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
`;

const DownloadContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

export { ImageWithDownload };
