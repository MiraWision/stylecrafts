import React from 'react';
import styled from 'styled-components';

import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Container>
      <ColorPickerStyled value={value} onChange={(e) => onChange(`#${e.value}`)} />
      <InputTextStyled type='text' value={value} onChange={(e) => onChange(e.target.value)} />
    </Container>
  );
}

const Container = styled.div`
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