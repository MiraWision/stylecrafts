import React from 'react';

import { Icon, IconProps } from './icon';

const CheckmarkIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6 12.7143L9.66667 17L17 7' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { CheckmarkIcon };
