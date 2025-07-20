import React from 'react';
import styled from 'styled-components';

interface ReviewCardProps {
  textColor: string;
  backgroundColor: string;
  title: string;
  date: string;
  content: string;
}

const TemplateReview: React.FC<ReviewCardProps> = ({ textColor, backgroundColor, title, date, content }) => {
  return (
    <CardContainer $backgroundColor={backgroundColor}>
      <Header>
        <IconWrapper $backgroundColor={textColor}>
          <Icon $backgroundColor={backgroundColor}>G</Icon>
        </IconWrapper>
        <TitleDateWrapper>
          <Title $color={textColor}>{title}</Title>
          <Date $color={textColor}>{date}</Date>
        </TitleDateWrapper>
      </Header>
      <Content $color={textColor}>{content}</Content>
    </CardContainer>
  );
};

const CardContainer = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const Icon = styled.span.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    color: $backgroundColor,
  },
}))`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TitleDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1rem;
  font-weight: bold;
`;

const Date = styled.span.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 0.875rem;
`;

const Content = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 0.875rem;
  margin: 0;
`;


export { TemplateReview };