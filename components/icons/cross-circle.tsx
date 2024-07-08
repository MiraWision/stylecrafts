import React from 'react';

import { Icon, IconProps } from './icon';

const CrossCircleIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='7.5' stroke='#9CA3AF'/>
      <path d='M9 9L15 15M15 9L9 15' stroke='#9CA3AF' stroke-linecap='round'/>
    </Icon>
  );
}

export { CrossCircleIcon };
