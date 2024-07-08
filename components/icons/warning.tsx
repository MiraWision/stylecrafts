import React from 'react';

import { Icon, IconProps } from './icon';

const WarningIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d='M12 8V13' stroke='#9CA3AF' stroke-linecap='round'/>
      <rect x='11.5' y='15.5' width='1' height='1' rx='0.5' stroke='#9CA3AF'/>
      <path d='M18.382 19H5.61803C4.87465 19 4.39116 18.2177 4.72361 17.5528L11.1056 4.78885C11.4741 4.05181 12.5259 4.05181 12.8944 4.78885L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19Z' stroke='#9CA3AF' stroke-linecap='round'/>
    </Icon>
  );
}

export { WarningIcon };
