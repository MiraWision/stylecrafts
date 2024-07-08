import React from 'react';

import { Icon, IconProps } from './icon';

const ChevronDownIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6 9L12 15L18 9' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { ChevronDownIcon };
