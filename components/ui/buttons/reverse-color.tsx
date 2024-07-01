import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface Props {
  onReverseColors: () => void;
}

const ReverseButton: React.FC<Props> = ({ onReverseColors }) => {
  return (
    <ButtonContainer>
      <ButtonSmall icon='pi pi-sync' onClick={onReverseColors} />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: -1.5rem;
`;

const ButtonSmall = styled(Button)`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  color: var(--primary-color);
  border: none;
  background: none;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: var(--primary-color);
  }
`;

export { ReverseButton };