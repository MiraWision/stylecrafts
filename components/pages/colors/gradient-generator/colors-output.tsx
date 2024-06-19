import React from 'react';
import styled from 'styled-components';

import { CopyButton } from '../../../ui/buttons/copy-button';

interface Props {
  colors: string[];
}

const ColorsOutput: React.FC<Props> = ({ colors }) => {
  return (
    <ColorsList>
      {colors.map((color, index) => (
        <React.Fragment key={index}>
          <ColorRectangle color={color} />

          <ColorText>{color}</ColorText>
          
          <CopyButton 
            text={color}
            label='Color'
          />
        </React.Fragment>
      ))}
    </ColorsList>
  );
}

const ColorsList = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.25rem;
  width: fit-content;
  align-items: center;
`;

const ColorRectangle = styled.div<{ color: string }>`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background-color: ${({ color }) => color};
`;

const ColorText = styled.div`
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--surface-900);
`;

export { ColorsOutput };