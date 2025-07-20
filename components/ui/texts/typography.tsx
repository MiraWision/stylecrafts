import styled from 'styled-components';

const Title = styled.h1`
  margin: 1rem 0 2rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--surface-900);
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0.25rem auto 1.5rem;
  }

  @media (max-width: 600px) {
    text-align: center;
    max-width: none;
  }
`;

const Subtitle = styled.h2`
  margin: -1rem 0 2rem;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--surface-900);
  text-align: left;

  @media (max-width: 768px) { 
    font-size: 1rem;
  }
`;

export {
  Title,
  Subtitle,
};
