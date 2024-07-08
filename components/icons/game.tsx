import React from 'react';

import { Icon, IconProps } from './icon';

const GameIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='9' r='4.5' stroke='#9CA3AF'/>
      <path d='M13.5 14C13.5 16.4853 11.4853 18.5 9 18.5C6.51472 18.5 4.5 16.4853 4.5 14C4.5 11.5147 6.51472 9.5 9 9.5C11.4853 9.5 13.5 11.5147 13.5 14Z' stroke='#9CA3AF'/>
      <circle cx='15' cy='14' r='4.5' stroke='#9CA3AF'/>
      <path d='M15.5 12H19M13.5 14H19.5M13 16H19' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M8 11.5L4.5 14M10 13L5.5 16.5M10.5 15.5L7.5 18' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { GameIcon };
