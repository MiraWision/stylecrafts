import React from 'react';
import styled from 'styled-components';

interface FlexContainerProps {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  children: React.ReactNode;
  isMobile: boolean;
}

const FlexContainer: React.FC<FlexContainerProps> = ({ 
  flexDirection = 'row', justifyContent, alignItems, children, isMobile 
}) => {
  return (
    <StyledFlexContainer 
      flexDirection={flexDirection} 
      justifyContent={justifyContent} 
      alignItems={alignItems} 
      isMobile={isMobile}
    >
      {children}
    </StyledFlexContainer>
  );
};

export default FlexContainer;

const StyledFlexContainer = styled.div<Pick<FlexContainerProps, 'flexDirection' | 'justifyContent' | 'alignItems' | 'isMobile'>>`
  display: flex;
  flex-direction: ${({ isMobile, flexDirection }) => isMobile ? 'column' : flexDirection};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'stretch' }) => alignItems};
`;