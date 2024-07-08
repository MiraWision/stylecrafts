import React from 'react';

import { Icon, IconProps } from './icon';

const Base64ToImageIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M13.0003 4H7.00035C6.18427 4.00236 5.99058 4.24336 6.00035 5V18.9999C6.0181 19.6557 6.28588 19.9894 7.00037 19.9999L16.0004 20C16.7329 19.8898 16.9428 19.6692 17.0004 18.9999L17.0003 8L14.0002 8C13.2287 7.93374 13.0299 7.69474 13.0003 7V4Z' stroke='#9CA3AF' stroke-linejoin='round'/>
      <path d='M13.0002 4L17.0002 8' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M7.5 17.9999L8.5 15.4999C8.82577 14.8199 9.06084 14.8474 9.5 15.4999L10 16.4999M10.5 17.4999L10 16.4999M10 16.4999L11.5 13.4999C11.8398 12.8686 12.0539 12.8213 12.5 13.4999L15 17.9999' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <circle cx='9.5' cy='10.5' r='1' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { Base64ToImageIcon };
