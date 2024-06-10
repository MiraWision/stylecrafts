import styled, { css } from 'styled-components';

const Header1 = styled.h1<{ centered?: boolean }>`
  margin: 1rem 0 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);

  ${({ centered }) => centered && css`
    text-align: center;
  `}
`;

const Header2 = styled.h2<{ centered?: boolean }>`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);

  ${({ centered }) => centered && css`
    text-align: center;
  `}
`;

export {
  Header1,
  Header2,
};
