import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { ProgressBar as PrimeProgressBar } from 'primereact/progressbar';
import { TemplateReview } from './template-review';

interface TemplateCardProps {
  textColor: string;
  bgColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ textColor, bgColor }) => {
  return (
    <Card bgColor={bgColor} color={textColor}>
      <h2 style={{ color: textColor }}>{bgColor}</h2>
      <Divider color={textColor} />
      <Paragraph color={textColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Row>
        <StyledButtonFill label="Button" textColor={bgColor} bgColor={textColor} />
        <StyledButtonOutline label="Button" textColor={textColor} bgColor={bgColor} />
      </Row>
      <Quote color={textColor}>
        The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element.
        <cite>
          Someone famous in <a href="#" style={{ color: textColor }}>Source Title</a>
        </cite>
      </Quote>
      <ProgressBarContainer>
        <p style={{ color: textColor }}>Progress</p>
        <StyledProgressBar value={50} textColor={textColor} bgColor={bgColor} />
      </ProgressBarContainer>
      <TemplateReview
        textColor={textColor}
        bgColor={bgColor}
        title="Gradients.app"
        date="23.06.2024"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      />
    </Card>
  );
};

const Card = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 400px;
  color: ${({ color }) => color};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const Divider = styled.hr<{ color: string }>`
  border: none;
  border-top: 1px solid ${({ color }) => color};
  margin: 1rem 0;
`;

const Paragraph = styled.p<{ color: string }>`
  margin: 1rem 0;
  color: ${({ color }) => color};
  position: relative;

  &::first-letter {
    font-size: 4rem;
    font-weight: bold;
    float: left;
    margin-right: 0.5rem;
    line-height: 1;
    color: ${({ color }) => color};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin: 1rem 0;
`;

const StyledButtonFill = styled(Button)<{ textColor: string, bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor} !important;
  color: ${({ textColor }) => textColor} !important;
  border: none !important;
`;

const StyledButtonOutline = styled(Button)<{ textColor: string, bgColor: string }>`
  color: ${({ textColor }) => textColor} !important;
  border: 1px solid ${({ textColor }) => textColor} !important;
  background: none !important;
`;

const Quote = styled.blockquote<{ color: string }>`
  border-left: 4px solid ${({ color }) => color};
  padding-left: 1rem;
  margin: 1rem 0;
  color: ${({ color }) => color};
  font-style: italic;

  cite {
    display: block;
    margin-top: 0.5rem;
    font-style: normal;
  }

  a {
    color: ${({ color }) => color};
    text-decoration: underline;
  }
`;

const ProgressBarContainer = styled.div`
  margin: 1rem 0;
`;

const StyledProgressBar = styled(PrimeProgressBar)<{ textColor: string, bgColor: string }>`
  .p-progressbar-value {
    background-color: ${({ textColor }) => textColor} !important;
  }
  .p-progressbar-label {
    color: ${({ bgColor }) => bgColor} !important;
  }
`;

export { TemplateCard };