import React from 'react';

import { Icon, IconProps } from './icon';

const CheckmarkCircleIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M8.5 13L11 16L16 9' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <circle cx='12' cy='12' r='7.5' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { CheckmarkCircleIcon };
