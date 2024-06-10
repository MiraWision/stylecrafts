import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';

interface ColorPreviewProps {
  color: string;
  contrastColor: string;
  resetColor: () => void;
  children: React.ReactNode;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ color, contrastColor, resetColor, children }) => {
  return (
    <ColorPreviewContainer>
      <ColorPreviewBox color={color}>
        {!color && <DarkOverlay />}
        {!color && <ResetButtonCenter icon='pi pi-refresh' onClick={resetColor} />}
        {color && (
          <ColorDetails color={contrastColor}>
            {children}
          </ColorDetails>
        )}
        {color && <ResetButton icon='pi pi-refresh' onClick={resetColor} />}
      </ColorPreviewBox>
    </ColorPreviewContainer>
  );
};

export default ColorPreview;

const ColorPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0.125rem; 
  border-radius: 0.8rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5);
`;

const ColorPreviewBox = styled.div<{ color: string }>`
  width: 50vw;
  height: 25vw;
  border-radius: 0.8rem;
  background-color: ${({ color }) => color || 'transparent'};
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-imaЯge: ${({ color }) => !color ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%, transparent)' : 'none'};
  background-size: 1.25rem 1.25rem;
`;

const ColorDetails = styled.div<{ color: string }>`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: ${({ color }) => color};
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResetButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: var(--surface-200);
  color: var(--text-color-secondary);
  border: none;
  box-shadow: none;
  &:hover {
    background-color: var(--surface-c);
  }
`;

const ResetButtonCenter = styled(Button)`
  background-color: var(--surface-b);
  color: var(--text-color-secondary);
  border: none;
  box-shadow: none;
  &:hover {
    background-color: var(--surface-c);
  }
  position: absolute;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;
  pointer-events: none;
`;
