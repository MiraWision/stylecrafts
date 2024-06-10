import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  largeText: string;
  smallText: string;
  index: number;
}

const GlassCard: React.FC<Props> = ({ largeText, smallText, index }) => {
  return (
    <CardContainer index={index}>
      <TextContainer>
        <LargeText>{largeText}</LargeText>
        <SmallText>{smallText}</SmallText>
      </TextContainer>
    </CardContainer>
  );
};

export default GlassCard;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardContainer = styled.div<{ index: number }>`
  width: 15rem;
  height: 7rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--surface-400);
  box-shadow: 0 4px 15px var(--surface-400);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: var(--surface-color);
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 1s ease-out;
  animation-delay: ${props => props.index * 0.3}s;
  animation-fill-mode: both;
`;

const TextContainer = styled.div`
  text-align: center;
`;

const LargeText = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const SmallText = styled.div`
  font-size: 1rem;
  font-weight: normal;
  margin-top: 0.5rem;
`;

