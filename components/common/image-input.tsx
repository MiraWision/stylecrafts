import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UploadIcon } from '../icons/upload';

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

const ImageInput: React.FC<Props> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const setImage = (value: any) => {
    onChange(value?.toString() ?? null);
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      setImage(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      handleFileRead(files[0]);
    }
  };

  const isValidHttpUrl = (string: string) => {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
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

        const text = event.clipboardData.getData('text');
        if (text && isValidHttpUrl(text)) {
          setImage(text);
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
    <Container>
      {isDragging && (
        <Overlay>
          <Text><b>Just drop it anywhere!</b></Text>
        </Overlay>
      )}

      {!isDragging && (
        <Label>
          {value && (
            <Image src={value} alt='uploaded' />
          )}

          {!value && (
            <>
              <UploadIcon />
              <Text><b>Simply do anything!</b><br />Click to select a file, or drop it on a page, or copy-paste it here</Text>
            </>
          )}
        
          <input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleInputChange} />
        </Label>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  min-height: 160px;
  position: relative;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  font-size: 14px;
  margin: 8px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-ground);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  /* object-fit: contain; */
`;

export { ImageInput };