import React, { useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';
import { useTheme } from '@/services/theme-service/use-theme';
import { Theme } from '@/services/theme-service/types';

import { Button } from 'primereact/button';

interface Props {
  code: string;
}

const CodeBlock: React.FC<Props> = ({ code }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const [theme] = useTheme();

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
    <Container isDark={theme === Theme.Dark}>
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

const Container = styled.div<{ isDark: boolean }>`
  position: relative;
  margin: 1rem 0;
  background: ${({ isDark }) => isDark ? '#2d2d2d' : '#f8f8f2'};
  color: ${({ isDark }) => isDark ? '#f8f8f2' : '#2d2d2d'};
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