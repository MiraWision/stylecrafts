import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProductPreview } from './ecommerce-preview';
import { DashboardPreview } from './dashboard-preview';
import { StyleguidePreview } from './styleguide-preview';
import { BlogPreview } from './blog-preview';
import { ChevronLeftIcon } from '@/components/icons/chevron-left';
import { ChevronRightIcon } from '@/components/icons/chevron-right';
import { ShuffleIconButton } from '@/components/ui/icon-buttons/shuffle-icon-button';
import { PaletteColor } from '../types';

interface Props {
  palette: PaletteColor[];
}

const productData = {
  name: "Shoes Reebok Zig Kinetica 3",
  price: 199.0,
  imageUrl: [
    "https://via.placeholder.com/400x400?text=Image+1",
    "https://via.placeholder.com/400x400?text=Image+2",
    "https://via.placeholder.com/400x400?text=Image+3"
  ],
  colorOptions: [
    { color: "White", hex: "#FFFFFF" },
    { color: "Black", hex: "#000000" },
    { color: "Pink", hex: "#ff69b4" } 
  ],
  sizeOptions: [
    { size: 40.5, available: true },
    { size: 41, available: true },
    { size: 42, available: false }, 
    { size: 43, available: true }
  ],
  modelId: "HR1325ROO-8",
  rating: 4.7,
  reviewsCount: 52
};

const dashboardData = {
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

const Preview: React.FC<Props> = ({ palette }) => {
  const previews = [
    'Blog Preview',
    'Ecommerce',
    'Styleguide',
    'Dashboard'
  ];

  const [selectedPreview, setSelectedPreview] = useState<number>(0);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);


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
          <StyledChevronLeftIcon />

          {previews[selectedPreview - 1 < 0 ? previews.length - 1 : selectedPreview - 1]}
        </span>

        <h3>
          {previews[selectedPreview]}

          <ShuffleIconButton
            onClick={() => setRefreshIndex(refreshIndex + 1)}
          />
        </h3>
        
        <span onClick={nextPreview}>
          {previews[(selectedPreview + 1) % previews.length]}

          <StyledChevronRightIcon />
        </span>
      </Header>

      <SliderContainer>
        <SliderContent $translateX={selectedPreview * 100}>
          <PreviewContainer>
            <BlogPreview palette={palette} />
          </PreviewContainer>
          
          <ChartContainer>
            <ProductPreview 
              data={productData}
              palette={palette}
            />
          </ChartContainer>

          <StyleguideContainer>
            <StyleguidePreview   palette={palette} />
          </StyleguideContainer>

          <DashboardContainer>
            <DashboardPreview
              data={dashboardData}
              palette={palette}
            />
          </DashboardContainer>
        </SliderContent>
      </SliderContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

    button {
      margin-left: 0.5rem;
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;

    .icon {
      margin-right: 0.5rem;
    }
  }
`;

const SliderContainer = styled.div`
  width: 42rem;
  height: 30rem;
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

const StyleguideContainer = styled(PreviewContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardContainer = styled(PreviewContainer)`
`;

const ChartContainer = styled(PreviewContainer)`
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  margin-right: 0.5rem;
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  margin-left: 0.5rem;
`;

export { Preview };
