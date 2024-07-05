import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ColorFormat, convertColor, getColorFormat } from '@mirawision/colorize';

import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ColorInputPreview: React.FC<Props> = ({ value, onChange }) => {
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
    <Container>
      <InputTextStyled type='text' value={value} onChange={handleInputTextChange} />

      <ColorPickerStyled value={hexValue} onChange={handleColorPickerChange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14rem;
`;

const ColorPickerStyled = styled(ColorPicker)`
  input {
    width: 14rem;
    height: 7rem;
    border-right: 0;
    border-radius: 0 0 0.5rem 0.5rem;

    &:hover, &:focus {
      border: 0.0625rem solid var(--primary-color);
      border-top: 0;
    }
  }
`;

const InputTextStyled = styled(InputText)`
  border-bottom: 0;
  border-radius: 0.5rem 0.5rem 0 0;
  width: 14rem;
  height: 2rem;
`;

export { ColorInputPreview };
