import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Dropdown, DropdownProps } from 'primereact/dropdown';

interface SelectOption {
  label: string;
  value: any;
}

interface Props extends Omit<DropdownProps, 'options'> {
  options: SelectOption[];
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  ...dropdownProps
}) => {
  return (
    <SelectStyled
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder={placeholder}
      className={className}
      {...dropdownProps}
    />
  );
};

const SelectStyled = styled(Dropdown)`
  width: 100%;
  min-width: 120px;
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: 0.4rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: none;
  height: 2rem;
  min-height: 2rem;
  max-height: 2rem;
  
  &:not(.p-disabled):hover {
    border-color: var(--primary-color);
  }
  
  &.p-focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(144, 88, 170, 0.2);
  }

  .p-dropdown-label {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: var(--surface-900);
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    height: 2rem;
    min-height: 2rem;
    max-height: 2rem;
    display: flex;
    align-items: center;
    line-height: 1;
    
    &.p-placeholder {
      color: var(--surface-500);
    }
  }
  
  .p-dropdown-trigger {
    width: 2rem;
    color: var(--surface-500);
    
    .p-dropdown-trigger-icon {
      color: var(--surface-500);
      transition: color 0.2s;
    }
  }
  
  &:not(.p-disabled):hover .p-dropdown-trigger .p-dropdown-trigger-icon {
    color: var(--primary-color);
  }
`;

const GlobalDropdownStyles = createGlobalStyle`
  .p-dropdown-panel {
    background: var(--surface-0) !important;
    border: 1px solid var(--surface-border) !important;
    border-radius: 0.4rem !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
    margin-top: 0.25rem !important;
    
    .p-dropdown-items-wrapper {
      padding: 0 0 !important;
    }
  }

  .p-dropdown-items {
    padding: 0.25rem 0 !important;
   
    .p-dropdown-item {
      padding: 0.5rem 0.75rem !important;
      font-size: 0.875rem !important;
      font-family: inherit !important;
      color: var(--surface-900) !important;
      background: transparent !important;
      border: none !important;
      transition: background-color 0.2s !important;
      
      &:hover {
        background-color: var(--surface-100) !important;
      }
      
      &.p-highlight {
        color: var(--primary-color) !important;
      }
    }
  }
`;

export { Select, GlobalDropdownStyles };
export type { SelectOption };
