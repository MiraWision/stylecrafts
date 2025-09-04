import React, { useState } from 'react';
import styled from 'styled-components';
import { adjustBrightness } from '@mirawision/colorize';

import { PaletteColor } from '../types';

import { Chart } from 'primereact/chart';
import { TrandUp } from '@/components/icons/trand-up';
import { TrandDown } from '@/components/icons/trand-down';

interface DashboardData {
  grossRevenue: number;
  avgOrderValue: number;
  totalOrders: number;
  transactionData: {
    month: string;
    total: number;
    success: number;
  }[];
}

interface TrendCardData {
  title: string;
  value: number | string;
  trend: number;
  positive: boolean;
  dateRange: string;
}

interface DashboardPreviewProps {
  palette: PaletteColor[];
}

const dashboardData: DashboardData = {
  grossRevenue: 99.32,
  avgOrderValue: 56.12,
  totalOrders: 230,
  transactionData: [
    { month: 'Jan', total: 456, success: 400 },
    { month: 'Feb', total: 587, success: 550 },
    { month: 'Mar', total: 300, success: 280 },
    { month: 'Apr', total: 450, success: 420 },
    { month: 'May', total: 600, success: 587 },
  ]
};

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

const Heatmap: React.FC<{
  $primaryColor: string;
  $textColor: string;
  $backgroundColor?: string;
}> = React.memo(({ $primaryColor, $textColor, $backgroundColor }) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const handleMouseEnter = (row: number, col: number) => {
    setHoveredCell({ row, col });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const getBaseIntensity = (row: number, col: number) => {
    return 0.2 + 0.8 * ((row + col) / 12); 
  };

  const getIntensity = (row: number, col: number) => {
    if (!hoveredCell) return getBaseIntensity(row, col);
    const distance = Math.abs(row - hoveredCell.row) + Math.abs(col - hoveredCell.col);
    const maxDistance = 3;
    if (distance > maxDistance) return getBaseIntensity(row, col);

    return Math.max(getBaseIntensity(row, col), 1 - distance / maxDistance);
  };

  return (
    <HeatmapContainer $backgroundColor={$backgroundColor}>
      <InteractiveHeatmap>
        <GridContainer>
          <TimeLabels>
            {timeSlots.map((time, rowIndex) => (
              <TimeLabel key={rowIndex} $color={$textColor}>
                {time}
              </TimeLabel>
            ))}
          </TimeLabels>
          <Grid>
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <Row key={rowIndex}>
                {Array.from({ length: 7 }, (_, colIndex) => {
                  const intensity = getIntensity(rowIndex, colIndex);
                  const [r, g, b] = [
                    parseInt($primaryColor.slice(1, 3), 16),
                    parseInt($primaryColor.slice(3, 5), 16),
                    parseInt($primaryColor.slice(5, 7), 16),
                  ];
                  return (
                    <HeatmapCell
                      key={colIndex}
                      onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                      onMouseLeave={handleMouseLeave}
                      $intensity={intensity}
                      $backgroundColor={`rgba(${r}, ${g}, ${b}, ${intensity})`}
                      $textColor={$textColor}
                    />
                  );
                })}
              </Row>
            ))}
          </Grid>
        </GridContainer>
        <DaysOfWeekContainer>
          {daysOfWeek.map((day, i) => (
            <DayLabel key={i} $color={$textColor}>
              {day}
            </DayLabel>
          ))}
        </DaysOfWeekContainer>
      </InteractiveHeatmap>
    </HeatmapContainer>
  );
});

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ palette }) => {
  const data = dashboardData;
  const primary = palette.find(c => c.title === 'Primary')?.baseColor ?? '#3468db';
  const accent = palette.find(c => c.title === 'Accent')?.baseColor  ?? '#e74c3c';
  const text = palette.find(c => c.title === 'Text')?.baseColor    ?? '#333333';
  const background = palette.find(c => c.title === 'Background')?.baseColor ?? '#f5f5f5';
  
  const primaryLight = adjustBrightness(primary, 10);
  const backgroundDark = adjustBrightness(background, -5);

  const cardData: TrendCardData[] = [
    {
      title: 'Gross Revenue',
      value: `$${data.grossRevenue.toFixed(2)}`,
      trend: 2.15,
      positive: true,
      dateRange: 'From Jan 01, 2024 - Mar 30, 2024',
    },
    {
      title: 'Avg. Order Value',
      value: `$${data.avgOrderValue.toFixed(2)}`,
      trend: -2.15,
      positive: false,
      dateRange: 'From Jan 01, 2024 - Mar 30, 2024',
    },
    {
      title: 'Total Orders',
      value: data.totalOrders.toString(),
      trend: 2.15,
      positive: true,
      dateRange: 'From Jan 01, 2024 - Mar 30, 2024',
    },
  ];

  const lineData = {
    labels: data.transactionData.map((entry) => entry.month),
    datasets: [
      {
        label: 'Total',
        data: data.transactionData.map((entry) => entry.total),
        borderColor: primary,
        backgroundColor: `${primary}33`,
        fill: true,
      },
      {
        label: 'Success',
        data: data.transactionData.map((entry) => entry.success),
        borderColor: accent,
        backgroundColor: `${accent}33`,
        fill: true,
      },
    ],
  };

  const lineOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleColor: text,
        bodyColor: text,
        backgroundColor: background,
      },
    },
    scales: {
      x: {
        ticks: { color: text },
        grid: { color: '#E0E0E0' },
      },
      y: {
        ticks: { color: text },
        grid: { color: '#E0E0E0' },
      },
    },
  };

  return (
    <DashboardContainer $backgroundColor={background}>
      <TopRow>
        {cardData.map((card, index) => (
          <Card
            key={index}
            $backgroundColor={card.positive ? `${primary}1A` : `${accent}1A`}
          >
            <CardTop>
              <CardValue $color={text}>{card.value}</CardValue>
              <CardChange $textColor={text} $primaryColor={primary}>
                {card.positive ? <TrandUp /> : <TrandDown />}
                {card.trend > 0 ? `+${card.trend}%` : `${card.trend}%`}
              </CardChange>
            </CardTop>
            <CardTitle $color={text}>{card.title}</CardTitle>
            <CardSubText $textColor={text}>{card.dateRange}</CardSubText>
          </Card>
        ))}
      </TopRow>

      <BottomRow>
        <HeatmapSection>
          <Heatmap $primaryColor={primary} $textColor={text} $backgroundColor={backgroundDark} />
        </HeatmapSection>

        <ChartSection>
          <ChartWrapper>
            <Chart
              type="line"
              data={lineData}
              options={lineOptions}
              style={{ height: '12.5rem' }}
            />
          </ChartWrapper>
        </ChartSection>
      </BottomRow>
    </DashboardContainer>
  );
};

