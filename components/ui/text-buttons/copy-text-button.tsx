import React, { useState } from 'react';

import { copyToClipboard } from '@/utils/copy';

import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { BaseTextButton } from './base-text-button';

interface Props {
  text: string;
  copyText: string;
  onCopyCallback?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const CopyTextButton: React.FC<Props> = ({ text = 'Copy', copyText, onCopyCallback, style, className }) => {
  const [icon, setIcon] = useState('copy');

  const onCopy = async () => {
    copyToClipboard(copyText, {
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
    <BaseTextButton
      text={text}
      icon={icon === 'copy' ? (
        <CopyIcon width='20' height='20' />
      ) : (
        <CheckmarkIcon width='20' height='20' />
      )}
      isPrimary
      onClick={onCopy}
      className={className}
      style={style}
    />
  );
};

export { CopyTextButton };
