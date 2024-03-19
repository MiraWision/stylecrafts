import React from 'react';
import styled from 'styled-components';

interface GridTemplateProps {
  gridTemplateColumns: string;
  isMobile: boolean;
  children: React.ReactNode;
}

const GridTemplate: React.FC<GridTemplateProps> = ({ gridTemplateColumns, isMobile, children }) => {
  return (
    <StyledGrid gridTemplateColumns={gridTemplateColumns} isMobile={isMobile}>
      {children}
    </StyledGrid>
  );
}

export default GridTemplate;

const StyledGrid = styled.div<{isMobile: boolean; gridTemplateColumns: string;}>`
  display: grid;
  grid-template-columns: ${props => props.isMobile ? '1fr' : props.gridTemplateColumns};
  gap: 1rem;
`;