import React from 'react';

import { Icon, IconProps } from './icon';

const RefreshIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M17.9997 14.4999C17 17 14.8669 18.3237 11.9997 18.4999C9.13254 18.6761 5.49974 15.9999 5.49986 12.4999' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M6.01015 9.50473C7.00987 7.00463 9.14294 5.6809 12.0101 5.50473C14.8773 5.32856 18.5101 8.00473 18.51 11.5047' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M19.2347 8.34926L18.5496 11.6327L16.3339 9.11459' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M4.76532 15.6661L5.45037 12.3827L7.66606 14.9008' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { RefreshIcon };
