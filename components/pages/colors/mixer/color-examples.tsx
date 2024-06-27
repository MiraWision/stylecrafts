import React from 'react';
import styled from 'styled-components';

import { ColorExample } from './types';
import { colorsExamples } from './examples';

interface Props {
  onColorSelect: (color: ColorExample) => void;
}

const ColorExamples: React.FC<Props> = ({ onColorSelect }) => {
  return (
    <>
      {Object.entries(colorsExamples).map(([group, colors]) => (
        <React.Fragment key={group}>
          <GroupTitle key={group}>
            {group} shades
          </GroupTitle>

          <Container>
            {colors.map((color) => (
              <ColorCard key={color.name} onClick={() => onColorSelect(color)}>          
                <ColorName>
                  {color.name}
                </ColorName>

                <ColorSquare color={color.color} />
              </ColorCard>
            ))}
          </Container>
        </React.Fragment>
      ))}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 2rem;
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
  text-transform: capitalize;
  align-self: flex-start;
`;

const ColorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  max-width: 8rem;
`;

const ColorSquare = styled.div<{ color: string }>`
  width: 8rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  background-color: ${({ color }) => color};
`;

const ColorName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.125rem;
  white-space: nowrap;
`;

export { ColorExamples };