import React from 'react';
import styled from 'styled-components';
import { InputTextarea } from 'primereact/inputtextarea';
import { CopyTextButton } from '../text-buttons/copy-text-button';

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
  width?: string;
  height?: string;
}

const TextareaWithCopy: React.FC<Props> = ({ value, placeholder, onChange, copyOptions, width = '100%', height = '10rem' }) => {
  return (
    <Container width={width} height={height}>
      <InputTextareaStyled
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />

      {copyOptions && (
        <ActionsContainer>
          {copyOptions.map((option, index) => (
            <CopyTextButton
              key={index}
              text={option.name}
              copyText={option.getValue(value)}
              onCopyCallback={option.onSuccess}
            />
          ))}
        </ActionsContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputTextareaStyled = styled(InputTextarea)`
  width: 100%;
  height: 100%;
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