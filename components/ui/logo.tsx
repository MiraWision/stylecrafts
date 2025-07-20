import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<Props> = ({ onClick, className }) => {
  return (
    <Container onClick={onClick} className={className}>
      <Icon src='/logo/logo.svg' alt="Logo" />
      <Text><b>Style</b>Crafts</Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 1.5rem;
  user-select: none;
  color: var(--text-color);
  font-weight: 300;

  b {
    font-weight: 600;
  }
`;

const Icon = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
`;

export { Logo };
