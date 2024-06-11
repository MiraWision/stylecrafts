import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface Props {
  onClick: () => void;
}

const UploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Container>
      <Button icon='pi pi-upload' onClick={onClick} className='p-button-rounded p-button-primary' />
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;

  .p-button {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary-color);
    border: none;
  }

  .pi {
    font-size: 1.5rem;
  }
`;

export { UploadButton };
