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
  display: flex;
  align-items: center;
  width: fit-content;
  background: var(--surface-0);
  border: 1.5px solid var(--surface-border);
  border-radius: 0.4rem;
  overflow: hidden;
`;

const InputNumberStyled = styled(InputNumber)`
  width: 50px;
  height: 2rem;
  border: none;
  background: transparent;
  box-shadow: none;
  input {
    width: 50px;
    border: none;
    border-radius: 0;
    background: transparent;
    text-align: center;
    font-size: 14px;
    font-family: inherit;
    color: var(--surface-900);
    box-shadow: none;
    outline: none;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background: transparent;
  border: none;
  gap: 0;
  button {
    width: 30px;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--primary-color);
    font-size: 1.1rem;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: var(--surface-100);
    }
  }
`;

export { NumberInput };