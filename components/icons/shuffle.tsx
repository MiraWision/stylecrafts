import React from 'react';

import { Icon, IconProps } from './icon';

const ShuffleIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M4 8H8.02181C9.2219 8 10.3065 8.71519 10.7792 9.81824L12.2208 13.1818C12.6935 14.2848 13.7781 15 14.9782 15H19M19 15L17 13M19 15L17 17' stroke='#9CA3AF' stroke-linecap='round'/>
      <path d='M4 15H7.93845C9.15004 15 10.2061 14.1754 10.5 13V13M19 8H15.0616C13.85 8 12.7939 8.82459 12.5 10V10M19 8L17 6M19 8L17 10' stroke='#9CA3AF' stroke-linecap='round'/>
    </Icon>
  );
}

export { ShuffleIcon };
