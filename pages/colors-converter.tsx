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
        <InputText value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter a color" />
        <FormatsContainer>
          <FlexContainer>
            {['HEX', 'RGB', 'HSL'].map((format) => (
              <div key={format} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>{format}</label>
                <FormatButton 
                  label={convertColor(color, format)} 
                  onClick={() => copyToClipboard(convertColor(color, format))}
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
        <Button label="Color schema creator" className="p-button-secondary" />
      </ContentContainer>
      <NPMLink 
        text='Need to have color tools like these in you app? Feel free to use our NPM package'
        packageName='@mirawision/colorize'
      />
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
`;

const SubTitle = styled.h2`
`;

const ContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const FormatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-gap: 70px;
  justify-content: center;
  align-items: center;
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
  box-shadow: 0 0 5px 0 rgba(255, 20, 147, 0.5);
  width: fit-content;
  height: fit-content;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 20rem;
  height: 20rem;
  border-radius: 0.8rem;
  background-color: ${({ color }) => color};
  transition: background-color 0.3s;
`;

const FormatButton = styled(Button)`
  margin-top: 0.5rem;
  background: none;
  color: var(--primary-color);
  border-radius: 1rem;
  .p-button-label {
    flex: 1;
  }
`;

export default ColorsConverter;
