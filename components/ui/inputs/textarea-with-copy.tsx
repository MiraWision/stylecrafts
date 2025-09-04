import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';

import { InputTextarea } from 'primereact/inputtextarea';
import { DropdownTextButton } from '../text-buttons/dropdown-text-button';
import { CopyIcon } from '@/components/icons/copy';

interface CopyOption {
  name: string;
  getValue: (text: string) => string;
  onSuccess?: () => void;
  onFail?: () => void;
}

interface Props {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  copyOptions?: CopyOption[];
  width?: string;
  height?: string;
}

const TextareaWithCopy: React.FC<Props> = ({ value, placeholder, onChange, copyOptions, width = '100%', height = '10rem' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = (option: CopyOption) => {
    copyText(option.getValue(value)).then(() => {
      option.onSuccess?.();
    }).catch(() => {
      option.onFail?.();
    });
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const mainOption = copyOptions?.[0];

  const otherCopyOptions = copyOptions?.filter(option => option.name !== 'Copy Base64').map(option => ({
    label: option.name,
    icon: null,
    onClick: () => {
      copyText(option.getValue(value)).then(() => {
        option.onSuccess?.();
      }).catch(() => {
        option.onFail?.();
      });
    }
  })) || [];

  const handleCopyBase64 = () => {
    if (mainOption) {
      handleCopy(mainOption);
    }
  };

  return (
    <Container width={width} height={height}>
      <InputTextareaStyled
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />
      {mainOption && (
        <ActionsContainer>
          <DropdownTextButton
            text="Copy Base64"
            icon={<CopyIcon width="20" height="20" />}
            options={otherCopyOptions}
            isPrimary
            onClick={handleCopyBase64}
          />
        </ActionsContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.5rem;
  background: var(--surface-0);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputTextareaStyled = styled(InputTextarea)`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  overflow-x: hidden;
`;

const ActionsContainer = styled.div`
  border-top: 0.0625rem solid var(--surface-border);
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

export { TextareaWithCopy };