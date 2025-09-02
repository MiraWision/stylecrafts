import React from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

interface TemplateCardProps {
  textColor: string;
  backgroundColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ textColor, backgroundColor }) => {
  return (
    <Card $backgroundColor={backgroundColor} $color={textColor}>
      <SimpleHeader $color={textColor}>
        <HeaderTitle>Contact Form Preview</HeaderTitle>
      </SimpleHeader>
      <Paragraph $color={textColor}>
        This is a sample contact form template to demonstrate how your color combination looks in a real interface.
      </Paragraph>
      <Form>
        <InputWrapper>
          <Label $color={textColor}>Name</Label>
          <StyledInput 
            type="text" 
            value="John Doe" 
            readOnly 
            $backgroundColor={backgroundColor} 
            $color={textColor} 
          />
        </InputWrapper>
        <InputWrapper>
          <Label $color={textColor}>Email</Label>
          <StyledInput 
            type="email" 
            value="john.doe@example.com" 
            readOnly 
            $backgroundColor={backgroundColor} 
            $color={textColor} 
          />
        </InputWrapper>
        <InputWrapper>
          <Label $color={textColor}>Message</Label>
          <StyledTextarea 
            value="This is a sample message to show how your text color looks against the background." 
            readOnly 
            $backgroundColor={backgroundColor} 
            $color={textColor}
          />
        </InputWrapper>
        <ButtonRow>
          <StyledButtonFill 
            label="Submit" 
            $color={backgroundColor} 
            $backgroundColor={textColor} 
          />
          <StyledButtonOutline 
            label="Cancel" 
            $color={textColor} 
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
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Abel, sans-serif;
  gap: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 1rem;
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    margin: 0 0.5rem;
  }
`;

const SimpleHeader = styled.div.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  width: 100%;
  transition: color 0.3s ease;
`;

const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Paragraph = styled.p.attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  margin: 0;
  text-align: left;
  font-family: inherit;
  line-height: 1.5;
  font-size: 0.875rem;
  transition: color 0.3s ease;
`;

const Form = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 0.875rem;
  font-weight: 600;
  font-family: Abel, sans-serif;
  transition: color 0.3s ease;
`;

const StyledInput = styled.input.attrs<{ $backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-family: Abel, sans-serif;
  width: 100%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
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
  border-radius: 0.375rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-family: Abel, sans-serif;
  width: 100%;
  height: 80px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  resize: none;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.3);
  }
  
  &::placeholder {
    opacity: 0.7;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  width: 100%;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StyledButtonFill = styled(Button).attrs<{ $color: string, $backgroundColor: string }>(({ $color, $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  border: none !important;
  border-radius: 0.375rem !important;
  height: 2rem !important;
  padding: 0 1rem !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  @media (max-width: 600px) {
    width: 100% !important;
  }
`;

const StyledButtonOutline = styled(Button).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
    borderColor: $color,
  },
}))`
  background: none !important;
  border: 1px solid !important;
  border-radius: 0.375rem !important;
  height: 2rem !important;
  padding: 0 1rem !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: ${({ $color }) => $color} !important;
    color: ${({ $color }) => {
      // Invert colors for better contrast
      return $color === '#000000' ? '#ffffff' : 
             $color === '#ffffff' ? '#000000' : 
             $color;
    }} !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  @media (max-width: 600px) {
    width: 100% !important;
  }
`;

export { TemplateCard };
