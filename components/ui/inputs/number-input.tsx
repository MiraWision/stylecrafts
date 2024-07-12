import React from 'react';
import styled from 'styled-components';

import { InputNumber } from 'primereact/inputnumber';
import { AddIconButton } from '../icon-buttons/add-icon-button';
import { RemoveIconButton } from '../icon-buttons/remove-icon-button';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const NumberInput: React.FC<Props> = ({
  value,
  onChange,
  min,
  max,
  step,
  className,
}) => {
  const increment = () => {
    if (max && value < max) {
      onChange(value + (step ?? 1));
    }
  };

  const decrement = () => {
    if (min && value > min) {
      onChange(value - (step ?? 1));
    }
  };

  return (
    <Container>
      <InputNumberStyled
        value={value}
        onChange={(event) => onChange(event.value || 0)}
        min={min}
        max={max}
        step={step}
        className={className}
      />

      <ButtonsContainer>
        <AddIconButton onClick={increment} />

        <RemoveIconButton onClick={decrement} />
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const InputNumberStyled = styled(InputNumber)`
  width: 10rem;
  height: 2rem;

  input {
    width: 10rem;
    border-radius: 0.25rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;

  button {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.25rem;
    border-radius: 0.125rem;
    background-color: var(--surface-0);
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--surface-100);
    }
  }
`;

export { NumberInput };