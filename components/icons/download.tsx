import React from 'react';

import { Icon, IconProps } from './icon';

const DownloadIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M4 13V16C4 17.5 4.5 18 6 18H18C19.5 18 20 17.5 20 16V13' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M12 5V15M12 15L15 12M12 15L9 12' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { DownloadIcon };
