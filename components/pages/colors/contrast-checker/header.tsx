import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { ReverseButton } from '@/components/ui/buttons/reverse-color';

interface HeaderProps {
  textColor: string;
  backgroundColor: string;
  contrastRatio: string;
  onReverseColors: () => void;
}

const Header: React.FC<HeaderProps> = ({
  textColor,
  backgroundColor,
  contrastRatio,
  onReverseColors,
}) => {
  return (
    <Container>
      <Content>
        <Title $color={textColor}>This is a preview</Title>
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
      <LargeTextContainer>
        <LargeText $color={textColor}>Az</LargeText>
        <ContrastInfo $color={textColor}>
          <ContrastRatio>
            <Icon icon={faAdjust} /> {contrastRatio}
          </ContrastRatio>
        </ContrastInfo>
        <ReverseButton onReverseColors={onReverseColors} />
      </LargeTextContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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

const Weight = styled.span.attrs<{ $color: string, $weight: number }>(({ $color, $weight }) => ({
  style: {
    color: $color,
    fontWeight: $weight,
  },
}))`
  font-size: 0.8rem;
`;

const LargeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LargeText = styled.span.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 4rem;
  font-weight: bold;
`;

const ContrastInfo = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 0.4rem;
`;

const ContrastRatio = styled.span`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  margin-right: 0.3rem;
`;

export { Header };