const HeatmapContainer = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 15rem;
`;

const InteractiveHeatmap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const GridContainer = styled.div`
  display: flex;
`;

const TimeLabels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0.5rem;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const HeatmapCell = styled.div<{ $intensity: number; $backgroundColor: string; $textColor: string }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.125rem;
  transition: background-color 0.1s ease;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
`;

const DaysOfWeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-left: 2.5rem;
  width: 12.2rem;
`;

const DayLabel = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  text-align: center;
  width: 1.5rem;
  color: ${({ $color }) => $color};
`;

const TimeLabel = styled.div<{ $color: string }>`
  font-size: 0.8125rem;
  text-align: right;
  color: ${({ $color }) => $color};
`;

const DashboardContainer = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
  border-radius: 0.5rem;
  min-height: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
`;

const BottomRow = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const HeatmapSection = styled.div`
  flex: 1;
`;

const ChartSection = styled.div`
  flex: 1;
`;

const ChartWrapper = styled.div`
  width: 100%;
`;

const Card = styled.div<{ $backgroundColor: string }>`
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardValue = styled.div<{ $color: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;

const CardChange = styled.div<{ $textColor: string, $primaryColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  color: ${({ $textColor }) => $textColor};
  font-weight: 600;

  .icon * {
    fill: ${({ $primaryColor }) => $primaryColor};
  }
`;

const CardTitle = styled.h3<{ $color: string }>`
  font-size: 1rem;
  margin-bottom: 0.625rem;
  color: ${({ $color }) => $color};
`;

const CardSubText = styled.div<{ $textColor?: string }>`
  font-size: 0.75rem;
  color: ${({ $textColor }) => $textColor};
  opacity: 0.7;
`;

export { DashboardPreview };