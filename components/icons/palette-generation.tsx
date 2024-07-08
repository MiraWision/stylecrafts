import React from 'react';

import { Icon, IconProps } from './icon';

const PaletteGenerationIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M15.9999 12H18.9999' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M4.99988 12H7.99988' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <circle cx='12' cy='12' r='7.5' transform='rotate(30 12 12)' stroke='#9CA3AF'/>
      <circle cx='12' cy='12' r='3.5' transform='rotate(30 12 12)' stroke='#9CA3AF'/>
      <path d='M10 15.4641L9 17.1962' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M15 6.80371L14 8.53576' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M14 15.4641L15.5 18.0622' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M8.5 5.93774L10 8.53582' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
    </Icon>
  );
}

export { PaletteGenerationIcon };
