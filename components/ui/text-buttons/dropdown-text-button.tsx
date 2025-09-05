import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ChevronDownIcon } from '@/components/icons/chevron-down';

interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface DropdownTextButtonProps {
  text: string;
  icon?: React.ReactNode;
  options: DropdownOption[];
  onClick?: () => void;
  disabled?: boolean;
  isPrimary?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DropdownTextButton: React.FC<DropdownTextButtonProps> = ({
  text,
  icon,
  options,
  onClick,
  isPrimary = false,
  disabled = false,
  className,
  style,
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <DropdownContainer ref={ref} className={className} style={style}>
      <MainButton
        $isPrimary={isPrimary}
        $disabled={disabled}
        onClick={(e) => {
          if (onClick) onClick();
        }}
        disabled={disabled}
        type="button"
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <ButtonText>{text}</ButtonText>
      </MainButton>
      
      <DropdownToggle
        $isPrimary={isPrimary}
        $disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        disabled={disabled}
        type="button"
        aria-label="Toggle dropdown"
      >
        <ChevronDownIcon width="16" height="16" />
      </DropdownToggle>
      
      {open && (
        <DropdownMenu>
          {options.map((option, idx) => (
            <DropdownMenuItem
              key={idx}
              onClick={() => {
                setOpen(false);
                option.onClick();
              }}
            >
              {option.icon && <OptionIcon>{option.icon}</OptionIcon>}
              <OptionLabel>{option.label}</OptionLabel>
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
`;

const MainButton = styled.button<{ $isPrimary: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--surface-0);
  color: ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-400)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--surface-500)'
  };
  border: 1px solid ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-300)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--surface-border)'
  };
  border-right: none;
  border-radius: 0.4rem 0 0 0.4rem;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  height: 2rem;
  min-height: 2rem;
  white-space: nowrap;
  font-family: inherit;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropdownToggle = styled.button<{ $isPrimary: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background-color: var(--surface-0);
  border: 1px solid ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-300)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--surface-border)'
  };
  border-left: none;
  border-radius: 0 0.4rem 0.4rem 0;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  height: 2rem;
  min-height: 2rem;
  width: 2rem;

  &:focus {
    outline: none;
  }

  .icon * {
    fill: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon * {
    fill: currentColor;
  }
`;

const ButtonText = styled.span`
  font-weight: 500;
  line-height: 1;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  min-width: 10rem;
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
`;

const DropdownMenuItem = styled.li`
  width: 100%;
  padding: 0.25rem 0.75rem;
  background: none;
  color: var(--text-color);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.375rem;
  font-weight: 500;
  height: 2rem;
  min-height: 2rem;

  &:hover {
    background: var(--primary-color-50, #f3f4f6);
    color: var(--primary-color);
  }

  &:active {
    /* No transform effect */
  }
`;

const OptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  
  .icon * {
    fill: currentColor;
  }
`;

const OptionLabel = styled.span`
  flex: 1;
  white-space: nowrap;
`;

export { DropdownTextButton }; 