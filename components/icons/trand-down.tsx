import React from 'react';

import { Icon, IconProps } from './icon';

const TrandDown: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M6 8L11 13L13 11L18 16M18 16H16M18 16V14"
        stroke="#9CA3AF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export { TrandDown };
