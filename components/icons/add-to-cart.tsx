import React from 'react';

import { Icon, IconProps } from './icon';

const AddToCart: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M3.5 6H5.19098C5.38037 6 5.5535 6.107 5.6382 6.27639L9.3618 13.7236C9.4465 13.893 9.61963 14 9.80902 14H17.191C17.3804 14 17.5535 13.893 17.6382 13.7236L20.1382 8.72361C20.3044 8.39116 20.0627 8 19.691 8H18.5"
        stroke="#9CA3AF"
        strokeLinecap="round"
      />
      <path
        d="M13.5 7V9M13.5 9H15.5M13.5 9V11M13.5 9H11.5"
        stroke="#9CA3AF"
        strokeLinecap="round"
      />
      <path
        d="M8.5 17C8.5 17.5523 8.94772 18 9.5 18C10.0523 18 10.5 17.5523 10.5 17C10.5 16.4477 10.0523 16 9.5 16C8.94772 16 8.5 16.4477 8.5 17Z"
        stroke="#9CA3AF"
        strokeLinecap="round"
      />
      <path
        d="M16.5 17C16.5 17.5523 16.9477 18 17.5 18C18.0523 18 18.5 17.5523 18.5 17C18.5 16.4477 18.0523 16 17.5 16C16.9477 16 16.5 16.4477 16.5 17Z"
        stroke="#9CA3AF"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export { AddToCart };
