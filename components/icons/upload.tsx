import React from 'react';

import { Icon, IconProps } from './icon';

const UploadIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M12 18V11M12 11L10 13M12 11L14 13' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M8 15H6C4.5 15 2.99997 13.5 3 12C3.00007 10.5 4.5 9 6 9H8C8 7 9 5 12 5C15 5 16 7 16 9M16 15H18C19.5 15 21 13.5 21 12C21 10.5 19.5 9 18 9H16M14 9H16' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { UploadIcon };
