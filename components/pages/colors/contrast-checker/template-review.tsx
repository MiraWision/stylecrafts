import React from 'react';
import styled from 'styled-components';

interface ReviewCardProps {
  textColor: string;
  bgColor: string;
  title: string;
  date: string;
  content: string;
}

const TemplateReview: React.FC<ReviewCardProps> = ({ textColor, bgColor, title, date, content }) => {
  return (
    <CardContainer bgColor={bgColor}>
      <Header>
        <IconWrapper bgColor={textColor}>
          <Icon bgColor={bgColor}>G</Icon>
        </IconWrapper>
        <TitleDateWrapper>
          <Title textColor={textColor}>{title}</Title>
          <Date textColor={textColor}>{date}</Date>
        </TitleDateWrapper>
      </Header>
      <Content textColor={textColor}>{content}</Content>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const Icon = styled.span<{ bgColor: string }>`
  color: ${({ bgColor }) => bgColor};
  font-size: 1.5rem;
  font-weight: bold;
`;

const TitleDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 1rem;
  font-weight: bold;
`;

const Date = styled.span<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 0.875rem;
`;

const Content = styled.p<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 0.875rem;
  margin: 0;
`;

export { TemplateReview };