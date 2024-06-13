import React from 'react';
import styled from 'styled-components';

import { copyToClipboard } from '@/utils/copy';
0
import { InputTextarea } from 'primereact/inputtextarea';
import { PrimaryButton } from './buttons/primary-button';

interface CopyOption {
  name: string;
  getValue: (text: string) => string;
  onSuccess?: () => void;
  onFail?: () => void;
}

interface Props {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  copyOptions?: CopyOption[];
}

const TextareaWithCopy: React.FC<Props> = ({ value, placeholder, onChange, copyOptions}) => {
  const copyValue = (option: CopyOption) => () => {
    const copiedValue = option.getValue(value);
   
    copyToClipboard(copiedValue, { onSuccess: option.onSuccess, onFail: option.onFail });
  }

  return (
    <Container>
      <InputTextareaStyled 
        value={value}
        placeholder={placeholder}
        // disabled={!!onChange}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />

      {copyOptions && (
        <ActionsContainer>
          {copyOptions.map((option, index) => (
            <PrimaryButton
              key={index} 
              icon='pi pi-copy'
              onClick={copyValue(option)}
            >
              {option.name}
            </PrimaryButton>
          ))}
        </ActionsContainer>
      )}
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.5rem;
`;

const InputTextareaStyled = styled(InputTextarea)`
  width: 100%;
  height: 10rem;
  border: none;
  resize: none;
`;

const ActionsContainer = styled.div`
  border-top: 0.0625rem solid var(--surface-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem;
`;

export { TextareaWithCopy };