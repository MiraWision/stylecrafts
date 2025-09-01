import React from 'react';
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
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-400)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--text-color)'
  };
  background-color: ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-200)' 
      : $isPrimary 
        ? 'var(--surface-0)' 
        : 'var(--surface-100)'
  };
  border: 1px solid ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-300)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--surface-border)'
  };
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-height: 2.5rem;
  white-space: nowrap;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: ${({ $isPrimary }) => 
      $isPrimary 
        ? 'var(--surface-50)' 
        : 'var(--surface-200)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-200, #c4b5fd);
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
  padding: 0.75rem 0.75rem;
  font-size: 0.875rem;
  color: ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-400)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--text-color)'
  };
  background-color: ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-200)' 
      : $isPrimary 
        ? 'var(--surface-0)' 
        : 'var(--surface-100)'
  };
  border: 1px solid ${({ $isPrimary, $disabled }) => 
    $disabled 
      ? 'var(--surface-300)' 
      : $isPrimary 
        ? 'var(--primary-color)' 
        : 'var(--surface-border)'
  };
  border-left: none;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-height: 2.5rem;
  width: 2.5rem;

  &:hover:not(:disabled) {
    background-color: ${({ $isPrimary }) => 
      $isPrimary 
        ? 'var(--surface-50)' 
        : 'var(--surface-200)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-200, #c4b5fd);
  }

  .icon * {
    fill: currentColor;
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
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 200px;
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin: 0;
  padding: 0.5rem;
  list-style: none;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
`;

const DropdownMenuItem = styled.li`
  width: 100%;
  padding: 0.75rem 1rem;
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

  &:hover {
    background: var(--primary-color-50, #f3f4f6);
    color: var(--primary-color);
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(1px);
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