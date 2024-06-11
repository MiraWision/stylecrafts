import React from 'react';
import styled from 'styled-components';
import { DownloadButton } from '@/components/ui/buttons/download';

interface Props {
  image?: string;
  onDownload: () => void;
  topText?: string;
  bottomText?: string;
  showOptimization?: boolean;
  showDownload?: boolean;
  isCanvas?: boolean;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

const ImageWithDownload: React.FC<Props> = ({
  image,
  onDownload,
  topText,
  bottomText,
  showOptimization,
  showDownload = true,
  isCanvas = false,
  canvasRef
}) => {
  return (
    <ImageContainer showDownload={showDownload}>
      <Overlay />

      {topText && <TextOverlayTop>{topText}</TextOverlayTop>}
      {bottomText && <TextOverlayBottom>{bottomText}</TextOverlayBottom>}
      {showOptimization && <OptimizationTag>x45 Optimize</OptimizationTag>}

      {!isCanvas && <StyledImage src={image} alt='Uploaded Image' />}
      {isCanvas && canvasRef && <StyledCanvas ref={canvasRef} />}

      {showDownload && (
        <DownloadContainer>
          <DownloadButton onClick={onDownload} />
        </DownloadContainer>
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div<{ showDownload: boolean }>`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${({ showDownload }) =>
    showDownload &&
    `
    &:hover {
      & > div {
        opacity: 1;
      }

      & > img {
        opacity: 0.3;
      }
    }
  `}
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

const TextOverlayTop = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 10;
  font-size: 1rem;
`;

const TextOverlayBottom = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 10;
  font-size: 1rem;
`;

const OptimizationTag = styled.div`
  position: absolute;
  top: 4.5rem;
  left: -1.7rem;
  background: var(--primary-color);
  color: var(--gray-50);
  padding: 0.5rem 2rem;
  border-radius: 0 0 5px 0;
  z-index: 10;
  font-size: 0.9rem;
  transform: rotate(-40deg);
  transform-origin: 0 0;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
`;

const StyledCanvas = styled.canvas`
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

export { ImageWithDownload };
