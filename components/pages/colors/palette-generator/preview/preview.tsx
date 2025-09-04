import React, { useState } from 'react';
import styled from 'styled-components';
import { ProductPreview } from './ecommerce-preview';
import { DashboardPreview } from './dashboard-preview';
import { FormPreview } from './form-preview';
import { BlogPreview } from './blog-preview';
import { ChevronLeftIcon } from '@/components/icons/chevron-left';
import { ChevronRightIcon } from '@/components/icons/chevron-right';
import { PaletteColor } from '../types';

interface Props {
  palette: PaletteColor[];
}


const Preview: React.FC<Props> = ({ palette }) => {
  const previews = [
    'Blog',
    'E-commerce',
    'Form',
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
              palette={palette}
            />
          </ChartContainer>

          <StyleguideContainer>
            <FormPreview palette={palette} />
          </StyleguideContainer>

          <DashboardContainer>
            <DashboardPreview
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
