import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { NPMLink } from '@/components/common/npm-link';
import { BaseLayout } from '@/layouts/base-layout';
import { convertColor, ColorFormat } from '@mirawision/colorize';

type ConvertedColors = {
  [key in ColorFormat]?: string;
}

const ColorsConverter = () => {
  const [color, setColor] = useState('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const toast = useRef<Toast>(null);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.current?.show({ severity: 'success', summary: 'Copied', detail: 'Color copied to clipboard' });
    }).catch(error => console.error('Clipboard write failed', error));
  };

  useEffect(() => {
    setColor(generateRandomColor());
  }, []);

  useEffect(() => {
    const newConvertedColors: ConvertedColors = {};
    Object.values(ColorFormat).forEach((format) => {
      try {
        newConvertedColors[format] = convertColor(color, format);
      } catch (error) {
        console.error('Error converting color:', error);
        newConvertedColors[format] = '';
      }
    });
    setConvertedColors(newConvertedColors);
  }, [color]);

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <Title>Color Converter</Title>
      <ContentContainer>
        <SubTitle>Enter color</SubTitle>
        <StyledInputText value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter a color" />
        <FormatsContainer>
          <FlexContainer>
          {Object.values(ColorFormat).map((format) => (
              <div key={format} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>{format}</label>
                <Button
                  label={convertedColors[format] || ''}
                  onClick={() => copyToClipboard(convertedColors[format]!)}
                  icon="pi pi-copy"
                  className="p-button-rounded p-button-outlined"
                />
              </div>
            ))}
          </FlexContainer>
          <ColorPreviewContainer>
            <ColorPreview color={color} />
          </ColorPreviewContainer>
        </FormatsContainer>
        <ColorShemaButton label="Color schema creator" className="p-button-secondary" />
      </ContentContainer>
    </BaseLayout>
  );
};


export default ColorsConverter;

const Title = styled.h1`
  text-align: center;

  @media (max-width: 1200px) { 
    font-size: 1.8rem;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const StyledInputText = styled(InputText)`
  @media (max-width: 1200px) { 
    font-size: 0.9rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;

const SubTitle = styled.h2`
  @media (max-width: 1200px) { 
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const ContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px; 
  border-radius: 0.8rem;
  position: relative;
  box-shadow: 0 0 5px 0 var(--primary-color);
  width: fit-content;
  height: fit-content;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 25vw;
  height: 25vw;
  max-width: 18rem; 
  max-height: 18rem;
  border-radius: 0.8rem;
  background-color: ${({ color }) => color};
  transition: background-color 0.3s;

  @media (max-width: 1200px) { 
    max-width: 16rem; 
    max-height: 16rem;
  }

  @media (max-width: 900px) {
    max-width: 14rem; 
    max-height: 14rem;
  }

  @media (max-width: 600px) {
    max-width: 12rem; 
    max-height: 12rem;
  }

  @media (max-width: 400px) {
    max-width: 10rem; 
    max-height: 10rem;
  }
`;

const FormatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-gap: 70px;
  justify-content: center;
  align-items: center;
  margin: 0.8rem 0;
`;

const FormatButton = styled(Button)`
  margin-top: 0.5rem;
  background: none;
  color: var(--primary-color);
  border-radius: 1rem;
  padding: 0.5rem 1rem; 
  font-size: 1rem;
  width: auto;
  white-space: nowrap;
  
  .p-button-label {
    flex: 1;
  }

  @media (max-width: 1200px) { 
    font-size: 0.9rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
  }

`;

const ColorShemaButton = styled(Button)`
  @media (max-width: 1200px) { 
    font-size: 0.9rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;