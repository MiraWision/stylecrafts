import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';

interface Props {
  value: string;
  onChange: (value: string) => void;
  margin?: string;
}

const ColorInput: React.FC<Props> = ({ value, onChange, margin }) => {
  const handleColorPickerChange = (e: any) => {
    let newColor = e.value;
    if (!newColor.startsWith('#')) {
      newColor = `#${newColor}`;
    }
    onChange(newColor);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onChange(newColor);
  };

  return (
    <Container margin={margin}>
      <ColorPickerStyled value={value} onChange={handleColorPickerChange} />
      <InputTextStyled type='text' value={value} onChange={handleInputTextChange} />
    </Container>
  );
};

const Container = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin || '0'};
`;

const ColorPickerStyled = styled(ColorPicker)`
  input {
    width: 45.5px;
    height: 45.5px;
    margin-right: -2px;
    border-right: 0;
    border-radius: 4px 0 0 4px;
  }
`;

const InputTextStyled = styled(InputText)`
  border-left: 0;
  border-radius: 0 4px 4px 0;
`;

export { ColorInput };
