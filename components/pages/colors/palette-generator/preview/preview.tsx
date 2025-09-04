import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProductPreview } from './ecommerce-preview';
import { DashboardPreview } from './dashboard-preview';
import { StyleguidePreview } from './styleguide-preview';
import { BlogPreview } from './blog-preview';
import { ChevronLeftIcon } from '@/components/icons/chevron-left';
import { ChevronRightIcon } from '@/components/icons/chevron-right';
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

  const nextPreview = () => {
    setSelectedPreview((selectedPreview + 1) % previews.length);
  };

  const previousPreview = () => {
    setSelectedPreview((selectedPreview - 1 + previews.length) % previews.length);
  };
  
  return (
    <Container>
      <Header>
        <NavigationButton onClick={previousPreview}>
          <StyledChevronLeftIcon />
          {previews[(selectedPreview - 1 + previews.length) % previews.length]}
        </NavigationButton>

        <PreviewTitle>
          {previews[selectedPreview]}
        </PreviewTitle>
        
        <NavigationButton onClick={nextPreview}>
          {previews[(selectedPreview + 1) % previews.length]}
          <StyledChevronRightIcon />
        </NavigationButton>
      </Header>

      <SliderContainer>
        <SliderContent $translateX={selectedPreview * -25}>
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
            <StyleguidePreview palette={palette} />
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
  margin-top: 2rem;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const NavigationButton = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;
  color: var(--text-color);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const PreviewTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 42rem;
  height: 30rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 25rem;
    max-width: 100%;
  }
`;

const SliderContent = styled.div.attrs<{ $translateX: number }>(({ $translateX }) => ({
  style: {
    transform: `translateX(${$translateX}%)`,
  },
}))`
  display: flex;
  transition: transform 0.5s ease;
  width: 400%;
  height: 100%;
`;

const PreviewContainer = styled.div`
  flex: 0 0 25%;
  width: 25%;
  height: 100%;
  background: var(--surface-100);
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 0.75rem;
  }
`;

const StyleguideContainer = styled(PreviewContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardContainer = styled(PreviewContainer)``;

const ChartContainer = styled(PreviewContainer)``;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;

  @media (max-width: 768px) {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  margin-left: 0.5rem;
  width: 1rem;
  height: 1rem;

  @media (max-width: 768px) {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export { Preview };
