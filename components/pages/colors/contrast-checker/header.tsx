import React from 'react';
import styled from 'styled-components';

import { ShuffleIconButton } from '@/components/ui/icon-buttons/shuffle-icon-button';

interface HeaderProps {
  textColor: string;
  backgroundColor: string;
  contrastRatio: string;
  onReverseColors: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  textColor,
  backgroundColor,
  contrastRatio,
  onReverseColors,
  title,
}) => {
  return (
    <Container>
      <Content>
        <Title $color={textColor}>Preview Example</Title>
        <Subtitle $color={textColor}>
          Here is a preview of your color combination applied to a real-life form example.
        </Subtitle>
        <FontWeights>
          <Weight $color={textColor} $weight={300}>Light</Weight>
          <Weight $color={textColor} $weight={400}>Regular</Weight>
          <Weight $color={textColor} $weight={500}>Medium</Weight>
          <Weight $color={textColor} $weight={700}>Bold</Weight>
        </FontWeights>
      </Content>
      <ReverseButtonContainer>
        <ReverseButton onClick={onReverseColors}>
          <StyledShuffleIconButton onClick={onReverseColors} />
          <ReverseLabel $color={textColor}>Reverse Colors</ReverseLabel>
        </ReverseButton>
      </ReverseButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 0.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
  
  @media (max-width: 600px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
`;

const Title = styled.h1.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const FontWeights = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 600px) {
    gap: 0.75rem;
    flex-wrap: wrap;
  }
`;

const Weight = styled.span.attrs<{ $color: string; $weight: number }>(({ $color, $weight }) => ({
  style: {
    color: $color,
    fontWeight: $weight,
  },
}))`
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
`;

const ReverseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    margin-top: 0;
  }
`;

const ReverseButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

const StyledShuffleIconButton = styled(ShuffleIconButton)`
  & > .icon {
    width: 32px !important;
    height: 32px !important;
  }
  
  @media (max-width: 600px) {
    & > .icon {
      width: 28px !important;
      height: 28px !important;
    }
  }
`;

const ReverseLabel = styled.div<{ $color: string }>`
  font-size: 0.9rem;
  color: ${({ $color }) => $color};
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
  }
  
  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

export { Header };
