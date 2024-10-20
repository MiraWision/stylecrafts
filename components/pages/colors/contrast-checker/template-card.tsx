import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
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
        title="Contact Us"
        contrastRatio={contrastRatio}
        onReverseColors={handleReverseColors}
      />
      <Paragraph $color={currentTextColor}>
        We would love to hear from you! Please fill out the form below and we will get in touch with you shortly.
      </Paragraph>
      <Form>
        <InputWrapper>
          <Label $color={currentTextColor}>Name</Label>
          <StyledInput type="text" placeholder="Your name" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
        </InputWrapper>
        <InputWrapper>
          <Label $color={currentTextColor}>Email</Label>
          <StyledInput type="email" placeholder="Your email" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
        </InputWrapper>
        <InputWrapper>
          <Label $color={currentTextColor}>Recipient</Label>
          <StyledInput type="text" placeholder="Recipient" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
        </InputWrapper>
        <InputWrapper>
          <Label $color={currentTextColor}>Subject</Label>
          <StyledInput type="text" placeholder="Subject" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
        </InputWrapper>
        <InputWrapper>
          <Label $color={currentTextColor}>Message</Label>
          <StyledTextarea placeholder="Your message" $backgroundColor={currentBackgroundColor} $color={currentTextColor}></StyledTextarea>
        </InputWrapper>
        <ButtonRow>
          <StyledButtonFill label="Send" $color={currentBackgroundColor} $backgroundColor={currentTextColor} />
          <StyledButtonOutline label="Cancel" $color={currentTextColor} />
        </ButtonRow>
      </Form>
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
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  margin: 1rem 0;
  text-align: center;
`;

const Form = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input.attrs<{ $backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTextarea = styled.textarea.attrs<{ $backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  height: 150px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
`;

const StyledButtonFill = styled(Button).attrs<{ $color: string, $backgroundColor: string }>(({ $color, $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: none !important;
  width: 48%;
`;

const StyledButtonOutline = styled(Button).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
    borderColor: $color,
  },
}))`
  background: none !important;
  width: 48%;
`;

export { TemplateCard };
