import React from 'react';

import { Icon, IconProps } from './icon';

const ColorInspectorIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M8.5 8.5C8.5 8.07156 8.63521 7.59935 9 6.9146C9.36479 7.59935 9.5 8.07156 9.5 8.5C9.5 8.85166 9.40906 9.14614 9.29295 9.3203C9.1966 9.46482 9.11209 9.5 9 9.5C8.88791 9.5 8.8034 9.46482 8.70705 9.3203C8.59094 9.14614 8.5 8.85166 8.5 8.5Z' stroke='#9CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
      <circle cx='9' cy='8' r='5.5' stroke='#9CA3AF'/>
      <path d='M13.5 13.5C14 15 14.5 15.5 15.5 16.5C17.1772 18.0555 18.1779 18.8589 20 20C20.5318 20.2243 20.7575 20.2535 21 20C21.2345 19.7559 21.2126 19.5233 21 19C19.8836 17.2511 19.1241 16.2661 17.5 14.5C16.5 13.5 16 13 14.5 12.5' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { ColorInspectorIcon };
