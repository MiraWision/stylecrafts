import React from 'react';

import { Icon, IconProps } from './icon';

const ChevronRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M9 18L15 12L9 6' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ChevronRightIcon };
