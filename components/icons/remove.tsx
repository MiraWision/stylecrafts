import React from 'react';

import { Icon, IconProps } from './icon';

const RemoveIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M18 12H12L6 12' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { RemoveIcon };
