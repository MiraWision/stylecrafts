import React from 'react';

import { Icon, IconProps } from './icon';

const CopyIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M7 9.5H10M7 12.5H13M7 15.5H11M7 18.5H12' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M8 3H14C15 4 17.5 6.5 18.5 7.5V18.5' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M12.0003 5.5H6.00035C5.18427 5.50236 4.99058 5.74336 5.00035 6.5V20.4999C5.0181 21.1557 5.28588 21.4894 6.00037 21.4999L15.0004 21.5C15.7329 21.3898 15.9428 21.1692 16.0004 20.4999L16.0003 9.5L13.0002 9.5C12.2287 9.43374 12.0299 9.19474 12.0003 8.5V5.5Z' stroke='#9CA3AF' stroke-linejoin='round'/>
      <path d='M12.0002 5.5L16.0002 9.5' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { CopyIcon };
