import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<Props> = ({ onClick, className }) => {
  return (
    <Container onClick={onClick} className={className}>
      <Text>StyleCrafts</Text>

      <StarIcon
        icon={faStar}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
`;

const Text = styled.span`
  font-family: 'Delius Swash Caps', cursive;
  font-size: 2rem;
  user-select: none;
  background: linear-gradient(70deg, var(--primary-color), #ff4e50);
  -webkit-background-clip: text;
  color: transparent;
`;

const StarIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 2.125rem;
  left: 2.9625rem;
  font-size: 0.375rem;
  transform: rotate(180deg);
  color: var(--primary-color);
`;

export { Logo };
