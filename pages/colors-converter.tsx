import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { NPMLink } from '@/components/common/npm-link';
import { BaseLayout } from '@/layouts/base-layout';

const ColorsConverter = () => {
  const [color, setColor] = useState('');
  const toast = useRef(null);

  useEffect(() => {
    setColor(generateRandomColor());
  }, []);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      //@ts-ignore
      toast.current?.show({ severity: 'success', summary: 'Copied', detail: 'Color copied to clipboard' });
    }).catch(error => console.error('Clipboard write failed', error));
  };

  return (
    <BaseLayout>
      <Toast ref={toast} />
      <Title>Color Converter</Title>
      <ContentContainer>
        <SubTitle>Enter color</SubTitle>
        <StyledInputText value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter a color" />
        <FormatsContainer>
          <FlexContainer>
            {['HEX', 'RGB', 'HSL'].map((format) => (
              <div key={format} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>{format}</label>
                <FormatButton 
                  label={(format === 'HEX' ? '#' : '') + convertColor(color, format)}
                  onClick={() => copyToClipboard((format === 'HEX' ? '#' : '') + convertColor(color, format))}
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

function convertColor(hex: string, format: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  let r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

  if (format === 'RGB') {
    return `rgb(${r}, ${g}, ${b})`;
  } else if (format === 'HSL') {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        h = 0, // Initialize h to 0
        s,
        l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    if(s) {
      s = s*100;
      s = Math.round(s);
    }
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
    return `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    return hex; 
  }
}

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

export default ColorsConverter;
