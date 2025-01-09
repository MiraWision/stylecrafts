import React from 'react';
import styled, { css } from 'styled-components';

import { IconProps } from '../icons/icon';

interface Option {
  value: string;
  icon: React.FC<IconProps>;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const IconButtonGroup: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <Container>
      {options.map(option => (
        <Button
          $isActive={option.value === value}
          key={option.value}
          onClick={() => onChange(option.value)}
        >
          <option.icon width='24' height='24' />
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--surface-border);
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;

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

export { IconButtonGroup };