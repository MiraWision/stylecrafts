import { RemoveIcon } from '@/components/icons/remove';
import { Button } from 'primereact/button';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const RemoveButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <ButtonStyled
      className='p-button-sm'
      onClick={onClick}
      disabled={disabled}
    >
      <RemoveIcon />
    </ButtonStyled>
  );
}

const ButtonStyled = styled(Button)`
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  border: 0.0625rem solid var(--primary-color);
  border-radius: 0.25rem;
  background-color: transparent;
  border-color: var(--surface-300);

  .pi {
    color: var(--text-color-secondary);
    font-size: 0.5rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export { RemoveButton };