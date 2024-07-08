import React from 'react';

import { Icon, IconProps } from './icon';

const ImageAnimatedIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M7 16.25L9.75 13.5L10.625 14.5L11.5 15.5' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M10.5 14.25L12.75 12L17 16.25' stroke='#9CA3AF' stroke-linecap='round' stroke-linejoin='round'/>
      <rect x='2.5' y='5.5' width='19' height='13' rx='1.5' stroke='#9CA3AF'/>

      <path id='motionPath' d='M16.5 10.5C13.5 8.5 9.5 8.50002 6.5 10.5' stroke='transparent' stroke-width='0' stroke-linecap='round' stroke-linejoin='round'/>
      
      <circle r='1' stroke='#9CA3AF'>
        <animateMotion 
          repeatCount='indefinite'
          dur='2s' 
          keyTimes='0; 0.5; 1' 
          keyPoints='0; 1; 0'
          calcMode='linear'
        >
          <mpath href='#motionPath' />
        </animateMotion>
      </circle>
    </Icon>
  );
}

export { ImageAnimatedIcon };