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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 31;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100vw - 5rem);
    margin: 0 auto;
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
    margin: 0 0 1rem;
  }
`;

export {
  Title,
  Subtitle,
};
