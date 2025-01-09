import React from 'react';
import styled, { css } from 'styled-components';

import { IconProps } from '../icons/icon';

interface Option {
  value: string;
  label: string;
  icon: React.FC<IconProps>;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const ButtonGroup: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <Container>
      {options.map(option => (
        <Button
          $isActive={option.value === value}
          key={option.value}
          onClick={() => onChange(option.value)}
        >
          <option.icon width='24' height='24' />

          {option.label}
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: fit-content;
  gap: 0.5rem;
`;

const Button = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--surface-border);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;

  svg path, svg circle {
    transition: all 0.3s;
  }

  ${({ $isActive }) => $isActive && css`
    border-color: var(--primary-color);
    color: var(--primary-color);

    svg path, svg circle {
      fill: var(--primary-color);
    }
  `}
`;

export { ButtonGroup };