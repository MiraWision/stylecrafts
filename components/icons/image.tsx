import React from 'react';

import { Icon, IconProps } from './icon';

const ImageIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M7 16.25L9.75 13.5L10.625 14.5L11.5 15.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M10.5 14.25L12.75 12L17 16.25' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <circle cx='16.5' cy='10.5' r='1' stroke='#9CA3AF'/>
      <rect x='2.5' y='5.5' width='19' height='13' rx='1.5' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { ImageIcon };