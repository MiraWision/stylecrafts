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
    setTextColor(currentTextColor);
  }, [backgroundColor, textColor]);

  const contrastRatio = checkContrast(currentTextColor, currentBackgroundColor).contrast.toFixed(2);

  return (
    <Card $backgroundColor={currentBackgroundColor} $color={currentTextColor}>
      <Header
        textColor={currentTextColor}
        backgroundColor={currentBackgroundColor}
        contrastRatio={contrastRatio}
        onReverseColors={handleReverseColors}
        title=""
      />
      <Paragraph $color={currentTextColor}>
        We would love to hear from you!<br />
        Please fill out the form below and we will get in touch with you shortly.
      </Paragraph>
      <Form>
        <FormRow>
          <InputWrapper>
            <Label $color={currentTextColor}>Name</Label>
            <StyledInput type="text" placeholder="Your name" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
          </InputWrapper>
          <InputWrapper>
            <Label $color={currentTextColor}>Email</Label>
            <StyledInput type="email" placeholder="Your email" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
          </InputWrapper>
        </FormRow>
        <FormRow>
          <InputWrapper>
            <Label $color={currentTextColor}>Recipient</Label>
            <StyledInput type="text" placeholder="Recipient" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
          </InputWrapper>
          <InputWrapper>
            <Label $color={currentTextColor}>Subject</Label>
            <StyledInput type="text" placeholder="Subject" $backgroundColor={currentBackgroundColor} $color={currentTextColor} />
          </InputWrapper>
        </FormRow>
        <InputWrapper>
          <Label $color={currentTextColor}>Message</Label>
          <StyledTextarea placeholder="Your message" $backgroundColor={currentBackgroundColor} $color={currentTextColor}></StyledTextarea>
        </InputWrapper>
        <ButtonRow>
          <StyledButtonFill 
            label="Send Message" 
            $color={currentBackgroundColor} 
            $backgroundColor={currentTextColor} 
          />
          <StyledButtonOutline 
            label="Cancel" 
            $color={currentTextColor} 
          />
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
  border-radius: 0.75rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    margin: 0 0.5rem;
  }
`;

const Paragraph = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  margin: 1rem 0;
  text-align: left;
  font-family: inherit;
  line-height: 1.6;
`;

const Form = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
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
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.3);
  }
  
  &::placeholder {
    opacity: 0.7;
  }
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
  height: 120px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.3);
  }
  
  &::placeholder {
    opacity: 0.7;
  }
  
  @media (max-width: 600px) {
    height: 100px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const StyledButtonFill = styled(Button).attrs<{ $color: string, $backgroundColor: string }>(({ $color, $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: none !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem 1.5rem !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  
  &:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  @media (max-width: 600px) {
    width: 100% !important;
    padding: 0.875rem 1.5rem !important;
  }
`;

const StyledButtonOutline = styled(Button).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
    borderColor: $color,
  },
}))`
  background: none !important;
  border: 2px solid !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem 1.5rem !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  transition: all 0.2s ease !important;
  
  &:hover {
    background: ${({ $color }) => $color} !important;
    color: ${({ $color }) => {
      // Invert colors for better contrast
      return $color === '#000000' ? '#ffffff' : 
             $color === '#ffffff' ? '#000000' : 
             $color;
    }} !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  @media (max-width: 600px) {
    width: 100% !important;
    padding: 0.875rem 1.5rem !important;
  }
`;

export { TemplateCard };
