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
        <Title $color={textColor}>{title}</Title>
        <Subtitle $color={textColor}>
          Here is a preview of a color combination applied to a real-life example.
        </Subtitle>
        <FontWeights>
          <Weight $color={textColor} $weight={300}>Light</Weight>
          <Weight $color={textColor} $weight={400}>Regular</Weight>
          <Weight $color={textColor} $weight={500}>Medium</Weight>
          <Weight $color={textColor} $weight={700}>Bold</Weight>
        </FontWeights>
      </Content>
      <ReverseButtonContainer>
        <StyledShuffleIconButton onClick={onReverseColors} />
        <ReverseLabel $color={textColor}>Reverse Colors</ReverseLabel>
      </ReverseButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Title = styled.h1.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1rem;
  margin: 0.4rem 0;
`;

const FontWeights = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const Weight = styled.span.attrs<{ $color: string; $weight: number }>(({ $color, $weight }) => ({
  style: {
    color: $color,
    fontWeight: $weight,
  },
}))`
  font-size: 0.8rem;
`;

const ReverseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.2rem;

  @media (max-width: 600px) {
    align-items: flex-start;
    margin-top: 1rem;
  }
`;

const StyledShuffleIconButton = styled(ShuffleIconButton)`
  & > .icon {
    width: 36px !important;
    height: 36px !important;
  }
  @media (max-width: 600px) {
    & > .icon {
      width: 28px !important;
      height: 28px !important;
    }
  }
`;

const ReverseLabel = styled.div<{ $color: string }>`
  margin-top: 0.3rem;
  font-size: 0.95rem;
  color: ${({ $color }) => $color};
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

export { Header };
