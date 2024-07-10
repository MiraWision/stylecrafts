import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ImageType } from '@/types/image-types';
import { UploadIcon } from '@/components/icons/upload';

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

const ImageInputMini: React.FC<Props> = ({ value, onChange, className }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
      handleFileRead(files[0]);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();

          if (blob) {
            handleFileRead(blob);
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
      handleFileRead(files[0]);
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
    
    document.addEventListener('dragleave', handleDragLeave, false);
    // @ts-ignore
    document.addEventListener('drop', handleDrop, false);

    return () => {
      document.removeEventListener('paste', handlePaste);
      // @ts-ignore
      document.removeEventListener('dragover', handleDragOver, false);
    
      document.removeEventListener('dragleave', handleDragLeave, false);
      // @ts-ignore
      document.removeEventListener('drop', handleDrop, false);
    };
  }, []);


  return (
    <Container className={className}>
      {isDragging && (
        <Overlay>
          <Text><b>Just drop it anywhere!</b></Text>
        </Overlay>
      )}

      {!isDragging && (
        <Label>
          <UploadIcon width='24' height='24' />

          <Text>Upload your image</Text>
        
          <input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleInputChange} />
        </Label>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 8rem;
  position: relative;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.25rem;
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Text = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 0.25rem;
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
  background-color: var(--surface-ground);
`;

export { ImageInputMini };

export type { ImageData };