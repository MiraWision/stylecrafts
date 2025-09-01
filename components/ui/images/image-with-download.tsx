import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { DownloadIcon } from '@/components/icons/download';

interface Props {
  image: string;
  fileName?: string;
  className?: string;
  onDownloadCallback?: () => void;
  width?: string;
}

const ImageWithDownload: React.FC<Props> = ({
  image,
  fileName = 'image.jpeg',
  className,
  onDownloadCallback,
  width = '100%',
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
    <ImageContainer className={className} width={width}>
      <StyledImage src={image} alt="Uploaded Image" />

      <DownloadContainer>
        <Button onClick={onDownload} className="p-button-rounded p-button-primary">
          <DownloadIcon width="36" height="36" />
        </Button>
      </DownloadContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  max-width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  background: var(--surface-0, #fff);
  display: block;
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
    fill: #ffffff;
  }

  @media (max-width: 768px) {
    .p-button {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export { ImageWithDownload };