import styled from 'styled-components';

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

const TwoColumnsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  margin: 2rem auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export {
  FullSizeContainer,
  MainContainer,
  SingleColumnContainer,
  TwoColumnsContainer,
};
