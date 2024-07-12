import React from 'react';

import { Icon, IconProps } from './icon';

const ShuffleIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M5.5 8.5H8.52181C9.7219 8.5 10.8065 9.21519 11.2792 10.3182L12.7208 13.6818C13.1935 14.7848 14.2781 15.5 15.4782 15.5H18.5M18.5 15.5L16.5 13.5M18.5 15.5L16.5 17.5' stroke='#9CA3AF' strokeLinecap='round'/>
      <path d='M5.5 15.5H8.43845C9.65004 15.5 10.7061 14.6754 11 13.5V13.5M18.5 8.5H15.5616C14.35 8.5 13.2939 9.32459 13 10.5V10.5M18.5 8.5L16.5 6.5M18.5 8.5L16.5 10.5' stroke='#9CA3AF' strokeLinecap='round'/>
    </Icon>
  );
}

export { ShuffleIcon };
