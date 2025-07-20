import React from 'react';
import styled from 'styled-components';

import { ColorPicker as ColorPickerDefault } from 'primereact/colorpicker';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorPicker: React.FC<Props> = ({ value, onChange, className }) => {
  return (
    <ColorPickerStyled
      inline={true}
      format='hex'
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      className={className}
    />
  );
}

const ColorPickerStyled = styled(ColorPickerDefault)`
  .p-colorpicker-panel {
    background-color: var(--surface-100);
    border: 0.0625rem solid var(--surface-border);
    border-radius: 0.25rem;
  }
`;

export { ColorPicker };