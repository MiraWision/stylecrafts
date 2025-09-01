import React from 'react';
import styled from 'styled-components';
import { InputTextarea } from 'primereact/inputtextarea';
import { DropdownTextButton } from '../text-buttons/dropdown-text-button';
import { copyText } from '@mirawision/copily';

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
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleCopy = (option: CopyOption) => {
    copyText(option.getValue(value)).then(() => {
      option.onSuccess?.();
    }).catch(() => {
      option.onFail?.();
    });
    setDropdownOpen(false);
  };

  React.useEffect(() => {
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
  const otherOptions = copyOptions?.slice(1) || [];

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
            icon={null}
            options={otherCopyOptions}
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
`;

const ActionsContainer = styled.div`
  border-top: 0.0625rem solid var(--surface-border);
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const DropdownCopyButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CopyButton = styled.button<{ $hasDropdown: boolean }>`
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(80, 40, 120, 0.08);
  gap: 0.5rem;
  letter-spacing: 0.01em;
  &:hover, &:focus {
    background: var(--primary-color-hover, #b83280);
  }
  ${({ $hasDropdown }) => $hasDropdown && `padding-right: 2.5rem;`}
`;

const DropdownArrow = styled.span<{ $open: boolean }>`
  margin-left: 1rem;
  font-size: 1.2em;
  user-select: none;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
`;

const DropdownMenuItem = styled.li`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  color: var(--text-color, #fff);
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  letter-spacing: 0.01em;
  &:hover {
    background: var(--primary-color-hover, #f3e6f1);
    color: var(--primary-color, #b83280);
  }
`;

export { TextareaWithCopy };

