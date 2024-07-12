import React from 'react';

import { Icon, IconProps } from './icon';

const ChevronUpIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M18 15L12 9L6 15' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ChevronUpIcon };
