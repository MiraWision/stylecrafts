import React from 'react';
import styled from 'styled-components';
import { AdjustIcon } from '@/components/icons/adjust';

interface ContrastButtonProps {
  onClick: () => void;
}

const ContrastButton: React.FC<ContrastButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <AdjustIcon width="16" height="16" fill="white"/>
    </Button>
  );
};

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

export { ContrastButton };
