import React from 'react';

import { BaseIconButton } from './base-icon-button';
import { ShuffleIcon } from '@/components/icons/shuffle';

interface Props {
  onReverseColors: () => void;
}

const ShuffleIconButton: React.FC<Props> = ({ onReverseColors }) => {
  return (
    <BaseIconButton
      icon={<ShuffleIcon width='16' height='16' />}
      onClick={onReverseColors}
    />
  );
};

export { ShuffleIconButton };