import React from 'react';

import { Icon, IconProps } from './icon';

const EmojisIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='7.5' stroke='#9CA3AF'/>
      <circle cx='9' cy='10' r='1.5' stroke='#9CA3AF'/>
      <circle cx='15' cy='10' r='1.5' stroke='#9CA3AF'/>
      <path d='M16 14H8C9 16 10 17 12 17C14 17 15 16 16 14Z' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { EmojisIcon };
