import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { ProgressBar as PrimeProgressBar } from 'primereact/progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { TemplateReview } from './template-review';
import { Header } from '@/components/pages/colors/palette-generator/header';
import { Footer } from '@/components/pages/colors/palette-generator/footer';
import { checkContrast } from '@/utils/check-contrast';

interface TemplateCardProps {
  textColor: string;
  bgColor: string;
  accentColor: string;
  additionalColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ textColor, bgColor, accentColor, additionalColor }) => {
  const initialColors = {
    bgColor,
    textColor,
    accentColor,
    additionalColor,
  };

  const [colors, setColors] = useState(initialColors);
  const [fontWeight, setFontWeight] = useState('400');

  const handleReverseColors = () => {
    setColors((prevColors) => ({
      bgColor: prevColors.textColor,
      textColor: prevColors.bgColor,
      accentColor: prevColors.additionalColor,
      additionalColor: prevColors.accentColor,
    }));
  };

  const handleFontWeightChange = (weight: string) => {
    setFontWeight(weight);
  };

  useEffect(() => {
    setColors(initialColors);
  }, [bgColor, textColor, accentColor, additionalColor]);

  const contrastRatios = {
    textBg: checkContrast(colors.textColor, colors.bgColor).contrast.toFixed(2),
    accentBg: checkContrast(colors.accentColor, colors.bgColor).contrast.toFixed(2),
    additionalBg: checkContrast(colors.additionalColor, colors.bgColor).contrast.toFixed(2),
    accentText: checkContrast(colors.accentColor, colors.textColor).contrast.toFixed(2),
  };

  return (
    <Card $backgroundColor={colors.bgColor} $color={colors.textColor} $fontWeight={fontWeight}>
      <Header
        textColor={colors.textColor}
        bgColor={colors.bgColor}
        contrastRatios={contrastRatios}
        onReverseColors={handleReverseColors}
      />
      <FontWeights>
        <Weight $color={colors.textColor} $fontWeight={300} onClick={() => handleFontWeightChange('300')}>Light</Weight>
        <Weight $color={colors.textColor} $fontWeight={400} onClick={() => handleFontWeightChange('400')}>Regular</Weight>
        <Weight $color={colors.textColor} $fontWeight={500} onClick={() => handleFontWeightChange('500')}>Medium</Weight>
        <Weight $color={colors.textColor} $fontWeight={700} onClick={() => handleFontWeightChange('700')}>Bold</Weight>
      </FontWeights>
      <Divider $color={colors.textColor} />
      <Paragraph $color={colors.textColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Row>
        <StyledButtonFill label='Button' $color={colors.bgColor} $backgroundColor={colors.accentColor} />
        <StyledButtonOutline label='Button' $color={colors.accentColor} />
      </Row>
      <Quote $color={colors.additionalColor}>
        The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element.
        <cite>
          Someone famous in <a href='#' style={{ color: colors.additionalColor }}>Source Title</a>
        </cite>
      </Quote>
      <CardContainer>
        <MiniCard $backgroundColor={colors.accentColor} $color={colors.bgColor}>
          <CardTitle>Card Title</CardTitle>
          <CardContent>Card content goes here.</CardContent>
        </MiniCard>
        <MiniCard $backgroundColor={colors.additionalColor} $color={colors.bgColor}>
          <CardTitle>Card Title</CardTitle>
          <CardContent>Card content goes here.</CardContent>
        </MiniCard>
      </CardContainer>
      <TemplateReview
        textColor={colors.textColor}
        bgColor={colors.bgColor}
        title='Gradients.app'
        date='23.06.2024'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      />
      <IconList>
        <IconItem $color={colors.accentColor}>
          <FontAwesomeIcon icon={faHeart} />
        </IconItem>
        <IconItem $color={colors.accentColor}>
          <FontAwesomeIcon icon={faShareAlt} />
        </IconItem>
        <IconItem $color={colors.accentColor}>
          <FontAwesomeIcon icon={faBookmark} />
        </IconItem>
      </IconList>
      <Footer bgColor={colors.additionalColor} textColor={colors.bgColor} />
    </Card>
  );
};

const Card = styled.div.attrs<{ $backgroundColor: string, $color: string, $fontWeight: string }>(({ $backgroundColor, $color, $fontWeight }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
    fontWeight: $fontWeight,
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
}))<{ $color: string }>`
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

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: 1rem 0;
`;

const MiniCard = styled.div.attrs<{ $backgroundColor: string, $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
`;

const CardContent = styled.p`
  margin: 0;
`;

const IconList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const IconItem = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const FontWeights = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const Weight = styled.span.attrs<{ $color: string, $fontWeight: number }>(({ $color, $fontWeight }) => ({
  style: {
    color: $color,
    fontWeight: $fontWeight,
  },
}))`
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export { TemplateCard };