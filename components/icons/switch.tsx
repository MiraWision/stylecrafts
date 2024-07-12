import React from 'react';

import { Icon, IconProps } from './icon';

const SwitchIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6 15C6.00001 16 7 17 8 17H16C17 17 18 16 18 15V11M18 11L20 13M18 11L16 13' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M18 9C18 8 17 7 16 7L8 7C7 7 6 8 6 9V13M6 13L4 11M6 13L8 11' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { SwitchIcon };
