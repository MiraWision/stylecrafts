import styled, { css, keyframes } from 'styled-components';
import { ObservableSlider } from './observable-slider';

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(5vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInAnimation = css`
  animation: ${fadeInSlideUp} 1s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
`;

const Container = styled(ObservableSlider)`
  width: 100vw;
  height: auto;
  padding: 3rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Headline = styled.h2`
  font-size: 2.25rem;
  font-weight: 400;
  margin-bottom: 4rem;
  margin-left: 1rem;
  animation: ${fadeInSlideUp} 1s ease-out;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const FeaturesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
`;

const Column = styled.div`
`;

const TextColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    border-left: 0.125rem solid var(--surface-border);
    border-right: 0.125rem solid var(--surface-border);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--surface-100);

    @media (max-width: 768px) {
      width: 100%;
      padding: 0.75rem 1rem;
    }

    &.accent {
      border-color: var(--primary-color);
    }

    a {
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export { 
  Container,
  Headline, 
  FeaturesRow, 
  Column,
  TextColumn,
  fadeInSlideUp,
  fadeInAnimation,
};
