import React from 'react';

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

export const AsciiArtIcon: React.FC<Props> = ({ width = '24', height = '24', className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="6" y="8" fontSize="3" fill="currentColor" fontFamily="monospace">A</text>
      <text x="9" y="8" fontSize="3" fill="currentColor" fontFamily="monospace">S</text>
      <text x="12" y="8" fontSize="3" fill="currentColor" fontFamily="monospace">C</text>
      <text x="15" y="8" fontSize="3" fill="currentColor" fontFamily="monospace">I</text>
      <text x="18" y="8" fontSize="3" fill="currentColor" fontFamily="monospace">I</text>
      
      <text x="6" y="12" fontSize="2" fill="currentColor" fontFamily="monospace">#</text>
      <text x="9" y="12" fontSize="2" fill="currentColor" fontFamily="monospace">%</text>
      <text x="12" y="12" fontSize="2" fill="currentColor" fontFamily="monospace">@</text>
      <text x="15" y="12" fontSize="2" fill="currentColor" fontFamily="monospace">*</text>
      
      <text x="6" y="16" fontSize="2" fill="currentColor" fontFamily="monospace">.</text>
      <text x="9" y="16" fontSize="2" fill="currentColor" fontFamily="monospace">:</text>
      <text x="12" y="16" fontSize="2" fill="currentColor" fontFamily="monospace">-</text>
      <text x="15" y="16" fontSize="2" fill="currentColor" fontFamily="monospace">=</text>
    </svg>
  );
};
