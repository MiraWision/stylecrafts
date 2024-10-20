import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ data, palette }) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const handleMouseEnter = (row: number, col: number) => {
    setHoveredCell({ row, col });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const getIntensity = (row: number, col: number, hoveredRow: number | null, hoveredCol: number | null) => {
    if (hoveredRow === null || hoveredCol === null) return 0.1;

    const distance = Math.abs(row - hoveredRow) + Math.abs(col - hoveredCol);
    const maxDistance = 3;
    if (distance > maxDistance) return 0.1;

    const intensity = 1 - distance / maxDistance;
    return Math.max(0.1, intensity);
  };

  const primaryColor = palette.find(color => color.title === 'Primary')?.baseColor || '#3468db';
  const accentColor = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const backgroundColor = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';

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

  return (
    <DashboardContainer>
      <TopRow>
        {cardData.map((card, index) => (
          <Card key={index} positive={card.positive}  style={{ backgroundColor: card.positive ? `${primaryColor}1A` : `${accentColor}1A` }}>
            <CardTop>
              <CardValue style={{ color: textColor }}>{card.value}</CardValue>
              <CardChange positive={card.positive}>
                {card.positive ? <TrandUp /> : <TrandDown />}
                {card.trend > 0 ? `+${card.trend}%` : `${card.trend}%`}
              </CardChange>
            </CardTop>
            <CardTitle style={{ color: textColor }}>{card.title}</CardTitle>
            <CardSubText>{card.dateRange}</CardSubText>
          </Card>
        ))}
      </TopRow>

      <BottomRow>
        <HeatmapSection>
          <HeatmapContainer>
            <InteractiveHeatmap>
              <GridContainer>
                <TimeLabels>
                  {timeSlots.map((time, rowIndex) => (
                    <TimeLabel key={rowIndex} style={{ color: textColor }}>{time}</TimeLabel>
                  ))}
                </TimeLabels>
                <Grid>
                  {Array.from({ length: 7 }, (_, rowIndex) => (
                    <Row key={rowIndex}>
                      {Array.from({ length: 7 }, (_, colIndex) => (
                        <HeatmapCell
                          key={colIndex}
                          intensity={getIntensity(rowIndex, colIndex, hoveredCell?.row || null, hoveredCell?.col || null)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                          onMouseLeave={handleMouseLeave}
                          style={{ backgroundColor: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, ${getIntensity(rowIndex, colIndex, hoveredCell?.row || null, hoveredCell?.col || null)})` }}
                        />
                      ))}
                    </Row>
                  ))}
                </Grid>
              </GridContainer>
              <DaysOfWeekContainer>
                {daysOfWeek.map((day, index) => (
                  <DayLabel key={index} style={{ color: textColor }}>{day}</DayLabel>
                ))}
              </DaysOfWeekContainer>
            </InteractiveHeatmap>
          </HeatmapContainer>
        </HeatmapSection>

        <ChartSection>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke={primaryColor} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="success" stroke={accentColor} />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>
      </BottomRow>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
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

const Card = styled.div<{ positive: boolean }>`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const CardSubText = styled.div`
  font-size: 12px;
  color: gray;
`;

const CardChange = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ positive }) => (positive ? 'green' : 'red')};
  font-weight: bold;
`;

const HeatmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 320px;
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
  margin-right: 10px;
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

const HeatmapCell = styled.div<{ intensity: number }>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  transition: background-color 0.1s ease;
`;

const DaysOfWeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-left: 40px;
  width: 17rem;
`;

const DayLabel = styled.div`
  font-size: 14px;
  text-align: center;
  width: 30px;
`;

const TimeLabel = styled.div`
  font-size: 14px;
  text-align: right;
`;

export { DashboardPreview };
