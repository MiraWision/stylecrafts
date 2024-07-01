import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { ProgressBar as PrimeProgressBar } from 'primereact/progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { TemplateReview } from './template-review';
import { Header } from '@/components/pages/colors/contrast-checker/header';
import { checkContrast } from '@/utils/check-contrast';

interface TemplateCardProps {
  textColor: string;
  bgColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ textColor, bgColor }) => {
  const [currentBgColor, setBgColor] = useState(bgColor);
  const [currentTextColor, setTextColor] = useState(textColor);

  const handleReverseColors = () => {
    setBgColor(currentTextColor);
    setTextColor(currentBgColor);
  };

  useEffect(() => {
    setBgColor(bgColor);
    setTextColor(textColor);
  }, [bgColor, textColor]);

  const contrastRatio = checkContrast(currentTextColor, currentBgColor).contrast.toFixed(2);

  return (
    <Card bgColor={currentBgColor} color={currentTextColor}>
      <Header
        textColor={currentTextColor}
        bgColor={currentBgColor}
        contrastRatio={contrastRatio}
        onReverseColors={handleReverseColors}
      />
      <Divider color={currentTextColor} />
      <Paragraph color={currentTextColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Row>
        <StyledButtonFill label="Button" textColor={currentBgColor} bgColor={currentTextColor} />
        <StyledButtonOutline label="Button" textColor={currentTextColor} bgColor={currentBgColor} />
      </Row>
      <Quote color={currentTextColor}>
        The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element.
        <cite>
          Someone famous in <a href="#" style={{ color: currentTextColor }}>Source Title</a>
        </cite>
      </Quote>
      <ProgressBarContainer>
        <p style={{ color: currentTextColor }}>Progress</p>
        <StyledProgressBar value={50} textColor={currentTextColor} bgColor={currentBgColor} />
      </ProgressBarContainer>
      <TemplateReview
        textColor={currentTextColor}
        bgColor={currentBgColor}
        title="Gradients.app"
        date="23.06.2024"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      />
      <IconList>
        <IconItem>
          <FontAwesomeIcon icon={faHeart} />
        </IconItem>
        <IconItem>
          <FontAwesomeIcon icon={faShareAlt} />
        </IconItem>
        <IconItem>
          <FontAwesomeIcon icon={faBookmark} />
        </IconItem>
      </IconList>
    </Card>
  );
};

const Card = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  color: ${({ color }) => color};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.hr<{ color: string }>`
  border: none;
  border-top: 1px solid ${({ color }) => color};
  margin: 1rem 0;
  width: 100%;
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
  width: 100%;
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
  width: 100%;

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
  width: 100%;
`;

const StyledProgressBar = styled(PrimeProgressBar)<{ textColor: string, bgColor: string }>`
  .p-progressbar-value {
    background-color: ${({ textColor }) => textColor} !important;
  }
  .p-progressbar-label {
    color: ${({ bgColor }) => bgColor} !important;
  }
`;

const IconList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const IconItem = styled.div`
  font-size: 1.5rem;
  color: inherit;
`;

export { TemplateCard };