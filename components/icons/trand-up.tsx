import React from 'react';

import { Icon, IconProps } from './icon';

const TrandUp: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M6 16L11 11L13 13L18 8M18 8H16M18 8V10"
        stroke="#9CA3AF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export { TrandUp };
