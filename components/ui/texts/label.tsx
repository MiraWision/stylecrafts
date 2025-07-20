import styled from 'styled-components';

interface LabelProps {
  fontSize?: string;
}

const Label = styled.div<LabelProps>`
  margin-bottom: 0.25rem;
  font-size: ${({ fontSize }) => fontSize || '0.75rem'};
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);
`;

export { Label };
