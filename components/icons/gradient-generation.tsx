import React from 'react';

import { Icon, IconProps } from './icon';

const GradientGenerationIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <rect x='4.5' y='4.5' width='15' height='15' rx='1.5' stroke='#9CA3AF'/>
      <rect x='5.5' y='17.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='7.5' y='15.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='15.5' y='11.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='5.5' y='13.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='7.5' y='11.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='9.5' y='17.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='11.5' y='15.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='13.5' y='13.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='15.5' y='15.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='17.5' y='17.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='13.5' y='17.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='11.5' y='11.5' width='1' height='1' stroke='#9CA3AF'/>
      <rect x='9.5' y='9.5' width='1' height='1' stroke='#9CA3AF' strokeMiterlimit='8.86082'/>
    </Icon>
  );
}

export { GradientGenerationIcon };
