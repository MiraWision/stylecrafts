import React from 'react';

import { Icon, IconProps } from './icon';

const LinkedInIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M13 11H14C14 10.9274 14.0149 10.9053 14.0192 10.899C14.0193 10.8988 14.0194 10.8986 14.0196 10.8985C14.0274 10.8867 14.0658 10.8351 14.1972 10.7694C14.4883 10.6239 15.0511 10.5 16 10.5C17.4477 10.5 18 11.5523 18 12V18H17V14C17 13.3459 16.8358 12.6716 16.3321 12.1679C15.8284 11.6642 15.1541 11.5 14.5 11.5C13.8459 11.5 13.1716 11.6642 12.6679 12.1679C12.1642 12.6716 12 13.3459 12 14V18H11V10.5H12V11H13Z' stroke='#9CA3AF' stroke-width='2' stroke-miterlimit='1' stroke-linecap='round'/>
      <rect x='2.5' y='2.5' width='19' height='19' rx='1.5' stroke='#9CA3AF'/>
      <circle cx='6.5' cy='6.5' r='1' stroke='#9CA3AF'/>
      <rect x='5.75' y='10.25' width='1.5' height='8' stroke='#9CA3AF' stroke-width='1.5'/>
    </Icon>
  );
}

export { LinkedInIcon };
