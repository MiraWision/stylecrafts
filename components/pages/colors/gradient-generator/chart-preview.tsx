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

      <TopLegend>+100</TopLegend>

      <BottomLegend>-100</BottomLegend>
      
      <XAxis />
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--surface-100);
  border-radius: 1rem;
`;

const Chart = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
  margin-left: 9%;
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
  left: 3%;
  top: 0;
`;

const XAxis = styled(Axis)`
  width: 96%;
  height: 0.0625rem;
  left: 3%;
  bottom: 50%;
`;

const Legend = styled.div`
  position: absolute;
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--surface-500);
`

const TopLegend = styled(Legend)`
  left: 4%;
  top: 0.25rem;
`;

const BottomLegend = styled(Legend)`
  left: 4%;
  bottom: 0.25rem;
`;

export { ChartPreview };