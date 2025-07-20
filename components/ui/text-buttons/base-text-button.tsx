import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

interface Props {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isPrimary?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BaseTextButton: React.FC<Props> = ({
  text,
  icon,
  onClick,
  isPrimary = false,
  disabled = false,
  className,
  style,
}) => {
  return (
    <ButtonStyled 
      $isPrimary={isPrimary}
      disabled={disabled}
      className={className} 
      style={style}
      onClick={onClick}
    >
      {icon}

      <span>{text}</span>
    </ButtonStyled>
  );
}

const ButtonStyled = styled(Button)<{ $isPrimary: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  height: fit-content;
  min-height: 2rem;
  color: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  border: 0.0625rem solid ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-border)'};
  background-color: var(--surface-50);
  border-radius: 0.25rem;

  .p-button-label {
    padding: 0;
  }

  .icon {
    margin-right: 0.25rem;
  }

  .icon * {
    fill: ${({ $isPrimary }) => $isPrimary ? 'var(--primary-color)' : 'var(--surface-500)'};
  }
`;

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
          setOpen((prev) => !prev);
        }}
        type="button"
      >
        {icon}
        <span>{text}</span>
        <DropdownArrow $open={open}>▼</DropdownArrow>
      </ButtonStyled>
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

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownArrow = styled.span<{ $open: boolean }>`
  margin-left: 0.5rem;
  font-size: 0.9em;
  user-select: none;
  transition: transform 0.2s;
  display: inline-block;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'none')};
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
  padding: 0.75rem 1rem;
  background: none;
  color: var(--text-color, #222);
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

export { BaseTextButton, DropdownTextButton };