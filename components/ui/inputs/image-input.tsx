import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ImageType } from '@/types/image-types';
import { UploadIcon } from '@/components/icons/upload';
import { Button } from 'primereact/button';

interface ImageData {
  content: string | null;
  fileMetaData?: {
    name: string;
    type: ImageType;
    size: number;
    lastModified: number;
  };
}

interface Props {
  value: string | null;
  onChange: (image: ImageData) => void;
  className?: string;
}

const ImageInput: React.FC<Props> = ({ value, onChange, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      onChange({
        content: e.target?.result as string,
        fileMetaData: {
          name: file.name,
          // @ts-ignore
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/tiff',
        'image/gif',
        'image/avif',
        'image/heif',
      ];
      if (validTypes.includes(file.type)) {
        handleFileRead(file);
      } else {
        alert('Unsupported file format. Please upload a valid image file.');
      }
      event.target.value = '';
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();
          if (blob) {
            const validTypes = [
              'image/jpeg',
              'image/png',
              'image/webp',
              'image/tiff',
              'image/gif',
              'image/avif',
              'image/heif',
            ];
            if (validTypes.includes(blob.type)) {
              handleFileRead(blob);
            } else {
              alert('Unsupported file format. Please upload a valid image file.');
            }
          }
          break;
        }
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/tiff',
        'image/gif',
        'image/avif',
        'image/heif',
      ];
      if (validTypes.includes(file.type)) {
        handleFileRead(file);
      } else {
        alert('Unsupported file format. Please upload a valid image file.');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    // @ts-ignore
    document.addEventListener('dragover', handleDragOver, false);
    // @ts-ignore
    document.addEventListener('dragleave', handleDragLeave, false);
    // @ts-ignore
    document.addEventListener('drop', handleDrop, false);

    return () => {
      document.removeEventListener('paste', handlePaste);
      // @ts-ignore
      document.removeEventListener('dragover', handleDragOver, false);
      // @ts-ignore
      document.removeEventListener('dragleave', handleDragLeave, false);
      // @ts-ignore
      document.removeEventListener('drop', handleDrop, false);
    };
  }, []);

  const handleContainerClick = () => {
    if (!value) {
      triggerFileInputClick();
    }
  };

  return (
    <Container
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick}
    >
      {isDragging && (
        <Overlay>
          <Text><b>Just drop it anywhere!</b></Text>
        </Overlay>
      )}

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/tiff,image/gif,image/avif,image/heif"
        onChange={handleInputChange}
      />

      {value && isHovered && (
        <>
          <Overlay />
          <ButtonWrapper>
            <Button onClick={triggerFileInputClick} className="p-button-rounded p-button-primary">
              <UploadIcon width="36" height="36" />
            </Button>
          </ButtonWrapper>
        </>
      )}

      {value ? (
        <ImageWrapper>
          <Image src={value} alt="uploaded" />
        </ImageWrapper>
      ) : (
        <Label>
          <UploadIcon width="48" height="48" />
          <Text>
            <b>Upload your image</b>
            <br />
            Click here to select a file, or drop it on the page, or just copy-paste it!
          </Text>
        </Label>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 20rem;
  position: relative;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  .icon * {
    fill: var(--surface-500);
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Text = styled.div`
  text-align: center;
  font-size: 0.875rem;
  margin: 0.5rem;
  line-height: 1.5;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

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
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

export { ImageInput };
export type { ImageData };