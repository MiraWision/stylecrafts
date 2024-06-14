import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { useToast } from '@/components/ui/toast';

interface Props {
  palette: string[];
  onRemoveColor: (index: number) => void;
  onRefreshPalette: () => void;
}

const Palette: React.FC<Props> = ({ palette, onRemoveColor, onRefreshPalette }) => {
  const { showToast } = useToast();
  
  const rowsCount = useMemo(() => {
    const count = Math.ceil((palette.length + 1) / 4);

    return count < 2 ? 2 : count;
  }, [palette]);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);

    showToast({ severity: 'success', summary: 'Color copied to clipboard' });
  };

  const copyAllColors = () => {
    navigator.clipboard.writeText(JSON.stringify(palette));

    showToast({ severity: 'success', summary: 'Colors array copied to clipboard' });
  };

  return (
    <Container>
      <PaletteGrid>
        {Array.from({ length: rowsCount * 4 }).map((_, index) => {
          if (index === rowsCount * 4 - 1) {
            return (
              <RefreshButton key={index} onClick={onRefreshPalette}>
                <i className='pi pi-refresh' />
              </RefreshButton>
            );
          }

          const color = palette[index];

          if (!color) {
            return (
              <EmptyColorSquare 
                key={index} 
                color="#fff" 
              />
            );
          }

          return (
            <ColorSquare
              key={index}
              color={color}
              onClick={() => copyColor(color)}
              onDoubleClick={() => onRemoveColor(index)}
            >
              {color && (
                <TooltipContent>
                  {color}
                </TooltipContent>
              )}
            </ColorSquare>
          );
        })}
      </PaletteGrid>

      <PrimaryButton icon='pi pi-copy' onClick={copyAllColors}>
        Copy All
      </PrimaryButton>
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

const ColorSquare = styled.div<{ color: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ color }) => color};
  position: relative;
  border-radius: 0.25rem;
`;

const EmptyColorSquare = styled(ColorSquare)`
  border: 1px solid var(--surface-300);
  background-color: transparent;
`;

const TooltipContent = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
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

const CopyAllButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #45a049;
  }
`;

export { Palette };
