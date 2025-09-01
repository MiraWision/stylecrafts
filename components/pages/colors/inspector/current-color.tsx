import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Color } from '@mirawision/colorize';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { convertColor, ColorFormat, getColorFormat } from '@mirawision/colorize';

interface Props {
  color: Color;
  isInput?: boolean;
  onColorChange?: (newColor: Color) => void;
}

// Helper function to safely get color values
const getSafeColorValue = (color: Color, method: 'hex' | 'rgb' | 'hsl'): string => {
  try {
    switch (method) {
      case 'hex':
        return color.hex();
      case 'rgb':
        return color.rgb();
      case 'hsl':
        return color.hsl();
      default:
        return '#ffffff';
    }
  } catch (error) {
    console.warn(`Failed to get ${method} value:`, error);
    // Return default values based on method
    switch (method) {
      case 'hex':
        return '#ffffff';
      case 'rgb':
        return 'rgb(255, 255, 255)';
      case 'hsl':
        return 'hsl(0, 0%, 100%)';
      default:
        return '#ffffff';
    }
  }
};

const CurrentColor: React.FC<Props> = ({ color, isInput = false, onColorChange }) => {
  const [currentColor, setCurrentColor] = useState<Color>(color);
  const [inputValue, setInputValue] = useState<string>(getSafeColorValue(color, 'hex'));

  useEffect(() => {
    setCurrentColor(color);
    setInputValue(getSafeColorValue(color, 'hex'));
  }, [color]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setInputValue(newColor);
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      const colorFormat = getColorFormat(newColor);
      if (colorFormat) {
        try {
          const convertedColor = convertColor(newColor, colorFormat);
          const updatedColor = new Color(convertedColor);
          setCurrentColor(updatedColor);
          if (onColorChange) {
            onColorChange(updatedColor);
          }
        } catch (error) {
          console.warn('Failed to convert color:', newColor, error);
        }
      }
    }
  };

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    try {
      const updatedColor = new Color(newColor);
      setCurrentColor(updatedColor);
      setInputValue(newColor);
      if (onColorChange) {
        onColorChange(updatedColor);
      }
    } catch (error) {
      console.warn('Failed to create Color object:', newColor, error);
    }
  };

  const handleColorSquareClick = () => {
    document.getElementById('colorPicker')?.click();
  };

  // Safely get current color values
  const currentHex = getSafeColorValue(currentColor, 'hex');
  const currentRgb = getSafeColorValue(currentColor, 'rgb');
  const currentHsl = getSafeColorValue(currentColor, 'hsl');

  return (
    <Container>
      <ColorSquare $backgroundColor={currentHex} onClick={handleColorSquareClick} />
      <ColorPicker
        id="colorPicker"
        type="color"
        value={currentHex}
        onChange={handleColorPickerChange}
      />
      {isInput && (
        <InputContainer>
          <ColorInput type="text" value={inputValue} onChange={handleInputChange} />
        </InputContainer>
      )}
      <Footer>
        {[
          { title: 'HEX', value: currentHex },
          { title: 'RGB', value: currentRgb },
          { title: 'HSL', value: currentHsl },
        ].map(({ title, value }) => (
          <ColorTitle key={title}>
            <ColorLabel>{title}:</ColorLabel>
            <ColorValue>{value}</ColorValue>
            <CopyButtonStyled text={value} />
          </ColorTitle>
        ))}
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.0625rem solid var(--surface-300);
  border-radius: 0.25rem;
  width: 16rem;
  height: 16rem;
  position: relative;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 6rem;
  padding: 0 0.75rem;
  background-color: var(--surface-0);
  border-radius: 0 0 0.25rem 0.25rem;
`;

const CopyButtonStyled = styled(CopyIconButton)`
  opacity: 0;
  transition: opacity 0.3s;
`;

const ColorTitle = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 1rem;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  height: 2rem;
  font-size: 0.875rem;
  color: var(--text-color);

  &:hover {
    ${CopyButtonStyled} {
      opacity: 1;
    }
  }
`;

const ColorLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--surface-900);
  flex-shrink: 0;
`;

const ColorValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--surface-900);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const ColorSquare = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 100%;
  height: 10rem;
  border-radius: 0.25rem 0.25rem 0 0;
  transition: all 0.3s;
  cursor: pointer;
`;

const ColorPicker = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
`;

const ColorInput = styled.input`
  width: 80%;
  padding: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.25rem;
  font-size: 1rem;
  text-align: center;
`;

export { CurrentColor };
