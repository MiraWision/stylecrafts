import styled from 'styled-components';

import { Button } from 'primereact/button';

const PrimaryButton = styled(Button)`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;

  .p-button-label {
    padding: 0.5rem;
  }

  .pi {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

export { PrimaryButton };
