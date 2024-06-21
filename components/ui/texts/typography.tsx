import styled from 'styled-components';

const Title = styled.h1`
  margin: 1rem 0 2rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--surface-900);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    max-width: 80vw;
    margin: 0.25rem auto 1.5rem;
  }
`;

const Subtitle = styled.h2`
  margin: -1rem 0 2rem;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--surface-900);
  text-align: center;

  @media (max-width: 768px) { 
    font-size: 1rem;
  }
`;

export {
  Title,
  Subtitle,
};
