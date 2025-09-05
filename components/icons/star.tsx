import React from 'react';
import styled from 'styled-components';

interface StarProps {
  filled: number;        
  size?: number;         
  fillColor?: string;    
  strokeColor?: string; 
}

const Star: React.FC<StarProps> = ({
  filled,
  size = 16,
  fillColor = '#FFD700',
  strokeColor = '#E0E0E0',
}) => (
  <StarWrapper size={size}>
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>

    {filled > 0 && (
      <FilledClip $width={filled * size}>
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            fill={fillColor}
            stroke="none"
          />
        </svg>
      </FilledClip>
    )}
  </StarWrapper>
);

const StarWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
`;

const FilledClip = styled.div<{ $width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $width }) => $width}px;
  overflow: hidden;
`;

export { Star };