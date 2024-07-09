import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { DownloadIcon } from '@/components/icons/download';

interface Props {
  image: string;
  fileName?: string;
  className?: string;
  onDownloadCallback?: () => void;
}

const ImageWithDownload: React.FC<Props> = ({
  image,
  fileName = 'image.jpeg',
  className,
  onDownloadCallback,
}) => {
  const onDownload = () => {
    const link = document.createElement('a');

    link.href = image;
    
    link.download = fileName;
    
    document.body.appendChild(link);

    link.click();
    
    document.body.removeChild(link);

    if (onDownloadCallback) {
      onDownloadCallback();
    }
  };

  return (
    <ImageContainer className={className}>
      <StyledImage src={image} alt='Uploaded Image' />

      <DownloadContainer>
        <Button 
          onClick={onDownload} 
          className='p-button-rounded p-button-primary' 
        >
          <DownloadIcon width='36' height='36' />
        </Button>
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

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
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

  .p-button {
    width: 4rem;
    height: 4rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary-color);
    border: none;
  }

  .icon * {
    stroke: #ffffff;
  }

  @media (max-width: 768px) {
    .p-button {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export { ImageWithDownload };
