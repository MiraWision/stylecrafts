import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
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
      <ButtonStyled
        $isPrimary={isPrimary}
        disabled={disabled}
        onClick={(e) => {
          if (onClick) onClick();
        }}
        type="button"
      >
        {icon}
        <span>{text}</span>
      </ButtonStyled>
      <DropdownButton
        $isPrimary={isPrimary}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        type="button"
      >
        <ChevronDownIcon width="16" height="16" />
      </DropdownButton>
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
              {option.icon}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const ButtonStyled = styled(Button)<{ $isPrimary: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  flex: 1;
  height: fit-content;
  min-height: 2rem;
  color: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  border: 0.0625rem solid ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-border)'};
  border-right: none;
  background-color: var(--surface-50);
  border-radius: 0.25rem 0 0 0.25rem;

  .p-button-label {
    padding: 0;
  }

  .icon {
    margin-right: 0.25rem;
  }

  .icon * {
    fill: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  }

  &:focus {
    box-shadow: none;
  }

  &:active {
    background-color: var(--surface-50);
  }
`;

const DropdownButton = styled(Button)<{ $isPrimary: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  height: fit-content;
  min-height: 2rem;
  color: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  border: 0.0625rem solid ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-border)'};
  border-left: 0.0625rem solid ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-border)'};
  background-color: var(--surface-50);
  border-radius: 0 0.25rem 0.25rem 0;

  .p-button-label {
    padding: 0;
  }

  .icon * {
    fill: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  }

  &:focus {
    box-shadow: none;
  }

  &:active {
    background-color: var(--surface-50);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 100%;
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
  padding: 0.25rem 0.5rem;
  background: none;
  color: var(--text-color, #222);
  font-size: 0.875rem;
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

export { DropdownTextButton }; 