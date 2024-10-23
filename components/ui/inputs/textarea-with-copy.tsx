import React from 'react';
import styled from 'styled-components';
import { InputTextarea } from 'primereact/inputtextarea';
import { SplitButton } from 'primereact/splitbutton';

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
  const handleCopyBase64 = () => {
    const base64Option = copyOptions?.find(option => option.name === 'Copy Base64');
    if (base64Option) {
      navigator.clipboard.writeText(base64Option.getValue(value)).then(() => {
        base64Option.onSuccess?.();
      }).catch(() => {
        base64Option.onFail?.();
      });
    }
  };

  const otherCopyOptions = copyOptions?.filter(option => option.name !== 'Copy Base64').map(option => ({
    label: option.name,
    icon: 'pi pi-copy',
    command: () => {
      navigator.clipboard.writeText(option.getValue(value)).then(() => {
        option.onSuccess?.();
      }).catch(() => {
        option.onFail?.();
      });
    }
  }));

  return (
    <Container width={width} height={height}>
      <InputTextareaStyled
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />

      {copyOptions && (
        <ActionsContainer>
          <StyledSplitButton
            label="Copy Base64"
            icon="pi pi-copy"
            model={otherCopyOptions}
            onClick={handleCopyBase64}
            severity="secondary" raised
          />
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
  padding: 0.5rem;
`;

const StyledSplitButton = styled(SplitButton)`
  width: 100%; /* Makes the button take full width */
  
  .p-button {
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem 1rem;
    height: 2.5rem;
  }

  .p-menuitem-text {
    color: var(--text-color);
  }

  .p-button .pi {
    color: var(--text-color);
  }

  /* .p-button:hover, .p-button:active, .p-button:focus {
    background-color: var(--primary-color-hover);
  } */

  .p-button-menu {
    background-color: var(--primary-color);
  }

  .p-splitbutton-menu {
    background-color: var(--primary-color);
  }

  .p-menuitem-link:hover {
    background-color: var(--primary-color-hover);
  }

  .p-splitbutton-menubutton .pi {
    color: var(--text-color);
  }
`;

export { TextareaWithCopy };
