import styled, { css, keyframes } from 'styled-components';

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(250px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
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
  margin-bottom: 2rem;
  margin-left: 1rem;
  animation: ${fadeInSlideUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const FeaturesRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Column = styled.div.attrs<{ $isVisible: boolean }>(({ $isVisible }) => ({
  className: $isVisible ? 'visible' : '',
}))`
  opacity: 0;
  animation-fill-mode: both;
  max-width: 25rem;

  &.visible {
    animation: ${fadeInSlideUp} 1s ease-out;
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TextColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

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
      width: 90%;
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
};
