import React from 'react';
import styled from 'styled-components';

interface Props {
  slidesCount: number;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
}

const SlidesMenu: React.FC<Props> = ({ slidesCount, currentSlideIndex, onSlideChange }) => {
  return (
    <Container>
      {Array.from({ length: slidesCount }).map((_, index) => (
        <SlideWrapper
          key={index}
          onClick={() => index !== currentSlideIndex && onSlideChange(index)}
        >
          <Slide $isActive={index === currentSlideIndex} />
        </SlideWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
`;

const SlideWrapper = styled.div`
  padding: 0.5rem;
  cursor: pointer;
`;

const Slide = styled.div.attrs<{ $isActive: boolean }>(({ $isActive }) => ({
  className: $isActive ? 'active' : '',
}))`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 0.25rem;
  background-color: var(--surface-300);
  transition: all 1s;

  &:hover {
    background-color: var(--surface-400);
  }

  &.active {
    height: 2rem;
    background-color: var(--primary-color);

    &:hover {
      background-color: var(--primary-color);
    }
  }
`;


export { SlidesMenu };