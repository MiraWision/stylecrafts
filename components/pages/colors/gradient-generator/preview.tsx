import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { USAMap, StateAbbreviations } from '@mirawision/usa-map-react';

import { ChartPreview } from './chart-preview';
import { HeatmapPreview } from './heatmap-preview';
import { ChevronLeftIcon } from '@/components/icons/chevron-left';
import { ChevronRightIcon } from '@/components/icons/chevron-right';
import { ShuffleIcon } from '@/components/icons/shuffle';

interface Props {
  gradient: string[];
}

type MapSettings = Record<string, { fill: string }>;

const HeatmapCols = 18;
const HeatmapRows = 7;
const HeatmapTotalCells = HeatmapCols * HeatmapRows;

const BarsCount = 20;

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

    StateAbbreviations.forEach((state) => {
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
          <ChevronLeftIcon />

          {previews[selectedPreview - 1 < 0 ? previews.length - 1 : selectedPreview - 1]}
        </span>

        <h3>
          {previews[selectedPreview]}

          <ShuffleIcon
            onClick={() => setRefreshIndex(refreshIndex + 1)}
          />
        </h3>
        
        <span onClick={nextPreview}>
          {previews[(selectedPreview + 1) % previews.length]}

          <ChevronRightIcon />
        </span>
      </Header>

      <SliderContainer>
        <SliderContent $translateX={selectedPreview * 100}>
          <MapContainer>
            <USAMapStyled
              mapSettings={{
                width: '100%',
                height: 'fit-content',
              }}
              customStates={mapSettings}
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
          <LegendColor key={i} $backgroundColor={color} />
        ))}

        <LegendLabel>-100</LegendLabel>
      </Legend>
    </Container>
  );
}

const rotate = keyframes`
  0% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(-1);
  }

  100% {
    transform: scaleY(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const USAMapStyled = styled(USAMap)`
  background: var(--surface-100);
  border-radius: 1rem;

  * path {
    stroke-width: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon * {
    stroke: var(--text-color);
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;

    .icon {
      cursor: pointer;

      &:hover {
        animation: ${rotate} 2.5s infinite;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;

    .icon {
      margin-left: 0.5rem;
    }
  }
`;

const SliderContainer = styled.div`
  width: 42rem;
  height: 24rem;
  overflow: hidden;
  position: relative;
`;

const SliderContent = styled.div.attrs<{ $translateX: number }>(({ $translateX }) => ({
  style: {
    transform: `translateX(-${$translateX}%)`,
  },
}))`
  display: flex;
  transition: transform 0.5s ease;
`;

const PreviewContainer = styled.div`
  min-width: 42rem;
  height: 24rem;
  background: var(--surface-100);
  border-radius: 1rem;
`;

const MapContainer = styled(PreviewContainer)`
  * path {
    transition: fill 0.6s;
    stroke: var(--surface-200);
  }
`;

const HeatmapContainer = styled(PreviewContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContainer = styled(PreviewContainer)`
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 0.25rem;
`;

const LegendColor = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  transition: background-color 0.6s;
`;

const LegendLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
`;

export { Preview };