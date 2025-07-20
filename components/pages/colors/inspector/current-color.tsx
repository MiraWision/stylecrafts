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

const CurrentColor: React.FC<Props> = ({ color, isInput = false, onColorChange }) => {
  const [currentColor, setCurrentColor] = useState<Color>(color);
  const [inputValue, setInputValue] = useState<string>(color.hex());

  useEffect(() => {
    setCurrentColor(color);
    setInputValue(color.hex());
  }, [color]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setInputValue(newColor);
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      const colorFormat = getColorFormat(newColor);
      if (colorFormat) {
        const convertedColor = convertColor(newColor, colorFormat);
        const updatedColor = new Color(convertedColor);
        setCurrentColor(updatedColor);
        if (onColorChange) {
          onColorChange(updatedColor);
        }
      }
    }
  };

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const updatedColor = new Color(newColor);
    setCurrentColor(updatedColor);
    setInputValue(newColor);
    if (onColorChange) {
      onColorChange(updatedColor);
    }
  };

  const handleColorSquareClick = () => {
    document.getElementById('colorPicker')?.click();
  };

  return (
    <Container>
      <ColorSquare $backgroundColor={currentColor.hex()} onClick={handleColorSquareClick} />
      <ColorPicker
        id="colorPicker"
        type="color"
        value={currentColor.hex()}
        onChange={handleColorPickerChange}
      />
      {isInput && (
        <InputContainer>
          <ColorInput type="text" value={inputValue} onChange={handleInputChange} />
        </InputContainer>
      )}
      <Footer>
        {[
          { title: 'HEX', value: currentColor.hex() },
          { title: 'RGB', value: currentColor.rgb() },
          { title: 'HSL', value: currentColor.hsl() },
        ].map(({ title, value }) => (
          <ColorTitle key={title}>
            <b>{title}: </b>
            {value}
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
  display: flex;
  align-items: center;
  height: 2rem;
  font-size: 0.875rem;
  color: var(--text-color);

  b {
    color: var(--text-color);
    font-weight: 500;
    margin-right: 0.25rem;
  }

  &:hover {
    ${CopyButtonStyled} {
      opacity: 1;
    }
  }
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
