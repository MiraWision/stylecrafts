import React from 'react';
import styled from 'styled-components';

import { TextButton } from '@/components/ui/buttons/text-button';

interface Props {
  color: string;
}

const CurrentColor: React.FC<Props> = ({ color }) => {
  return (
    <Container>
      <Header>
        <ColorTitle>{color}</ColorTitle>
      </Header>

      <ColorSquare color={color} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.0625rem solid var(--surface-300);
  border-radius: 0.25rem;
  width: 14rem;
  height: 9rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding: 0 0.75rem;
  background-color: var(--surface-0);
  border-radius: 0.25rem 0.25rem 0 0;
`;

const ColorTitle = styled.div`
  font-size: 1rem;
  color: var(--text-color-secondary);
`;

const ColorSquare = styled.div<{ color: string }>`
  width: 100%;
  height: 7rem;
  background-color: ${({ color }) => color};
  border-radius: 0 0 0.25rem 0.25rem;
`;

export { CurrentColor };
