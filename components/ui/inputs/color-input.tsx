import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ColorFormat, convertColor, getColorFormat } from '@mirawision/colorize';

import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorInput: React.FC<Props> = ({ value, onChange, className }) => {
  const hexValue = useMemo(() => {
    if (!value.length) {
      return '';
    }

    if (value.startsWith('#')) {
      return value;
    }

    try {
      return convertColor(value, ColorFormat.HEX);
    } catch (error) {
      console.error('Error converting color:', error);
      return '';
    }
  }, [value]);
  
  const handleColorPickerChange = (e: any) => {
    let newColor = e.value;

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
      <ColorPickerStyled value={hexValue} onChange={handleColorPickerChange} />

      <InputTextStyled type='text' value={value} onChange={handleInputTextChange} />
    </Container>
  );
};

const Container = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  width: 14rem;
`;

const ColorPickerStyled = styled(ColorPicker)`
  input {
    width: 2rem;
    height: 2rem;
    border-right: 0;
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

const InputTextStyled = styled(InputText)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  width: 12rem;
  height: 2rem;
`;

export { ColorInput };
