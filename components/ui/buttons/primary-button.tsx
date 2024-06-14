import styled from 'styled-components';

import { Button } from 'primereact/button';

const PrimaryButton = styled(Button)`
  font-size: 0.875rem;
  padding: 0 1rem;
  width: fit-content;
  height: 2rem;
  color: var(--primary-color);
  background-color: var(--surface-50);

  .p-button-label {
    padding: 0;
  }

  .pi {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

export { PrimaryButton };
