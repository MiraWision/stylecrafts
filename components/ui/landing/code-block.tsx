import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard');
  };

  return (
    <CodeContainer 
      onMouseEnter={() => setShowCopyIcon(true)} 
      onMouseLeave={() => setShowCopyIcon(false)}
    >
      {showCopyIcon && <CopyButton icon="pi pi-copy" onClick={handleCopy} />}
      <CodeText>{code}</CodeText>
    </CodeContainer>
  );
};

const CodeContainer = styled.div`
  background: var(--gray-900);
  border-radius: 10px;
  padding: 1rem;
  color: var(--surface-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  margin: 1.5rem 0;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8);
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