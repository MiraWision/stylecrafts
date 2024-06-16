import React, { useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';

import { Button } from 'primereact/button';

interface Props {
  code: string;
}

const CodeBlock: React.FC<Props> = ({ code }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const copyText = async () => {
    copyToClipboard(code, {
      onSuccess: () => {
        setIcon('pi pi-check');

        setTimeout(() => {
          setIcon('pi pi-copy');
        }, 3000);
      },
    });
  };

  return (
    <Container>
      <Text>
        {code}
      </Text>

      <CopyButton icon={icon} onClick={copyText} />
    </Container>
  );
}

const CopyButton = styled(Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 0.4rem;
  height: 2rem;
  width: 2rem;
  border: none;
  color: var(--primary-color);
  background: none;
  transition: opacity 0.3s;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: var(--primary-color);
  }
`;

const Container = styled.div`
  position: relative;
  margin: 1rem 0;
  background: #f8f8f2;
  color: #2d2d2d;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow: auto;

  ${CopyButton} {
    opacity: 0;
  }

  &:hover {
    ${CopyButton} {
      opacity: 1;
    }
  }
`;

const Text = styled.pre`
  margin: 0;
`;

export { CodeBlock };