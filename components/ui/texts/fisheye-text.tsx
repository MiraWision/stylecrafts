import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

interface FisheyeTextProps {
  children: string;
  as?: string;
  className?: string;
}

const FisheyeText: React.FC<FisheyeTextProps> = ({ children, as, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scales = useMemo(() => {
    return children.split('').map((_, index) => {
      if (hoveredIndex === null) return 1;
      
      const distance = Math.abs(hoveredIndex - index);
      
      const indexScales = [1.5, 1.3, 1.1];

      return indexScales[distance] ?? 1;
    });
  }, [children, hoveredIndex]);

  return (
    <TextContainer 
      as={as ?? 'p'}
      className={className}
    >
      {children.split('').map((char, index) => (
        <Span
          key={index}
          $scale={scales[index]}
          onMouseOver={() => setHoveredIndex(index)}
          onMouseOut={() => setHoveredIndex(null)}
        >
          {char}
        </Span>
      ))}
    </TextContainer>
  );
};

const TextContainer = styled.p`
  display: flex;
  color: var(--text-color);
  cursor: default;
`;

const Span = styled.span.attrs<{ $scale: number }>(({ $scale }) => ({
  style: {
    transform: `scale(${$scale})`,
  },
}))<{ $scale: number }>`
  display: inline-block;
  transition: transform 0.1s;
  padding: 0 0.5px;
`;

export { FisheyeText };
