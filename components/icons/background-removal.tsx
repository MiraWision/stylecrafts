import React from 'react';

export const BackgroundRemovalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"
      fill="currentColor"
    />
    <path
      d="M9 9h6v6H9V9zm2 2v2h2v-2h-2z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);
