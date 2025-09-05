import React from 'react';

interface StartIconProps {
  size?: number;
  color?: string;
}

export const StartIcon: React.FC<StartIconProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19V20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20V19C15.866 19 19 15.866 19 12Z" 
        fill={color}
      />
      <path 
        d="M9 9.80859C9.0003 9.06545 9.78249 8.58265 10.4473 8.91504L14.8291 11.1055C15.5662 11.474 15.5661 12.526 14.8291 12.8945L10.4473 15.085C9.78249 15.4173 9.0003 14.9345 9 14.1914V9.80859ZM10 14.1914L14.3818 12L10 9.80859V14.1914Z" 
        fill={color}
      />
    </svg>
  );
};
