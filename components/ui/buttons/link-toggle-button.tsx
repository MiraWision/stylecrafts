import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

interface Props {
  linked: boolean;
  onToggle: () => void;
}

const LinkToggleButton: React.FC<Props> = ({ linked, onToggle }) => {
  const icon = linked ? 'pi pi-lock' : 'pi pi-lock-open';

  return (
    <ButtonSmall
      icon={icon}
      onClick={onToggle}
    />
  );
};

const ButtonSmall = styled(Button)`
  border-radius: 0.4rem;
  height: 2rem;
  width: 2rem;
  border: none;
  color: var(--primary-color);
  background: none;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: var(--primary-color);
  }
`;

export { LinkToggleButton };