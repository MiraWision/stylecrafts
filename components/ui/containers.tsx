import styled from 'styled-components';

const MainContainer = styled.div`
  width: 70%;
  margin: 0 auto 10vh;
  min-height: 50vh;
`;

const SingleColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export {
  MainContainer,
  SingleColumnContainer,
};
