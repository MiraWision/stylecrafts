import React from 'react';
import styled from 'styled-components';

import { InputNumber } from 'primereact/inputnumber';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showButtons?: boolean;
  className?: string;
}

const StepNumberInput: React.FC<Props> = ({
  value,
  onChange,
  min,
  max,
  step,
  showButtons,
  className,
}) => {
  return (
    <InputNumberStyled
      value={value}
      onChange={(event) => onChange(event.value || 0)}
      showButtons={showButtons}
      min={min}
      max={max}
      step={step}
      className={className}
    />
  );
}

const InputNumberStyled = styled(InputNumber)`
  width: 14rem;
  height: 2rem;

  input {
    width: 12rem;
    border-right: 0;
  }

  button {
    width: 2rem;
    background-color: var(--surface-0);
    color: var(--text-color-secondary);
    border-color: var(--surface-300);

    &:first-child {
      border-bottom: 0;
    }
  }
`;

export { StepNumberInput };