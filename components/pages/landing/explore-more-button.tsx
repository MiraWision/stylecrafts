import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface Props {
  href?: string;
  text?: string;
  onClick?: () => void;
  absolutePosition?: boolean;
}

const ExploreMoreButton: React.FC<Props> = ({ href, text = 'EXPLORE MORE', onClick, absolutePosition = true }) => (
  <Container href={href} onClick={onClick} absolutePosition={absolutePosition}>
    <Link>{text}</Link>
    <Icon src="./landing/show-more.svg" alt="Arrow Icon" />
  </Container>
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

const Container = styled.a<{ absolutePosition: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;
  ${(props) =>
    props.absolutePosition &&
    css`
      position: absolute;
      bottom: 2rem;
      left: 2rem;
    `}
  ${fadeInAnimation}
  animation-delay: 1s;
  animation-fill-mode: both;
`;

const Link = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  color: #75468A;
  text-align: center;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export { ExploreMoreButton };
