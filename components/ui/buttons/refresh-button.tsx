import { Button } from 'primereact/button';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const RefreshButton: React.FC<Props> = ({ onClick, disabled, className }) => {
  return (
    <ButtonStyled
      icon='pi pi-refresh'
      className={`p-button-sm ${className}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
}

const ButtonStyled = styled(Button)`
  height: 2rem;
  width: 2rem;
  padding: 0;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 0.25rem;
  background-color: transparent;
  border-color: var(--surface-300);

  .pi {
    color: var(--text-color-secondary);
    font-size: 0.75rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export { RefreshButton };