import React from 'react';

import { Icon, IconProps } from './icon';

const BurgerIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <rect x='4.25' y='11.75' width='15.5' height='0.5' rx='0.25' stroke='#9CA3AF' strokeWidth='0.5'/>
      <rect x='4.25' y='5.75' width='15.5' height='0.5' rx='0.25' stroke='#9CA3AF' strokeWidth='0.5'/>
      <rect x='4.25' y='17.75' width='15.5' height='0.5' rx='0.25' stroke='#9CA3AF' strokeWidth='0.5'/>
    </Icon>
  );
}

export { BurgerIcon };
