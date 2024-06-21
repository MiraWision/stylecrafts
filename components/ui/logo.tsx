import React from 'react';
import styled, { keyframes } from 'styled-components';
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

const scaleUpDown = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
`;

const Text = styled.span`
  font-family: 'Delius Swash Caps', cursive;
  font-size: 2rem;
  user-select: none;
  background: linear-gradient(90deg, #ff1493, #ff69b4, #87cefa, #4682b4);
  -webkit-background-clip: text;
  color: transparent;
`;

const StarIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 2.125rem;
  left: 2.9625rem;
  font-size: 0.375rem;
  transform: rotate(180deg);
  color: #FF69B4;
  animation: ${scaleUpDown} 2s ease-out;
`;

export { Logo };
