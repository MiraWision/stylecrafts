import React from 'react';
import styled from 'styled-components';

interface ContainerTemplateProps {
  width: string | number;
  isMobile: boolean;
  children: React.ReactNode;
}

const ContainerTemplate: React.FC<ContainerTemplateProps> = ({ width, isMobile, children }) => {
  return (
    <StyledContainer width={width} isMobile={isMobile}>
      {children}
    </StyledContainer>
  );
};

export default ContainerTemplate;

const StyledContainer = styled.div<ContainerTemplateProps>`
  width: ${({ isMobile, width }) => isMobile ? '100%' : (typeof width === 'number' ? `${width}px` : width)};
  margin: 0 auto; 
`;