import React from 'react';

import { Icon, IconProps } from './icon';

const SunIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='4.5' stroke='#9CA3AF'/>
      <path d='M12 19V21' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M12 3V5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M5 12H3' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M21 12H19' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M18 18L17 17' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M7.27209 7.27197L6.27209 6.27197' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M7.27209 16.728L6.27209 17.728' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M18 6L17 7' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { SunIcon };
