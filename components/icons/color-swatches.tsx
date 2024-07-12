import React from 'react';

import { Icon, IconProps } from './icon';

const ColorSwatchesIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M20 21H4C3.5 21 3 20.5 3 20V17C3 16.5 3.5 16 4 16H20C20.5 16 21 16.5 21 17V20C21 20.5 20.5 21 20 21Z' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M9 21V18M12 17.5V19.5M15 17.5V19.5M18 17.5V19.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <circle cx='5.5' cy='18.5' r='1' stroke='#9CA3AF'/>
      <path d='M8 6.5V4C8 3.5 7.5 3 7 3H4C3.5 3 3 3.5 3 4L3 14.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M4.5 12H5M4.5 9H5.5M4.5 6H6.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M18.4282 14.3301L20.5933 13.0801C21.0263 12.8301 21.2093 12.1471 20.9593 11.7141L19.4593 9.11603C19.2093 8.68301 18.5263 8.5 18.0933 8.75L9 14' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M11.915 14.0491L12.165 14.4821M14.5131 12.5491L15.0131 13.4151M17.1112 11.0491L18.1112 12.7811' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M14.3301 9.0718L15.5801 6.90673C15.8301 6.47372 15.6471 5.79071 15.2141 5.54071L12.616 4.04071C12.183 3.79071 11.5 3.97372 11.25 4.40673L6 13.5' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M8.54907 12.085L8.98208 12.335M10.0491 9.48688L10.9151 9.98688M11.5491 6.88881L13.2811 7.88881' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { ColorSwatchesIcon };
