import styled from 'styled-components';

interface TwoColumnsContainerProps {
  ratio?: string;
}

export const FullSizeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 42rem;
  margin: 0 auto 10vh;
  min-height: 50vh;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SingleColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const TwoColumnsContainer = styled.div<TwoColumnsContainerProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ ratio }) => ratio || '1fr 1fr'};
  grid-column-gap: 2rem;
  margin: 2rem auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 0 auto 1rem;
  }
`;

export const DocumentContainer = styled.div`
  width: 40rem;
  margin: 2rem auto;
  background: var(--surface-card);
  border-radius: 1rem;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.07);
  padding: 2rem 2rem;
  font-size: 1rem;
  color: var(--text-color);

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto 1rem;
    padding: 0.5rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
  
  h1, h2, h3 {
    color: var(--primary-color);
    margin-top: 0rem;
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  iframe {
    width: 100%;
    border: none;
  }
`;
