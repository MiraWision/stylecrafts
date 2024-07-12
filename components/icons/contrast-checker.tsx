import React from 'react';

import { Icon, IconProps } from './icon';

const ContrastCheckerIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='7.5' stroke='#9CA3AF'/>
      <path d='M12 4.5V7.5M12 19.5V16.5M12 7.5H17.5M12 7.5V10.5M12 10.5H19M12 10.5V12.5V13.5M12 13.5H19M12 13.5V16.5M12 16.5H17.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ContrastCheckerIcon };
