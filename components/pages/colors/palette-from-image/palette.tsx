import React, { useMemo } from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { useToast } from '@/components/ui/toast';
import { CopyTextButton } from '@/components/ui/text-buttons/copy-text-button';
import { RefreshIcon } from '@/components/icons/refresh';
import { CopyIcon } from '@/components/icons/copy';

interface Props {
  palette: string[];
  onRemoveColor: (index: number) => void;
  onRefreshPalette: () => void;
}

const Palette: React.FC<Props> = ({ palette, onRemoveColor, onRefreshPalette }) => {
  const { toast } = useToast();

  const rowsCount = useMemo(() => {
    if (palette.length === 0) {
      return 2;
    }

    return Math.ceil((palette.length + 1) / 4);
  }, [palette]);

  const copyColor = (color: string) => {
    copyText(color);
    toast.success('Copied!', 'Color copied to clipboard');
    GAService.logEvent(analyticsEvents.colors.blender.colorCopied(color));
  };

  const onCopy = () => {
    const text = JSON.stringify(palette).replace(/,/g, ', ');
    copyText(text);
    toast.success('Copied!', 'Colors copied to clipboard');
    GAService.logEvent(analyticsEvents.colors.blender.colorsCopied(text));
  };

  return (
    <Container>
      <PaletteGrid>
        {Array.from({ length: rowsCount * 4 }).map((_, index) => {
          if (index === rowsCount * 4 - 1) {
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
              onClick={() => copyColor(color)}
              onDoubleClick={() => onRemoveColor(index)}
            >
              <Overlay>
                <ColorTooltip>{color}</ColorTooltip>
                <CopyIcon />
              </Overlay>
            </ColorSquare>
          );
        })}
      </PaletteGrid>

      <CopyTextButton
        text='Copy All'
        copyText={JSON.stringify(palette).replace(/,/g, ', ')}
        onCopyCallback={onCopy}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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
`;

const EmptyColorSquare = styled(ColorSquare)`
  border: 1px solid var(--surface-300);
  background-color: transparent;
  cursor: default;
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
  justify-content: space-between;
  flex-direction: column;
  padding: 0.5rem;
  background: var(--maskbg);
  border-radius: 0.25rem;

  i {
    font-size: 1rem;
    color: var(--primary-color);
    margin-top: 0.25rem;
  }

  ${ColorSquare}:hover & {
    opacity: 1;
  }
`;

const ColorTooltip = styled.div`
  color: var(--gray-50);
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
  transition: border-color 0.3s;
  color: var(--surface-300);

  &:hover {
    border-color: var(--primary-color);
    
    > i {
      color: var(--primary-color);
    }
  }
`;

export { Palette };