import React from 'react';

import { Icon, IconProps } from './icon';

const ColorConversionIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='17' cy='7' r='2' stroke='#9CA3AF' strokeWidth='2'/>
      <circle cx='7' cy='17' r='2.5' stroke='#9CA3AF'/>
      <path d='M12 17C15.5 17 17 15.5 17 12M17 12L18 13M17 12L16 13' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M12 7C8.5 7 7 8.5 7 12M7 12L6 11M7 12L8 11' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ColorConversionIcon };
