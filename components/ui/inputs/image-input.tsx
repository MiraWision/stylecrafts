import React, { useEffect, useState } from 'react';
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
  }
}

interface Props {
  value: string | null;
  onChange: (image: ImageData) => void;
  className?: string;
}

const ImageInput: React.FC<Props> = ({ value, onChange, className }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const setImage = (value: string, file?: File) => {
    onChange({
      content: value?.toString() ?? null,
      fileMetaData: file ? {
        name: file.name,
        type: file.type as ImageType,
        size: file.size,
        lastModified: file.lastModified,
      } : undefined,
    });
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      setImage(e.target?.result as string, file);
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif', 'image/avif', 'image/heif'];
      
      if (validTypes.includes(file.type)) {
        handleFileRead(file);
      } else {
        alert('Unsupported file format. Please upload a valid image file.');
      }
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();

          if (blob) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif', 'image/avif', 'image/heif'];
            
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
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif', 'image/avif', 'image/heif'];
      
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

  const triggerFileInputClick = () => {
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement) {
      input.click();
    }
  };

  return (
    <Container 
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDragging && (
        <Overlay>
          <Text><b>Just drop it anywhere!</b></Text>
        </Overlay>
      )}

      {value && isHovered && (
        <Overlay>
          <Button 
            className="p-button-rounded p-button-primary" 
            onClick={triggerFileInputClick}
          >
            <UploadIcon width="36" height="36" />
          </Button>
        </Overlay>
      )}

      {!isDragging && (
        <Label>
          {value && (
            <Image src={value} alt='uploaded' />
          )}

          {!value && (
            <>
              <UploadIcon width='48' height='48' />
              <Text><b>Upload your image</b><br />Click here to select a file, or drop it on a page, or just copy-paste it!</Text>
            </>
          )}
        
          <input type='file' accept='image/jpeg,image/png,image/webp,image/tiff,image/gif,image/avif,image/heif' style={{ display: 'none' }} onChange={handleInputChange} />
        </Label>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 20rem;
  min-height: 10rem;
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
    stroke: var(--surface-500);
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

export { ImageInput };

export type { ImageData };
