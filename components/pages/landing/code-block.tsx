import React, { useState, FC } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';

import { Button } from 'primereact/button';

interface Props {
  code: string;
}

const CodeBlock: FC<Props> = ({ code }) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code);
  };

  return (
    <CodeContainer 
      onMouseEnter={() => setShowCopyIcon(true)} 
      onMouseLeave={() => setShowCopyIcon(false)}
    >
      {showCopyIcon && (
        <CopyButton
          icon='pi pi-copy'
          onClick={handleCopy}
        />
      )}

      <CodeText>{code}</CodeText>
    </CodeContainer>
  );
};

const CodeContainer = styled.div`
  background: var(--gray-900);
  border-radius: 0.5rem;
  padding: 1rem;
  color: var(--surface-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  margin: 1.5rem 0;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.8);
  position: relative;
`;

const CodeText = styled.pre`
  margin: 0;
`;

const CopyButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  color: var(--gray-50);
  font-size: 1.2rem;

  &:hover {
    color: var(--primary-color);
  }
`;

export { CodeBlock };