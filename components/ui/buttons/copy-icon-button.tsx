import React, { useState } from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';
import { useToast } from '../toast';

import { Button } from 'primereact/button';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';

interface Props {
  text: string;
  label?: string;
  onCopyCallback?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const CopyIconButton: React.FC<Props> = ({ text, label, onCopyCallback, style, className }) => {
  const [icon, setIcon] = useState('copy');

  const { toast } = useToast();

  const copyText = async () => {
    copyToClipboard(text, {
      onSuccess: () => {
        toast.success(label? `${label} copied to clipboard` : 'Copied to clipboard', text);

        setIcon('check');

        setTimeout(() => {
          setIcon('copy');
        }, 3000);

        if (onCopyCallback) {
          onCopyCallback();
        }
      },
    });
  };

  return (
    <div className={className} style={style}>
      <ButtonSmall onClick={copyText}>
        {icon === 'copy' ? (
          <CopyIcon width='16' height='16' />
        ) : (
          <CheckmarkIcon width='16' height='16' />
        )}
      </ButtonSmall>
    </div>
  );
};

const ButtonSmall = styled(Button)`
  border-radius: 0.4rem;
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;
  border: none;
  background: none;

  &:focus {
    box-shadow: none;
  }

  .icon * {
    stroke: var(--primary-color);
  }
`;

export { CopyIconButton };
