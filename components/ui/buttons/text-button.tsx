import styled from 'styled-components';

import { Button } from 'primereact/button';

const TextButton = styled(Button)`
  padding: 0.125rem 0.5rem;
  width: fit-content;
  height: fit-content;
  color: var(--primary-color);
  border: none;
  background-color: transparent;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }

  &:focus, &:active {
    outline: none;
    box-shadow: none;
  }
`;

export { TextButton };
