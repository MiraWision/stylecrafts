import React from 'react';
import styled from 'styled-components';

interface Props {
  data: { percentage: number, color: string }[];
}

const ChartPreview: React.FC<Props> = ({ data }) => {
  return (
    <ChartContainer>
      <Chart>
        {data.map((bar, index) => (
          <Bar
            key={index}
            $percentage={bar.percentage}
            $backgroundColor={bar.color}
          />
        ))}
      </Chart>
      <YAxis />
      <XAxis />
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 0.0625rem solid var(--surface-border);
`;

const Chart = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const Bar = styled.div.attrs<{ $backgroundColor: string, $percentage: number }>(({ $backgroundColor, $percentage }) => ({
  style: {
    backgroundColor: $backgroundColor,
    top: $percentage > 0 ? `${(100 - $percentage) / 2}%` : '50%',
    height: `${Math.abs($percentage / 2)}%`,
  },
}))`
  position: relative;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: var(--surface-100);
  font-size: 0.5rem;
  transition: all 0.6s;
`;

const Axis = styled.div`
  position: absolute;
  background-color: var(--surface-300);
`;

const YAxis = styled(Axis)`
  width: 0.0625rem;
  height: 100%;
  left: 0;
  top: 0;
`;

const XAxis = styled(Axis)`
  width: 100%;
  height: 0.0625rem;
  left: 0;
  bottom: 50%;
`;

export { ChartPreview };