import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface Props {
  href: string;
  fontSize?: string;
  iconSize?: string;
}

const GoToAppButton: React.FC<Props> = ({ href, fontSize = '1.5rem', iconSize = '1.5rem' }) => (
  <Link href={href} fontSize={fontSize}>
    GO TO APP <Icon src="./landing/go-to.svg" alt="Arrow Icon" iconSize={iconSize} />
  </Link>
);

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInAnimation = css`
  animation: ${fadeInSlideUp} 1s ease-out;
`;

const Link = styled.a<{ fontSize: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 700;
  color: #ff4500;
  text-decoration: none;
  ${fadeInAnimation}
  animation-delay: 0.8s;
  animation-fill-mode: both;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    font-size: calc(${({ fontSize }) => fontSize} - 0.3rem);
  }

  @media (max-width: 480px) {
    font-size: calc(${({ fontSize }) => fontSize} - 0.5rem);
  }
`;

const Icon = styled.img<{ iconSize: string }>`
  width: ${({ iconSize }) => iconSize};
  height: ${({ iconSize }) => iconSize};
`;

export { GoToAppButton };
