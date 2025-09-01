import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';
import { CopyIcon } from '@/components/icons/copy';
import Link from 'next/link';
import { IconLink } from '@/components/ui/links/icon-link';
import { ColorInspectorIcon } from '@/components/icons/color-inspector';

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
    
    if (isClient) {
      copyText(color);
    }
  };

  return (
    <Container>
      <ColorRectangle $backgroundColor={color}>
        <OverlayLink href={`/colors/inspector#${color.replace('#', '')}`}>
          <OverlayContent>
            <ColorInspectorIcon width="16" height="16" />
            <span>Inspect</span>
          </OverlayContent>
        </OverlayLink>
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
`;

const OverlayLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.85);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  text-decoration: none;
  color: var(--color-primary);

  ${ColorRectangle}:hover & {
    opacity: 1;
  }
`;

const OverlayContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  svg {
    fill: var(--color-primary);
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

export { ColorCard };