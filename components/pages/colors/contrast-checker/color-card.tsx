import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ColorPicker } from 'primereact/colorpicker';

interface ColorCardProps {
  color: string;
  label: string;
  onColorChange: (color: string) => void;
  onSelectContrastColor?: () => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, label, onColorChange, onSelectContrastColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (e: any) => {
    const selectedColor = `#${e.value.toUpperCase()}`;
    onColorChange(selectedColor);
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
          {onSelectContrastColor && (
            <ContrastButton onClick={onSelectContrastColor}>
              Improve Contrast
            </ContrastButton>
          )}
        </ColorLabel>
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

const ContrastButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  min-width: 160px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }
`;

export { ColorCard };