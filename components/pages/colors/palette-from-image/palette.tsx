import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { useToast } from '@/components/ui/toast';

import { CopyTextButton } from '@/components/ui/text-buttons/copy-text-button';
import { RefreshIcon } from '@/components/icons/refresh';
import { CopyIcon } from '@/components/icons/copy';
import { CheckmarkIcon } from '@/components/icons/checkmark';

interface Props {
  palette: string[];
  onRemoveColor: (index: number) => void;
  onRefreshPalette: () => void;
}

const Palette: React.FC<Props> = ({ palette, onRemoveColor, onRefreshPalette }) => {
  const { toast } = useToast();

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const rowsCount = useMemo(() => {
    return Math.max(Math.ceil((palette.length + 1) / 3), 5);
  }, [palette]);

  const onCopyColor = (color: string) => {
    copyText(color);
    toast.success('Copied!', 'Color copied to clipboard');
    GAService.logEvent(analyticsEvents.colors.blender.colorCopied(color));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const onCopyAllColors = () => {
    const text = JSON.stringify(palette).replace(/,/g, ', ');
    copyText(text);
    toast.success('Copied!', 'Colors copied to clipboard');
    GAService.logEvent(analyticsEvents.colors.blender.colorsCopied(text));
  };

  return (
    <Container>
      <PaletteGrid>
        {Array.from({ length: rowsCount * 3 }).map((_, index) => {
          if (index === rowsCount * 3 - 1) {
            return (
              <RefreshButton key={index} onClick={onRefreshPalette}>
                <RefreshIcon />
              </RefreshButton>
            );
          }

          const color = palette[index];

          if (!color) {
            return (
              <EmptyColorSquare
                key={index}
                $backgroundColor='#ffffff'
              />
            );
          }

          return (
            <ColorSquare
              key={index}
              $backgroundColor={color}
              onClick={() => onCopyColor(color)}
              onDoubleClick={() => onRemoveColor(index)}
            >
              <Overlay>
                <ColorTooltip>{color}</ColorTooltip>
                {isCopied ? (
                  <CheckmarkIcon width="16" height="16" />
                ) : (
                  <CopyIcon width="16" height="16" />
                )}
              </Overlay>
            </ColorSquare>
          );
        })}
      </PaletteGrid>

      <CopyTextButton
        text='Copy All'
        copyText={JSON.stringify(palette).replace(/,/g, ', ')}
        onCopyCallback={onCopyAllColors}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.25rem;
  }
`;

const ColorSquare = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 4rem;
  height: 4rem;
  position: relative;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    
    &:active {
      transform: scale(0.95);
    }
  }
`;

const EmptyColorSquare = styled(ColorSquare)`
  border: 1px solid var(--surface-300);
  background-color: transparent !important;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.05) 2px,
    rgba(0, 0, 0, 0.05) 4px
  );
  cursor: default;

  &:hover {
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0.25rem;
  cursor: pointer;

  .icon * {
    fill: var(--primary-color);
  }

  ${ColorSquare}:hover & {
    opacity: 1;
  }
`;

const ColorTooltip = styled.div`
  color: var(--color-text);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
`;

const RefreshButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--surface-300);
  border-radius: 0.25rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--surface-300);

  &:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
    
    > i {
      color: var(--primary-color);
    }
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    
    &:active {
      transform: scale(0.95);
    }
  }
`;

export { Palette };