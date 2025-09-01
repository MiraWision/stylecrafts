import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CopyIcon } from '@/components/icons/copy';
import Link from 'next/link';
import { IconLink } from '@/components/ui/links/icon-link';

interface Props {
  color: string;
  title?: string;
  onCopy?: (color: string) => void;
  onClick?: () => void;
}

const ColorCard: React.FC<Props> = ({ color, title, onCopy, onClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(color);
    }
    
    if (isClient && navigator.clipboard) {
      navigator.clipboard.writeText(color);
    }
  };

  return (
    <Container>
      <ColorRectangle $backgroundColor={color}>
        <CenteredIconLinkWrapper>
          <IconLink href={`/colors/inspector#${color.replace('#', '')}`} text="Inspect" />
        </CenteredIconLinkWrapper>
      </ColorRectangle>

      {title && <ColorTitle>{title}</ColorTitle>}

      <ColorText onClick={handleCopy}>
        {color}
        <CopyIcon className="icon" width="16" height="16" />
      </ColorText>
    </Container>
  );
};

// Стилизация компонентов
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
  position: relative;
  transition: width 0.3s;

  &:hover a {
    opacity: 1;
  }
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
      fill: var(--primary-color);
    }
  }

  &:hover .icon {
    opacity: 1;
  }
`;

const CenteredIconLinkWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,0.85);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  padding: 0.3rem 0.8rem;
  z-index: 2;
  display: flex;
  align-items: center;
`;

export { ColorCard };