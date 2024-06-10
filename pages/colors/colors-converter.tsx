import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { content } from '@/content/function-descriptions/colors-converter';

import { BaseLayout } from '@/layouts/base-layout';
import { Toast } from 'primereact/toast';
import { Label } from '@/components/ui/label';
import { NPMLink } from '@/components/ui/npm-link';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { CopyButton } from '@/components/ui/buttons/copy-button';
import { MainContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { Title } from '@/components/ui/typography';

type ConvertedColors = {
  [key in ColorFormat]?: string;
}

const ColorsConverterPage = () => {
  const [color, setColor] = useState('');
  const [convertedColors, setConvertedColors] = useState<ConvertedColors>({});
  const toast = useRef<Toast>(null);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
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

      <MainContainer>
        <Title>Color Converter</Title>

        <ContentContainer>
          <ColorPickerContainer>
            <SubTitle>Enter color</SubTitle>

            <ColorInput
              value={color}
              onChange={(newColor) => setColor(newColor)}
            />

            <ColorPreviewContainer>
              <ColorPreview color={color} />
            </ColorPreviewContainer>
          </ColorPickerContainer>

          <FormatsContainer>
            <FlexContainer>

            {Object.values(ColorFormat).map((format) => (
              <ResultColorContainer key={format}>
                <Label fontSize='0.9rem' >{format}</Label>

                <Label fontSize='0.9rem' color='var(--primary-color)' >{convertedColors[format]}</Label>
                
                <CopyButton text={convertedColors[format] || ''} />
              </ResultColorContainer>
              ))}
            </FlexContainer>
          </FormatsContainer>
        </ContentContainer>

        <NPMLink 
          text='Need to have color tools like these in you app? Feel free to use our NPM package'
          packageName='@mirawision/colorize'
        />
      </MainContainer>

      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer> 
    </BaseLayout>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 70%;
  margin: 0 auto;
  padding-bottom: 10rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const ColorPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem; 
  border-radius: 0.8rem;
  position: relative;
  box-shadow: 0 0 0.3125rem 0 var(--primary-color);
  width: fit-content;
  height: fit-content;
  margin-top: 2rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
`;

const ResultColorContainer = styled.div`
  display: grid;
  grid-template-columns: 3rem 13rem 0.5rem;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
`;

export default ColorsConverterPage;
