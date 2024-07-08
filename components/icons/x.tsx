import React from 'react';

import { Icon, IconProps } from './icon';

const XIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <rect x='2.5' y='2.5' width='19' height='19' rx='1.5' stroke='#9CA3AF'/>
      <path d='M14.2546 17L6.98189 7H9.25448L16.9818 17H14.2546Z' stroke='#9CA3AF' stroke-linecap='round'/>
      <path d='M7.77312 17H7.12268L10.5191 13.2262L10.8157 13.5228L7.77312 17Z' stroke='#9CA3AF' stroke-linecap='round'/>
      <path d='M15.7269 7H16.3773L12.9809 10.7738L12.6843 10.4772L15.7269 7Z' stroke='#9CA3AF' stroke-linecap='round'/>
    </Icon>
  );
}

export { XIcon };
