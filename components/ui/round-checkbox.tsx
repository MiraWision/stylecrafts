import React from 'react';
import styled from 'styled-components';

interface RoundCheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  accentColor?: string;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({
  id,
  label,
  checked = false,
  disabled = false,
  accentColor = '#6a4df6',
}) => {
  return (
    <RoundCheckContainer accentColor={accentColor}>
      <input type="checkbox" id={id} checked={checked} disabled={disabled} />
      <label htmlFor={id}></label>
      <span>{label}</span>
    </RoundCheckContainer>
  );
};

const RoundCheckContainer = styled.div<{ accentColor: string }>`
  display: flex;
  align-items: center;
  gap: 5px;

  input {
    display: none;
  }

  label {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid ${({ accentColor }) => accentColor};
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: ${({ accentColor }) => accentColor};
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

  input:checked + label {
    border-color: ${({ accentColor }) => accentColor};
  }

  input:checked + label:after {
    opacity: 1;
  }

  input:disabled + label {
    border-color: #ccc;
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  input:disabled:checked + label:after {
    background-color: #ccc;
  }

  span {
    font-size: 14px;
    color: #333;
  }
`;

export { RoundCheckbox };
