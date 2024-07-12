import React from 'react';

import { Icon, IconProps } from './icon';

const MoonIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M17.8971 14.0802C17.0981 15.6963 16.2321 16.1963 15.7991 16.4463C12.335 18.4463 9.10291 16.8482 7.60291 14.2501C6.10291 11.652 6.33496 8.05396 9.79906 6.05396C10.2321 5.80396 11.0981 5.30396 12.8971 5.41998C10.067 10.5181 12.067 13.9822 17.8971 14.0802Z' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { MoonIcon };
