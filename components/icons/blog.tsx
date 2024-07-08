import React from 'react';

import { Icon, IconProps } from './icon';

const BlogIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6.5 14.5C5 14.5 4 13.5 4 12C4 10.5 5 9.5 6.5 9.5H10M6.5 14.5L6.5 16.5L7.5 18.5H9.5L8.5 16.5V14.5M6.5 14.5H8.5M10 14.5C13 15 14 15 15.5 18L16 17.5V10.5M10 14.5V9.5M10 14.5H8.5M10 9.5C13 9 14 9 15.5 6L16 6.5V10.5M16 10.5C17 11.5 17 12.5 16 13.5M18 12H20M18 10.5L19.5 9.5M18 13.5L19.5 14.5' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { BlogIcon };
