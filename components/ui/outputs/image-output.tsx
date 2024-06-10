import React from 'react';
import styled from 'styled-components';
import { DownloadButton } from '@/components/ui/icons/download';

interface ImageWithDownloadProps {
  image: string;
  onDownload: () => void;
}

const ImageWithDownload: React.FC<ImageWithDownloadProps> = ({ image, onDownload }) => {
  return (
    <ImageContainer>
      <Overlay />
      <StyledImage src={image} alt='Uploaded Image' />
      <DownloadContainer>
        <DownloadButton onClick={onDownload} />
      </DownloadContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  margin-top: 1.25rem;
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    & > div {
      opacity: 1;
    }
    & > img {
      opacity: 0.3;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.5rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
`;

const DownloadContainer = styled.div`
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  &:hover {
    opacity: 1;
  }
`;

export default ImageWithDownload;

