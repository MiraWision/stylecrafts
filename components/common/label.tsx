import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface Props extends CSSProperties {
  children: React.ReactNode;
}

const Label: React.FC<Props> = ({ children, ...styleProps }) => {
  return (
    <Container style={styleProps}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  margin: ${({ margin }: CSSProperties) => margin || '0.25rem'};
  font-size: ${({ fontSize }: CSSProperties) => fontSize || '0.8rem'};
  font-weight: ${({ fontWeight }: CSSProperties) => fontWeight || 600};
  line-height: ${({ lineHeight }: CSSProperties) => lineHeight || 1.2};
  color: ${({ color }: CSSProperties) => color || 'var(--surface-900)'};
`;

export { Label };