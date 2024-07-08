import React from 'react';

import { Icon, IconProps } from './icon';

const AddIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M12 18V12M12 6L12 12M12 12H18M12 12L6 12' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { AddIcon };
