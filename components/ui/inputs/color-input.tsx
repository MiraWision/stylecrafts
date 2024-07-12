import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorFormat, convertColor, getColorFormat } from '@mirawision/colorize';

import { InputText } from 'primereact/inputtext';
import { ColorPicker } from './color-picker';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorInput: React.FC<Props> = ({ value, onChange, className }) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  
  const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);

  const hexValue = useMemo(() => {
    if (!value.length) {
      return '';
    }

    if (value?.startsWith('#')) {
      return value;
    }

    try {
      return convertColor(value, ColorFormat.HEX);
    } catch (error) {
      console.error('Error converting color:', error);
      return '';
    }
  }, [value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
      setIsColorPickerVisible(false);
    }
  };

  useEffect(() => {
    if (isColorPickerVisible) {
      document.addEventListener('mousedown', handleClickOutside);

      if (colorInputRef.current) {
        colorInputRef.current.focus();
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);

      if (colorInputRef.current) {
        colorInputRef.current.blur();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isColorPickerVisible]);
  
  const handleColorPickerChange = (newColor: string) => {
    if (!newColor.startsWith('#')) {
      newColor = `#${newColor}`;
    }

    const colorFormat = getColorFormat(value);

    if (!colorFormat) {
      return;
    }

    if (colorFormat !== ColorFormat.HEX) {
      try {
        newColor = convertColor(newColor, colorFormat);
      } catch (error) {
        console.error('Error converting color:', error);
        return;
      }
    }

    onChange(newColor);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;

    onChange(newColor);
  };

  return (
    <Container className={className}>
      <ColorBox 
        $color={hexValue}
        onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
      />

      <InputTextStyled 
        ref={colorInputRef}
        type='text' 
        value={value} 
        onChange={handleInputTextChange}
      />

      {isColorPickerVisible && (
        <ColorPickerContainer ref={colorPickerRef}>
          <ColorPicker
            value={hexValue}
            onChange={handleColorPickerChange}
          />  
        </ColorPickerContainer>          
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const ColorBox = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    backgroundColor: $color,
  },
}))`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 0.0625rem solid var(--surface-border);
`;

const InputTextStyled = styled(InputText)`
  border-radius: 0.5rem;
  width: 10rem;
  height: 2rem;
  padding-left: 2rem;
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 2.5rem;
  left: 0;
`;

export { ColorInput };
