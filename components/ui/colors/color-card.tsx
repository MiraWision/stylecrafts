import { CopyIcon } from '@/components/icons/copy';
import React from 'react';
import styled from 'styled-components';

interface Props {
  color: string;
  title?: string;
  onCopy?: (color: string) => void;
  onClick?: () => void;
}

const ColorCard: React.FC<Props> = ({ color, title, onCopy, onClick }) => {
  return (
    <Container onClick={onClick}>
      <ColorRectangle $backgroundColor={color} />

      {title && (
        <ColorTitle>{title}</ColorTitle>
      )}

      <ColorText>
        {color}
        <CopyIcon width='16' height='16' />
      </ColorText>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 0.25rem;
  border-radius: 0.5rem;
  min-width: 6.625rem;
  max-width: 6.625rem;
  overflow: hidden;
  border: 0.0625rem solid var(--surface-border);
  cursor: pointer;
`;

const ColorRectangle = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 6rem;
  height: 6rem;
  border-radius: 0.25rem;
  transition: width 0.3s;
`;

const ColorTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.125rem 0;
`;

const ColorText = styled.div`
  font-size: 0.75rem;
  color: var(--color-text);
  display: flex;
  align-items: center;

  .icon {
    margin-left: 0.25rem;
    opacity: 0;
    transition: opacity 0.3s;

    * {
      stroke: var(--primary-color);
    }
  }

  &:hover .icon {
    opacity: 1;
  }
`;

export { ColorCard };