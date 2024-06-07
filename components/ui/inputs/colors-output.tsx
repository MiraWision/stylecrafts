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
  grid-row-gap: 4px;
  height: fit-content;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ColorRectangle = styled.div<{ color: string }>`
  width: 72px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

const ColorText = styled.div`
  margin: 4px;
  font-size: 14px;
  font-weight: 400;
  width: 60px;
  color: var(--surface-900);
`;

export { ColorsOutput };