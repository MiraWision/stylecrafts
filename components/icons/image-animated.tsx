import React from 'react';

import { Icon, IconProps } from './icon';

const ImageAnimatedIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <style>
        {`
          #motionPath {
            fill: transparent;
            stroke: transparent;
            stroke-width: 0;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          #motionCircle {
            fill: transparent;
            stroke: #6b7280;
            stroke-width: 1;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7666 13.0003C9.90491 13.0049 10.0351 13.0666 10.1263 13.1707L11.8763 15.1707C12.0581 15.3786 12.037 15.6944 11.8292 15.8763C11.6214 16.0581 11.3055 16.0371 11.1237 15.8293L9.72561 14.2315L7.35352 16.6036C7.15826 16.7988 6.84167 16.7988 6.64641 16.6036C6.45115 16.4083 6.45115 16.0917 6.64641 15.8964L9.39641 13.1464C9.49426 13.0486 9.6283 12.9957 9.7666 13.0003Z" fill="#9CA3AF"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3964 11.6464C12.5917 11.4512 12.9083 11.4512 13.1035 11.6464L17.3535 15.8964C17.5488 16.0917 17.5488 16.4083 17.3535 16.6036C17.1583 16.7988 16.8417 16.7988 16.6464 16.6036L12.75 12.7071L10.8535 14.6036C10.6583 14.7988 10.3417 14.7988 10.1464 14.6036C9.95115 14.4083 9.95115 14.0917 10.1464 13.8964L12.3964 11.6464Z" fill="#9CA3AF"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20 6H4C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6ZM4 5C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5H4Z" fill="#9CA3AF"/>
      
      <path id='motionPath' d='M16.5 10.5C13.5 8.5 9.5 8.50002 6.5 10.5' fill='transparent' stroke='transparent' strokeWidth='0' strokeLinecap='round' strokeLinejoin='round'/>
      
      <circle id='motionCircle' r='1' stroke='#6b7280'>
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