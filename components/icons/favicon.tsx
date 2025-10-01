import React from 'react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

const FaviconIcon: React.FC<Props> = ({ width = '24', height = '24', className }) => {
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
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export { FaviconIcon };
