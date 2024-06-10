import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

interface Props {
  text: string;
  color?: string;
  border?: boolean;
}

const CopyButton: React.FC<Props> = ({ text, color = 'var(--primary-color)', border = false }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const toast = useRef<Toast>(null);

  const copyText = async () => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.current?.show({ severity: 'success', summary: 'Copied!', detail: 'Text has been copied to clipboard.', life: 3000 });

        setIcon('pi pi-check');

        setTimeout(() => {
          setIcon('pi pi-copy');
        }, 3000);
      },
      onFail: () => {
        toast.current?.show({ severity: 'error', summary: 'Failed', detail: 'Failed to copy text.', life: 3000 });
      }
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      
      <ButtonSmall border={border} color={color} icon={icon} onClick={copyText} />
    </div>
  );
};

const ButtonSmall = styled(Button)<{ border: boolean; color: string }>`
  border-radius: 0.4rem;
  height: 2rem;
  width: 2rem;
  border: ${({ border, color }) => (border ? `0.0625rem solid ${color}` : 'none')};
  color: ${({ color }) => color};
  background: none;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: ${({ color }) => color};
  }
`;

export { CopyButton };
