import React from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';

import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';

interface Props {
  color: Color;
}

const CurrentColor: React.FC<Props> = ({ color }) => {
  return (
    <Container>
      <ColorSquare $backgroundColor={color.get()} />

      <Footer>
        {[
          { title: 'HEX', value: color.hex() },
          { title: 'RGB', value: color.rgb() },
          { title: 'HSL', value: color.hsl() },
        ].map(({ title, value }) => (
          <ColorTitle key={title}>
            <b>{title}: </b>{value}
            <CopyButtonStyled text={value} />
          </ColorTitle>
        ))}
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.0625rem solid var(--surface-300);
  border-radius: 0.25rem;
  width: 16rem;
  height: 16rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 6rem;
  padding: 0 0.75rem;
  background-color: var(--surface-0);
  border-radius: 0 0 0.25rem 0.25rem;
`;

const CopyButtonStyled = styled(CopyIconButton)`
  opacity: 0;
  transition: opacity 0.3s;
`;

const ColorTitle = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: 0.875rem;
  color: var(--text-color-secondary);

  b {
    color: var(--text-color);
    font-weight: 500;
    margin-right: 0.25rem;
  }

  &:hover {
    ${CopyButtonStyled} {
      opacity: 1;
    }
  }
`;

const ColorSquare = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 100%;
  height: 10rem;
  border-radius: 0.25rem 0.25rem 0 0;
  transition: all 0.3s;
`;

export { CurrentColor };
