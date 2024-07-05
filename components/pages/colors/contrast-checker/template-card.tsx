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
  backgroundColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ textColor, backgroundColor }) => {
  const [currentBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [currentTextColor, setTextColor] = useState(textColor);

  const handleReverseColors = () => {
    setBackgroundColor(currentTextColor);
    setTextColor(currentBackgroundColor);
  };

  useEffect(() => {
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
  }, [backgroundColor, textColor]);

  const contrastRatio = checkContrast(currentTextColor, currentBackgroundColor).contrast.toFixed(2);

  return (
    <Card $backgroundColor={currentBackgroundColor} $color={currentTextColor}>
      <Header
        textColor={currentTextColor}
        backgroundColor={currentBackgroundColor}
        contrastRatio={contrastRatio}
        onReverseColors={handleReverseColors}
      />
      <Divider $color={currentTextColor} />
      <Paragraph $color={currentTextColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Row>
        <StyledButtonFill label='Button' $color={currentBackgroundColor} $backgroundColor={currentTextColor} />
        <StyledButtonOutline label='Button' $color={currentTextColor} />
      </Row>
      <Quote $color={currentTextColor}>
        The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element.
        <cite>
          Someone famous in <a href='#' style={{ color: currentTextColor }}>Source Title</a>
        </cite>
      </Quote>
      <ProgressBarContainer>
        <p style={{ color: currentTextColor }}>Progress</p>
        {/* <StyledProgressBar value={50} textColor={currentTextColor} backgroundColor={currentBackgroundColor} /> */}
      </ProgressBarContainer>
      <TemplateReview
        textColor={currentTextColor}
        backgroundColor={currentBackgroundColor}
        title='Gradients.app'
        date='23.06.2024'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
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

const Card = styled.div.attrs<{ $backgroundColor: string, $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.hr.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    borderTopColor: $color,
  },
}))`
  border: none;
  border-top: 1px solid;
  margin: 1rem 0;
  width: 100%;
`;

const Paragraph = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  margin: 1rem 0;
  position: relative;

  &::first-letter {
    font-size: 4rem;
    font-weight: bold;
    float: left;
    margin-right: 0.5rem;
    line-height: 1;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

const StyledButtonFill = styled(Button).attrs<{ $color: string, $backgroundColor: string }>(({ $color, $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: none !important;
`;

const StyledButtonOutline = styled(Button).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
    borderColor: $color,
  },
}))`
  background: none !important;
`;

const Quote = styled.blockquote.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    borderLeftColor: $color,
    color: $color,
  },
}))`
  border-left: 4px solid;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  width: 100%;

  cite {
    display: block;
    margin-top: 0.5rem;
    font-style: normal;
  }

  a {
    text-decoration: underline;
  }
`;

const ProgressBarContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
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