import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  gradient: string[];
}

const Cols = 20;
const Rows = 8;
const TotalCells = Cols * Rows;

const Preview: React.FC<Props> = ({ gradient }) => {
  const indexes = useMemo<number[]>(() => {
    return Array.from({ length: TotalCells }).map(() => Math.floor(Math.random() * gradient.length));
  }, [gradient]);

  return (
    <Container>
      {indexes.map((index, i) => (
        <Cell
          key={i}
          color={gradient[index]}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  margin: 0 auto 4rem;
  display: grid;
  grid-template-columns: repeat(${Cols}, 1fr);
  border-collapse: collapse;
`;

const Cell = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border: 0.0625rem solid var(--surface-200);
  transition: background-color 0.6s;
`;

export { Preview };