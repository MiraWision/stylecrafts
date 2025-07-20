import React, { useState } from 'react';

import { copyToClipboard } from '@/utils/copy';

import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { BaseIconButton } from './base-icon-button';

interface Props {
  text: string;
  onCopyCallback?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CopyIconButton: React.FC<Props> = ({ text, onCopyCallback, className, style }) => {
  const [icon, setIcon] = useState('copy');

  const copyText = async () => {
    copyToClipboard(text, {
      onSuccess: () => {
        if (onCopyCallback) {
          onCopyCallback();
        }

        setIcon('check');

        setTimeout(() => {
          setIcon('copy');
        }, 3000);
      },
    });
  };

  return (
    <BaseIconButton
      icon={icon === 'copy' ? (
        <CopyIcon width='16' height='16' />
      ) : (
        <CheckmarkIcon width='16' height='16' />
      )}
      isPrimary
      onClick={copyText}
      className={className}
      style={style}
    />
  );
};

export { CopyIconButton };
