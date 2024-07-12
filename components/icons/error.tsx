import React from 'react';

import { Icon, IconProps } from './icon';

const ErrorIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='7.5' stroke='#9CA3AF'/>
      <path d='M12 7.5V12.5' stroke='#9CA3AF' strokeLinecap='round'/>
      <rect x='11.5' y='15' width='1' height='1' rx='0.5' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { ErrorIcon };
