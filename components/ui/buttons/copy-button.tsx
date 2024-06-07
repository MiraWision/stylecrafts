import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

interface Props {
  text: string;
}

const CopyButton: React.FC<Props> = ({ text }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const toast = useRef<Toast>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setIcon('pi pi-check');
      toast.current?.show({ severity: 'success', summary: 'Copied!', detail: 'Text has been copied to clipboard.', life: 3000 });

      setTimeout(() => {
        setIcon('pi pi-copy');
      }, 3000);
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Failed', detail: 'Failed to copy text.', life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <ButtonSmall icon={icon} onClick={copyToClipboard} text />
    </div>
  );
};

const ButtonSmall = styled(Button)`
  border-radius: 4px;
  height: 30px;
  width: 30px;
  
  &:focus {
    box-shadow: none;
  }
`;

export { CopyButton };
