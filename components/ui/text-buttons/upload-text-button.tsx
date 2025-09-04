import React, { useRef } from 'react';
import styled from 'styled-components';
import { BaseTextButton } from './base-text-button';
import { UploadIcon } from '@/components/icons/upload';

interface Props {
  text?: string;
  onFileSelect: (file: File | null) => void;
  style?: React.CSSProperties;
  className?: string;
}

const UploadTextButton: React.FC<Props> = ({ text = 'Upload', onFileSelect, style, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileSelect(file);
  };

  return (
    <>
      <BaseTextButton
        text={text}
        icon={<UploadIcon width="20" height="20" />}
        onClick={handleButtonClick}
        className={className}
        style={style}
        isPrimary={true}
      />
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </>
  );
};

const HiddenInput = styled.input`
  display: none;
`;

export { UploadTextButton };
