import React from 'react';

import { Icon, IconProps } from './icon';

const ChevronLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M15 6L9 12L15 18' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ChevronLeftIcon };
