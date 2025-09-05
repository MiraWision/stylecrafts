import React from 'react';
import styled from 'styled-components';
import { adjustBrightness } from '@mirawision/colorize';

import { PaletteColor } from '../types';

interface FormPreviewProps {
  palette: PaletteColor[];
}

const FormPreview: React.FC<FormPreviewProps> = ({ palette }) => {
  const primary = palette.find(c => c.title === 'Primary')?.baseColor ?? '#3468db';
  const accent = palette.find(c => c.title === 'Accent')?.baseColor  ?? '#e74c3c';
  const text = palette.find(c => c.title === 'Text')?.baseColor    ?? '#333333';
  const background = palette.find(c => c.title === 'Background')?.baseColor ?? '#f5f5f5';
  
  const primaryLight = adjustBrightness(primary, 10);
  const backgroundDark = adjustBrightness(background, -5);

  return (
    <Container $backgroundColor={background}>
      <FormSection $backgroundColor={backgroundDark}>
        <FormTitle $color={text}>Contact Us</FormTitle>
        <Form>
          <InputGroup>
            <Label $color={text} htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="your@email.com"
              value="example@example.com"
              $borderColor={primary}
              $focusColor={primary}
              $textColor={text}
            />
          </InputGroup>
          
          <InputGroup>
            <Label $color={text} htmlFor="feedback">Feedback</Label>
            <Textarea 
              id="feedback" 
              placeholder="Tell us what you think..."
              value="This is a sample message to show how your text color looks against the background."
              $borderColor={primary}
              $focusColor={primary}
              $textColor={text}
            />
          </InputGroup>
          
          <CheckboxGroup>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox" 
                id="newsletter"
                checked
                $accentColor={primary}
              />
              <CheckboxLabel $color={text} htmlFor="newsletter">
                Subscribe to our newsletter
              </CheckboxLabel>
            </CheckboxWrapper>
          </CheckboxGroup>
          
          <SubmitButton 
            type="submit" 
            $backgroundColor={primary} 
            $hoverBackgroundColor={primaryLight}
          >
            Send Message
          </SubmitButton>
        </Form>
      </FormSection>
    </Container>
  );
};

const Container = styled.div<{ $backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
  border-radius: 0.5rem;
  min-height: 100%;
`;

const FormSection = styled.div<{ $backgroundColor?: string }>`
  background: ${({ $backgroundColor }) => $backgroundColor};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2<{ $color: string }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: center;
  color: ${({ $color }) => $color};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label<{ $color: string }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

const Input = styled.input<{ $borderColor: string; $focusColor: string; $textColor: string }>`
  padding: 0.75rem;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: transparent;
  color: ${({ $textColor }) => $textColor};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ $focusColor }) => $focusColor};
    box-shadow: 0 0 0 3px ${({ $focusColor }) => $focusColor}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const Textarea = styled.textarea<{ $borderColor: string; $focusColor: string; $textColor: string }>`
  padding: 0.75rem;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: transparent;
  color: ${({ $textColor }) => $textColor};
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ $focusColor }) => $focusColor};
    box-shadow: 0 0 0 3px ${({ $focusColor }) => $focusColor}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input<{ $accentColor: string }>`
  width: 18px;
  height: 18px;
  accent-color: ${({ $accentColor }) => $accentColor};
  cursor: pointer;
`;

const CheckboxLabel = styled.label<{ $color: string }>`
  font-size: 0.875rem;
  color: ${({ $color }) => $color};
  cursor: pointer;
`;

const SubmitButton = styled.button<{ $backgroundColor: string; $hoverBackgroundColor: string }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export { FormPreview };
