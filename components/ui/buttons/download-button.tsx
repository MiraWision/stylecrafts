import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';
import { DownloadIcon } from '@/components/icons/download';

interface Props {
  onClick: () => void;
}

const DownloadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Container>
      <Button 
        onClick={onClick} 
        className='p-button-rounded p-button-primary' 
      >
        <DownloadIcon width='36' height='36' />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;

  .p-button {
    width: 4rem;
    height: 4rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary-color);
    border: none;
  }

  .icon * {
    stroke: #ffffff;
  }

  @media (max-width: 768px) {
    .p-button {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export { DownloadButton };
