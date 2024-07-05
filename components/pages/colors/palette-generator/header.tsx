import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { ReverseButton } from '@/components/ui/buttons/reverse-color';

interface HeaderProps {
  textColor: string;
  bgColor: string;
  contrastRatios: {
    textBg: string;
    accentBg: string;
    additionalBg: string;
    accentText: string;
  };
  onReverseColors: () => void;
}

const Header: React.FC<HeaderProps> = ({
  textColor,
  bgColor,
  contrastRatios,
  onReverseColors,
}) => {
  return (
    <Container $backgroundColor={bgColor}>
      <Content>
        <Title $color={textColor}>This is a preview</Title>
        <Subtitle $color={textColor}>
          Here is a preview of a color combination applied to a real-life example.
        </Subtitle>

        <ContrastContainer>
          {Object.entries(contrastRatios).map(([key, value]) => (
            <ContrastItem key={key} $color={textColor}>
              {formatContrastKey(key)} <Icon icon={faAdjust} /> {value}
            </ContrastItem>
          ))}
        </ContrastContainer>
      </Content>
      <LargeTextContainer>
        <LargeText $color={textColor}>Az</LargeText>
        <ReverseButton onReverseColors={onReverseColors} />
      </LargeTextContainer>
    </Container>
  );
};

const formatContrastKey = (key: string) => {
  switch (key) {
    case 'textBg':
      return 'Text : Background';
    case 'accentBg':
      return 'Accent : Background';
    case 'additionalBg':
      return 'Additional : Background';
    case 'accentText':
      return 'Accent : Text';
    default:
      return key;
  }
};

const Container = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
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

const ContrastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ContrastItem = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  display: flex;
  align-items: center;
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

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  margin: 0 0.3rem;
`;

export { Header };