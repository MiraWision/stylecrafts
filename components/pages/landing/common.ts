import styled, { keyframes } from 'styled-components';

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
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Headline = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
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

export { 
  Container,
  Headline, 
  FeaturesRow, 
  fadeInSlideUp,
};
