import React from 'react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

export const ConvertIcon: React.FC<Props> = ({ width = '24', height = '24', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
        fill="currentColor"
      />
      <path
        d="M19 15L20.09 19.26L27 20L20.09 20.74L19 25L17.91 20.74L11 20L17.91 19.26L19 15Z"
        fill="currentColor"
      />
      <path
        d="M5 15L6.09 19.26L13 20L6.09 20.74L5 25L3.91 20.74L-3 20L3.91 19.26L5 15Z"
        fill="currentColor"
      />
    </svg>
  );
};

