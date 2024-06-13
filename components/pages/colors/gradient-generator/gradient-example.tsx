import { generateMultiSteppedGradient } from '@mirawision/colorize';
import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Gradient {
  name: string;
  colors: [string, ...Array<number | string>];
}

interface Props {
  example: Gradient;
  onClick: () => void;
}

const GradientExample: React.FC<Props> = ({ example, onClick }) => {
  const gradient = useMemo(() => generateMultiSteppedGradient(...example.colors), [example]);

  return (
    <Container onClick={onClick}>
      <Label>{example.name}</Label>
      <ColorsContainer>
        {gradient.map((item) => (
          <ColorBox key={item} color={item} />
        ))}
      </ColorsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Label = styled.div`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--surface-900);
`;

const ColorsContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const ColorBox = styled.div<{ color: string }>`
  width: 2rem;
  height: 1rem;
  background-color: ${({ color }) => color};
`;

export { GradientExample };

export type { Gradient };
