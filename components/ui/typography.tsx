import styled from 'styled-components';

const Title = styled.h1`
  margin: 1rem 0 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);
  text-align: center;

  @media (max-width: 1200px) { 
    font-size: 1.8rem;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const Subtitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);

  @media (max-width: 1200px) { 
    font-size: 1.4rem;
  }

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

export {
  Title,
  Subtitle,
};
