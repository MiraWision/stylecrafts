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
    <Card bgColor={colors.bgColor} color={colors.textColor} fontWeight={fontWeight}>
      <Header
        textColor={colors.textColor}
        bgColor={colors.bgColor}
        contrastRatios={contrastRatios}
        onReverseColors={handleReverseColors}
      />
      <FontWeights>
        <Weight textColor={colors.textColor} weight={300} onClick={() => handleFontWeightChange('300')}>Light</Weight>
        <Weight textColor={colors.textColor} weight={400} onClick={() => handleFontWeightChange('400')}>Regular</Weight>
        <Weight textColor={colors.textColor} weight={500} onClick={() => handleFontWeightChange('500')}>Medium</Weight>
        <Weight textColor={colors.textColor} weight={700} onClick={() => handleFontWeightChange('700')}>Bold</Weight>
      </FontWeights>
      <Divider color={colors.textColor} />
      <Paragraph color={colors.textColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Row>
        <StyledButtonFill label="Button" textColor={colors.bgColor} bgColor={colors.accentColor} />
        <StyledButtonOutline label="Button" textColor={colors.accentColor} bgColor={colors.bgColor} />
        <StyledButtonDashed label="Dashed Button" textColor={colors.accentColor} bgColor={colors.bgColor} />
        <StyledButtonLink label="Link Button" textColor={colors.accentColor} bgColor={colors.textColor} />
      </Row>
      <Quote color={colors.additionalColor}>
        The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element.
        <cite>
          Someone famous in <a href="#" style={{ color: colors.additionalColor }}>Source Title</a>
        </cite>
      </Quote>
      <CardContainer>
        <MiniCard bgColor={colors.accentColor} textColor={colors.bgColor}>
          <CardTitle>Card Title</CardTitle>
          <CardContent>Card content goes here.</CardContent>
        </MiniCard>
        <MiniCard bgColor={colors.additionalColor} textColor={colors.bgColor}>
          <CardTitle>Card Title</CardTitle>
          <CardContent>Card content goes here.</CardContent>
        </MiniCard>
      </CardContainer>
      <ProgressBarContainer>
        <p style={{ color: colors.textColor }}>Progress</p>
        <StyledProgressBar value={50} textColor={colors.textColor} bgColor={colors.bgColor} />
      </ProgressBarContainer>
      <TemplateReview
        textColor={colors.textColor}
        bgColor={colors.bgColor}
        title="Gradients.app"
        date="23.06.2024"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      />
      <IconList>
        <IconItem color={colors.accentColor} hoverColor={colors.textColor}>
          <FontAwesomeIcon icon={faHeart} />
        </IconItem>
        <IconItem color={colors.accentColor} hoverColor={colors.textColor}>
          <FontAwesomeIcon icon={faShareAlt} />
        </IconItem>
        <IconItem color={colors.accentColor} hoverColor={colors.textColor}>
          <FontAwesomeIcon icon={faBookmark} />
        </IconItem>
      </IconList>
      <Footer bgColor={colors.additionalColor} textColor={colors.bgColor} />
    </Card>
  );
};

const Card = styled.div<{ bgColor: string, color: string, fontWeight: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
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

  &:hover {
    background-color: ${({ textColor }) => textColor} !important;
    color: ${({ bgColor }) => bgColor} !important;
  }
`;

const StyledButtonOutline = styled(Button)<{ textColor: string, bgColor: string }>`
  color: ${({ textColor }) => textColor} !important;
  border: 1px solid ${({ textColor }) => textColor} !important;
  background: none !important;

  &:hover {
    background-color: ${({ textColor }) => textColor} !important;
    color: ${({ bgColor }) => bgColor} !important;
  }
`;

const StyledButtonDashed = styled(Button)<{ textColor: string, bgColor: string }>`
  color: ${({ textColor }) => textColor} !important;
  border: 1px dashed ${({ textColor }) => textColor} !important;
  background: none !important;

  &:hover {
    background-color: ${({ textColor }) => textColor} !important;
    color: ${({ bgColor }) => bgColor} !important;
  }
`;

const StyledButtonLink = styled(Button)<{ textColor: string, bgColor: string }>`
  color: ${({ textColor }) => textColor} !important;
  background: none !important;
  border: none !important;
  text-decoration: underline;

  &:hover {
    color: ${({ bgColor }) => bgColor} !important;
    background: none !important;
  }
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

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: 1rem 0;
`;

const MiniCard = styled.div<{ bgColor: string, textColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
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

const IconItem = styled.div<{ color: string, hoverColor: string }>`
  font-size: 1.5rem;
  color: ${({ color }) => color};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ hoverColor }) => hoverColor} !important;
    transform: scale(1.1);
  }
`;

const FontWeights = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const Weight = styled.span<{ textColor: string, weight: number }>`
  color: ${({ textColor }) => textColor};
  font-size: 0.8rem;
  font-weight: ${({ weight }) => weight};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export { TemplateCard };