import React from 'react';
import styled from 'styled-components';

interface Props {
  gradient: string[];
  data: number[];
  cols: number;
  rows: number;
}

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HeatmapPreview: React.FC<Props> = ({ gradient, data, cols, rows }) => {
  return (
    <Heatmap cols={cols}>
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <HeaderCell key={i}>
          {i % 4 === 1 ? Months[(i - 1) / 4 % 12] : ''}
        </HeaderCell>
      ))}
      {data.map((index, i) => (
        <React.Fragment key={i}>
          {i % cols === 0 && (
            <HeaderCell>{Days[i / cols % 7]}</HeaderCell>
          )}
          <Cell color={gradient[index]} />
        </React.Fragment>
      ))}
    </Heatmap>
  );
}

const Heatmap = styled.div<{ cols: number }>`
  width: fit-content;
  margin: 0 auto 2rem;
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols + 1}, 1fr);
  border-collapse: collapse;
`;

const Cell = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border: 0.0625rem solid var(--surface-200);
  transition: background-color 0.6s;
`;

const HeaderCell = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  color: var(--text-color-secondary);
`;

export { HeatmapPreview };