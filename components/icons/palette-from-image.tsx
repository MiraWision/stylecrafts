import React from 'react';

import { Icon, IconProps } from './icon';

const PaletteFromImageIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M5 14.25L7.75 11.5L8.625 12.5L9.5 13.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M8.5 12.25L10.75 10L15 14.25' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <circle cx='14.5' cy='9.5' r='1' stroke='#9CA3AF'/>
      <circle cx='22' cy='12' r='0.5' stroke='#9CA3AF'/>
      <circle cx='19' cy='12' r='0.5' stroke='#9CA3AF'/>
      <circle cx='22' cy='9' r='0.5' stroke='#9CA3AF'/>
      <circle cx='19' cy='9' r='0.5' stroke='#9CA3AF'/>
      <circle cx='22' cy='15' r='0.5' stroke='#9CA3AF'/>
      <circle cx='19' cy='15' r='0.5' stroke='#9CA3AF'/>
      <path d='M21.5 17C21.5 18 21 18.5 20 18.5H4C2.99992 18.5 2.5 18 2.5 17V7C2.5 6 2.49996 5.5 4 5.5H20C21 5.5 21.5 6 21.5 7' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { PaletteFromImageIcon };
