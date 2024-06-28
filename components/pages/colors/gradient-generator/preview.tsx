import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
// @ts-ignore
import USAMap from 'react-usa-map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ChartPreview } from './chart-preview';
import { HeatmapPreview } from './heatmap-preview';

interface Props {
  gradient: string[];
}

type MapSettings = Record<string, { fill: string }>;

const USStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const HeatmapCols = 18;
const HeatmapRows = 7;
const HeatmapTotalCells = HeatmapCols * HeatmapRows;

const BarsCount = 25;

const Preview: React.FC<Props> = ({ gradient }) => {
  const previews = [
    'USA Map',
    'Bar Chart',
    'Heatmap',
  ];

  const [selectedPreview, setSelectedPreview] = useState<number>(0);

  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const heatmapIndexes = useMemo<number[]>(() => {
    return Array.from({ length: HeatmapTotalCells }).map(() => Math.floor(Math.random() * gradient.length));
  }, [gradient, refreshIndex]);

  const mapSettings = useMemo<MapSettings>(() => {
    const settings: MapSettings = {};

    USStates.forEach((state) => {
      settings[state] = {
        fill: gradient[Math.floor(Math.random() * gradient.length)]
      };
    });

    return settings;
  }, [gradient, refreshIndex]);

  const chartData = useMemo<{ percentage: number, color: string }[]>(() => {
    return Array.from({ length: BarsCount }).map(() => {
      const percentage = Math.floor(Math.random() * 200) - 100;
      const colorIndex = Math.floor((percentage + 100) / 200 * (gradient.length - 1));
      
      return {
        percentage: percentage,
        color: gradient[gradient.length - 1 - colorIndex]
      };
    });
  }, [gradient, refreshIndex]);

  const nextPreview = () => {
    setSelectedPreview((selectedPreview + 1) % previews.length);
  };

  const previousPreview = () => {
    setSelectedPreview((selectedPreview - 1 + previews.length) % previews.length);
  };
  
  return (
    <Container>
      <Header>
        <span onClick={previousPreview}>
          <Icon icon={faChevronLeft} />

          {previews[selectedPreview - 1 < 0 ? previews.length - 1 : selectedPreview - 1]}
        </span>

        <h3>
          {previews[selectedPreview]}

          <Icon icon={faRefresh} onClick={() => setRefreshIndex(refreshIndex + 1)} />  
        </h3>
        
        <span onClick={nextPreview}>
          {previews[(selectedPreview + 1) % previews.length]}

          <Icon icon={faChevronRight} />
        </span>
      </Header>

      <SliderContainer>
        <SliderContent translateX={selectedPreview * 100}>
          <MapContainer>
            <USAMap 
              width='100%'
              height='fit-content'
              customize={mapSettings}
            />
          </MapContainer>
          
          <ChartContainer>
            <ChartPreview 
              data={chartData}
            />
          </ChartContainer>

          <HeatmapContainer>
            <HeatmapPreview
              gradient={gradient}
              data={heatmapIndexes}
              cols={HeatmapCols}
              rows={HeatmapRows}
            />
          </HeatmapContainer>
        </SliderContent>
      </SliderContainer>

      <Legend>
        <LegendLabel>+100</LegendLabel>

        {gradient.map((color, i) => (
          <LegendColor key={i} color={color} />
        ))}

        <LegendLabel>-100</LegendLabel>
      </Legend>
    </Container>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.75rem;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;

    ${Icon} {
      margin-left: 0.5rem;
      cursor: pointer;

      &:hover {
        animation: ${rotate} 1s infinite;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;

    ${Icon} {
      margin: 0 0.5rem;
    }
  }
`;

const SliderContainer = styled.div`
  width: 42rem;
  height: 24rem;
  overflow: hidden;
  position: relative;
`;

const SliderContent = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${({ translateX }) => translateX}%);
`;

const MapContainer = styled.div`
  min-width: 42rem;
  height: 24rem;

  * path {
    transition: fill 0.6s;
    stroke: var(--surface-200);
  }
`;

const HeatmapContainer = styled.div`
  min-width: 42rem;
  height: 24rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContainer = styled.div`
  min-width: 42rem;
  height: 24rem;
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 0.25rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  background-color: ${({ color }) => color};
  border: 0.0625rem solid var(--surface-border);
  transition: background-color 0.6s;
`;

const LegendLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
`;

export { Preview };