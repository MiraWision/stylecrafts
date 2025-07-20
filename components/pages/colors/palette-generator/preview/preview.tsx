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
  name: "iPhone 16 Pro Max",
  colorOptions: [
    { color: "Black Titanium", hex: "#232629", images: [
      "/image-examples/product_1.jpg",
      "/image-examples/product_2.jpg",
      "/image-examples/product_3.jpg"
    ] },
    { color: "White Titanium", hex: "#F7F7F7", images: [
      "/image-examples/product_4.jpg",
      "/image-examples/product_5.jpg",
      "/image-examples/product_6.jpg"
    ] },
    { color: "Natural Titanium", hex: "#D6CFC7", images: [
      "/image-examples/product_7.jpg",
      "/image-examples/product_8.jpg",
      "/image-examples/product_9.jpg"
    ] },
  ],
  storageOptions: [
    { size: 256, label: "256GB", price: 1499, available: true },
    { size: 512, label: "512GB", price: 1699, available: true },
    { size: 1024, label: "1TB", price: 1999, available: false }
  ],
  modelId: "A3100-16PM",
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
  margin-top: 1rem;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon * {
    fill: var(--text-color);
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
