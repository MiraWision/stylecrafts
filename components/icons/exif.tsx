import React from 'react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

const ExifIcon: React.FC<Props> = ({ width = '24', height = '24', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `icon ${className}` : 'icon'}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};

export { ExifIcon };
