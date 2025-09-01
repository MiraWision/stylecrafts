import React from 'react';
import { Icon, IconProps } from './icon';

interface ExternalLinkIconProps extends Omit<IconProps, 'children'> {}

const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
};

export { ExternalLinkIcon };
