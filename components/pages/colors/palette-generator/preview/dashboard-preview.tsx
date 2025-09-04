import React, { useState } from 'react';
import styled from 'styled-components';
import { Chart } from 'primereact/chart';
import { TrandUp } from '@/components/icons/trand-up';
import { TrandDown } from '@/components/icons/trand-down';
import { PaletteColor } from '../types';

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
  data: DashboardData;
  palette: PaletteColor[];
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

const Heatmap: React.FC<{
  primaryColor: string;
  textColor: string;
  backgroundColor?: string;
}> = React.memo(({ primaryColor, textColor, backgroundColor }) => {
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
    <HeatmapContainer backgroundColor={backgroundColor}>
      <InteractiveHeatmap>
        <GridContainer>
          <TimeLabels>
            {timeSlots.map((time, rowIndex) => (
              <TimeLabel key={rowIndex} $color={textColor}>
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
                    parseInt(primaryColor.slice(1, 3), 16),
                    parseInt(primaryColor.slice(3, 5), 16),
                    parseInt(primaryColor.slice(5, 7), 16),
                  ];
                  return (
                    <HeatmapCell
                      key={colIndex}
                      intensity={intensity}
                      onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                      onMouseLeave={handleMouseLeave}
                      $backgroundColor={`rgba(${r}, ${g}, ${b}, ${intensity})`}
                    />
                  );
                })}
              </Row>
            ))}
          </Grid>
        </GridContainer>
        <DaysOfWeekContainer>
          {daysOfWeek.map((day, i) => (
            <DayLabel key={i} $color={textColor}>
              {day}
            </DayLabel>
          ))}
        </DaysOfWeekContainer>
      </InteractiveHeatmap>
    </HeatmapContainer>
  );
});

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ data, palette }) => {
  const primaryColor = palette.find(color => color.title === 'Primary')?.baseColor || '#3468db';
  const accentColor = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const backgroundColor = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';
  
  // Get shades for better color variety
  const primaryShades = palette.find(color => color.title === 'Primary')?.shades || [];
  const accentShades = palette.find(color => color.title === 'Accent')?.shades || [];
  
  // Use lighter shades for backgrounds and darker shades for text
  const lightPrimary = primaryShades.find(s => s.shade >= 50)?.hex || primaryColor;
  const darkPrimary = primaryShades.find(s => s.shade <= 900)?.hex || primaryColor;
  const lightAccent = accentShades.find(s => s.shade >= 50)?.hex || accentColor;

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
        borderColor: primaryColor,
        backgroundColor: `${primaryColor}33`,
        fill: true,
      },
      {
        label: 'Success',
        data: data.transactionData.map((entry) => entry.success),
        borderColor: accentColor,
        backgroundColor: `${accentColor}33`,
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
        titleColor: textColor,
        bodyColor: textColor,
        backgroundColor: backgroundColor,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: '#E0E0E0' },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: '#E0E0E0' },
      },
    },
  };

  return (
    <DashboardContainer backgroundColor={backgroundColor}>
      <TopRow>
        {cardData.map((card, index) => (
          <Card
            key={index}
            positive={card.positive}
            $backgroundColor={card.positive ? `${primaryColor}1A` : `${accentColor}1A`}
          >
            <CardTop>
              <CardValue $color={textColor}>{card.value}</CardValue>
              <CardChange positive={card.positive}>
                {card.positive ? <TrandUp /> : <TrandDown />}
                {card.trend > 0 ? `+${card.trend}%` : `${card.trend}%`}
              </CardChange>
            </CardTop>
            <CardTitle $color={textColor}>{card.title}</CardTitle>
            <CardSubText textColor={textColor}>{card.dateRange}</CardSubText>
          </Card>
        ))}
      </TopRow>

      <BottomRow>
        <HeatmapSection>
          <Heatmap primaryColor={primaryColor} textColor={textColor} backgroundColor={darkPrimary} />
        </HeatmapSection>

        <ChartSection>
          <ChartWrapper>
            <Chart
              type="line"
              data={lineData}
              options={lineOptions}
              style={{ height: '200px' }}
            />
          </ChartWrapper>
        </ChartSection>
      </BottomRow>
    </DashboardContainer>
  );
};

const HeatmapContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
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
  margin-right: 8px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  gap: 2px;
`;

const HeatmapCell = styled.div<{ intensity: number; $backgroundColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  transition: background-color 0.1s ease;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const DaysOfWeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-left: 40px;
  width: 12.2rem;
`;

const DayLabel = styled.div<{ $color: string }>`
  font-size: 12px;
  text-align: center;
  width: 24px;
  color: ${({ $color }) => $color};
`;

const TimeLabel = styled.div<{ $color: string }>`
  font-size: 13px;
  text-align: right;
  color: ${({ $color }) => $color};
`;

const DashboardContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: 0.5rem;
  min-height: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const BottomRow = styled.div`
  display: flex;
  gap: 20px;
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

const Card = styled.div<{ positive: boolean; $backgroundColor: string }>`
  padding: 20px;
  border-radius: 10px;
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
  font-size: 24px;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;

const CardChange = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ positive }) => (positive ? 'var(--success-color)' : 'var(--error-color)')};
  font-weight: bold;
`;

const CardTitle = styled.h3<{ $color: string }>`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${({ $color }) => $color};
`;

const CardSubText = styled.div<{ textColor?: string }>`
  font-size: 12px;
  color: ${({ textColor }) => textColor || 'var(--text-muted)'};
  opacity: 0.7;
`;

export { DashboardPreview };