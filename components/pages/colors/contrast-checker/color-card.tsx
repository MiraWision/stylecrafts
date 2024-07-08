import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import { randomColor } from '@mirawision/colorize';
import { checkContrast } from '@/utils/check-contrast';
import { colorPalettes } from './examples';

interface ColorCardProps {
  color: string;
  label: string;
  onRandomColor: () => void;
  onColorChange: (color: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, label, onRandomColor, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (e: any) => {
    const hexColor = `#${e.value.toUpperCase()}`;
    onColorChange(hexColor);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <CardContainer>
      <Column>
        <ColorArea $backgroundColor={color} onClick={() => setShowColorPicker(!showColorPicker)}>
          {showColorPicker && (
            <ColorPickerWrapper ref={colorPickerRef}>
              <ColorPicker value={color.slice(1)} onChange={handleColorChange} inline />
            </ColorPickerWrapper>
          )}
        </ColorArea>
      </Column>

      <Column>
        <ColorLabel>
          <ChangeText>{label}</ChangeText>

          <ColorCode>{color}</ColorCode>
        </ColorLabel>

        <IconWrapper>
          <Label>Random color</Label>
        </IconWrapper>
      </Column>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorArea = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  border-radius: 0.4rem;
  width: 9rem;
  height: 6rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.4rem;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
`;

const ColorLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ColorCode = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
`;

const ChangeText = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  color: #6c757d;
`;

const RandomColorButton = styled(Button)`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  color: #fff !important;
  border: none;
  background-color: #007bff !important;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: #fff !important;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.span`
  font-size: 0.9rem;
  margin-top: 0.4rem;
  color: #6c757d;
  margin-left: 0.4rem;
`;

export { ColorCard };