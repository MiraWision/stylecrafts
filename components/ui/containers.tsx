import styled from 'styled-components';

interface TwoColumnsContainerProps {
  ratio?: string;
}


const FullSizeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 42rem;
  margin: 0 auto 10vh;
  min-height: 50vh;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SingleColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TwoColumnsContainer = styled.div<TwoColumnsContainerProps>`
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


export {
  FullSizeContainer,
  MainContainer,
  SingleColumnContainer,
  TwoColumnsContainer,
};
