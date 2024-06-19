import React, { useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';
import { useToast } from '../toast';

import { Button } from 'primereact/button';

interface Props {
  text: string;
  label?: string;
  onCopy?: () => void;
}

const CopyButton: React.FC<Props> = ({ text, label, onCopy }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const { toast } = useToast();

  const copyText = async () => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.success(label? `${label} copied to clipboard` : 'Copied to clipboard', text);

        setIcon('pi pi-check');

        setTimeout(() => {
          setIcon('pi pi-copy');
        }, 3000);

        if (onCopy) {
          onCopy();
        }
      },
    });
  };

  return (
    <div>
      <ButtonSmall icon={icon} onClick={copyText} />
    </div>
  );
};

const ButtonSmall = styled(Button)`
  border-radius: 0.4rem;
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

export { CopyButton };
