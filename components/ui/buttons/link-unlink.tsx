import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

interface Props {
  color?: string;
  border?: boolean;
  linked: boolean;
  onToggle: () => void;
}

const LinkToggleButton: React.FC<Props> = ({ color = 'var(--primary-color)', border = false, linked, onToggle }) => {
  const icon = linked ? 'pi pi-lock' : 'pi pi-lock-open';

  return (
    <ButtonSmall border={border} color={color} icon={icon} onClick={onToggle} />
  );
};

const ButtonSmall = styled(Button)<{ border: boolean; color: string }>`
  border-radius: 0.4rem;
  height: 2rem;
  width: 2rem;
  border: ${({ border, color }) => (border ? `0.0625rem solid ${color}` : 'none')};
  color: ${({ color }) => color};
  background: none;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: ${({ color }) => color};
  }
`;

export { LinkToggleButton };