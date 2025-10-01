import React from 'react';

interface Props {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const RasterToSvgIcon: React.FC<Props> = ({ width = '24', height = '24', className }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="14" y="15" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M10 6L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 9L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="18" r="1.5" fill="currentColor"/>
    </svg>
  );
};

export { RasterToSvgIcon };
