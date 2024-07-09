import React from 'react';
import styled from 'styled-components';

import { RefreshIcon } from '@/components/icons/refresh';
import { BaseIconButton } from './base-icon-button';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const RefreshIconButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <BaseIconButton
      icon={<RefreshIcon />}
      onClick={onClick}
      disabled={disabled}
    />
  );
}

export { RefreshIconButton };
