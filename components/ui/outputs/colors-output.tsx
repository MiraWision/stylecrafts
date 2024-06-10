import React from 'react';
import styled from 'styled-components';

import { CopyButton } from '../buttons/copy-button';

interface Props {
  colors: string[];
}

const ColorsOutput: React.FC<Props> = ({ colors }) => {
  return (
    <ColorsList>
      {colors.map((color, index) => (
        <ColorContainer key={color}>
          <ColorRectangle color={color} />

          <ColorText>{color}</ColorText>
          
          <CopyButton text={color} />
        </ColorContainer>
      ))}
    </ColorsList>
  );
}

const ColorsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0.25rem;
  height: fit-content;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ColorRectangle = styled.div<{ color: string }>`
  width: 4.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background-color: ${({ color }) => color};
`;

const ColorText = styled.div`
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  width: 3.75rem;
  color: var(--surface-900);
`;

export { ColorsOutput };