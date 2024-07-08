import React from 'react';

import { Icon, IconProps } from './icon';

const AdjustIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6 7H16' stroke='#9CA3AF' stroke-linecap='round'/>
      <circle cx='18' cy='7' r='1.5' stroke='#9CA3AF'/>
      <path d='M6 17H16' stroke='#9CA3AF' stroke-linecap='round'/>
      <circle cx='18' cy='17' r='1.5' stroke='#9CA3AF'/>
      <path d='M18 12L8 12' stroke='#9CA3AF' stroke-linecap='round'/>
      <circle cx='6' cy='12' r='1.5' transform='rotate(-180 6 12)' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { AdjustIcon };
