import React, { useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';

import { Button } from 'primereact/button';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';

import { useTheme } from '@/services/theme-service/use-theme';
import { Theme } from '@/services/theme-service/types';

interface Props {
  code: string;
}

const CodeBlock: React.FC<Props> = ({ code }) => {
  const [icon, setIcon] = useState('copy');

  const [theme] = useTheme();

  const copyText = async () => {
    copyToClipboard(code, {
      onSuccess: () => {
        setIcon('check');

        setTimeout(() => {
          setIcon('copy');
        }, 3000);
      },
    });
  };

  return (
    <Container $isDark={theme === Theme.Dark}>
      <Text>
        {code}
      </Text>

      <CopyButton onClick={copyText}>
        {icon === 'copy' ? (
          <CopyIcon width='16' height='16' />
        ) : (
          <CheckmarkIcon width='16' height='16' />
        )}
      </CopyButton>
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
  opacity: 0;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: var(--primary-color);
  }
`;

const Container = styled.div.attrs<{ $isDark: boolean }>(({ $isDark }) => ({
  style: {
    backgroundColor: $isDark ? '#2d2d2d' : '#f8f8f2',
    color: $isDark ? '#f8f8f2' : '#2d2d2d',
  },
}))`
  position: relative;
  margin: 1rem 0;
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
  font-size: 0.9rem;
`;

export { CodeBlock };