import React from 'react';
import styled from 'styled-components';

import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<Props> = ({ value, onChange }) => {
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
    <Container>
      <ColorPickerStyled value={value} onChange={handleColorPickerChange} />

      <InputTextStyled type='text' value={value} onChange={handleInputTextChange} />
    </Container>
  );
};

const Container = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
`;

const ColorPickerStyled = styled(ColorPicker)`
  input {
    width: 2.75rem;
    height: 2.75rem;
    margin-right: -0.125rem;
    border-right: 0;
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

const InputTextStyled = styled(InputText)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
`;

export { ColorInput };
