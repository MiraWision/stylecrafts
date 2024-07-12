import React from 'react';

import { Icon, IconProps } from './icon';

const ImageCompressionIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M6.5 14.75L9.25 12L10.125 13L11 14' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M10 12.75L12.25 10.5L16.5 14.75' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <circle cx='17' cy='10.25' r='1' stroke='#9CA3AF'/>
      <path d='M12 3V6.75M12 6.75L12.75 5.75H11.25L12 6.75Z' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M12 20.5V16.75M12 16.75L11.25 17.75H12.75L12 16.75Z' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M4.46319 6.94695C10.0375 8.34621 14.0256 8.34864 19.5305 6.95628C20.5311 6.7032 21.5 7.44259 21.5 8.43907V15.0466C21.5 16.0459 20.5253 16.7869 19.5209 16.53C14.0156 15.1219 10.0416 15.1631 4.45598 16.5608C3.46132 16.8097 2.5 16.0729 2.5 15.0802V8.42933C2.5 7.43482 3.46517 6.69643 4.46319 6.94695Z' stroke='#9CA3AF'/>
    </Icon>
  );
}

export { ImageCompressionIcon };
