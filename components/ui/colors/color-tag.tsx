import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  color: string;
  onCopy?: (color: string) => void;
}

const ColorTag: React.FC<Props> = ({ color, onCopy }) => {
  const [icon, setIcon] = useState('copy');

  const handleCopy = () => {
    if (onCopy) {
      onCopy(color);
      setIcon('check');
      
      setTimeout(() => {
        setIcon('copy');
      }, 3000);
    }
  };

  return (
    <Container onClick={handleCopy}>
      <ColorRectangle $backgroundColor={color} />

      <CopyIconContainer>
        {icon === 'copy' ? (
          <CopyIcon width='16' height='16' />
        ) : (
          <CheckmarkIcon width='16' height='16' />
        )}
      </CopyIconContainer>

      <ColorText>{color}</ColorText>
    </Container>
  );
}

const ColorRectangle = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 5.5rem;
  height: 1.5rem;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.25rem;
  transition: width 0.3s;
`;

const CopyIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 1.875rem;
  z-index: -1;
  transform: translateY(-50%);
  display: flex;
  align-items: center;

  .icon {
    * {
      fill: var(--primary-color);
    }
  }
`;

const ColorText = styled.div`
  position: absolute;
  top: 50%;
  left: 3rem;
  z-index: -1;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: var(--color-text);
`;

const Container = styled.div`
  position: relative;
  padding: 0.25rem;
  border-radius: 0.5rem;
  min-width: 6.125rem;
  max-width: 6.125rem;
  overflow: hidden;
  border: 0.0625rem solid var(--surface-border);
  cursor: pointer;

  &:hover ${ColorRectangle} {
    width: 1.5rem;
  }
`;

export { ColorTag };
