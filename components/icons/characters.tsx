import React from 'react';

import { Icon, IconProps } from './icon';

const CharactersIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M12 4H10C7.49997 4 6 5.5 6 8C6 10.5 7.49997 12 10 12H12M12 4V20M12 4H15M17 4H15M15 4V20' stroke='#9CA3AF' strokeLinecap='round' strokeLinejoin='round'/>
    </Icon>
  );
}

export { CharactersIcon };
