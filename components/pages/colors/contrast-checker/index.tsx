import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ContrastTextButton } from '@/components/ui/text-buttons/contrast-button';
import { ContrastStatus } from './contrast-status';
import { TemplateCard } from './template-card';
import { ColorPalette } from './example-palette';
import { adjustColorForContrast } from '@/utils/adjust-color-for-contrast';
import { ToolCrossLinks } from '@/components/ui/cross-links';

const ColorContrast: React.FC = () => {
  const [{ textColor, bgColor }, setColors] = useState<{ textColor: string; bgColor: string }>({
    textColor: '#000000',
    bgColor: '#FFFFFF',
  });

  const handleTextColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, textColor: color }));
  };

  const handleBgColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, bgColor: color }));
  };

  const handleColorPaletteSelect = (background: string, text: string) => {
    setColors({ bgColor: background, textColor: text });
  };

  const handleSelectContrastForTextColor = () => {
    const newTextColor = adjustColorForContrast(textColor, bgColor);
    setColors((prev) => ({ ...prev, textColor: newTextColor }));
  };

  const handleSelectContrastForBgColor = () => {
    const newBgColor = adjustColorForContrast(bgColor, textColor);
    setColors((prev) => ({ ...prev, bgColor: newBgColor }));
  };

  return (
    <>
      <MainContainer>
        <FormSection>
          <FormTitle>Color Selection</FormTitle>
          <FormContainer>
            <FormRow>
              <FormField>
                <FormLabel>Background Color</FormLabel>
                <ColorInputBig
                  value={bgColor}
                  onChange={handleBgColorChange}
                />
              </FormField>
              <ImproveButton
                onClick={handleSelectContrastForBgColor}
              >
                Improve Contrast
              </ImproveButton>
            </FormRow>

            <FormRow>
              <FormField>
                <FormLabel>Text Color</FormLabel>
                <ColorInputBig
                  value={textColor}
                  onChange={handleTextColorChange}
                />
              </FormField>
              <ImproveButton
                onClick={handleSelectContrastForTextColor}
              >
                Improve Contrast
              </ImproveButton>
            </FormRow>
          </FormContainer>
        </FormSection>

        <ResultsSection>
          <ContrastStatus textColor={textColor} bgColor={bgColor} />
        </ResultsSection>
      </MainContainer>

      <PaletteSection>
        <PaletteTitle>Quick Color Presets</PaletteTitle>
        <ColorPalette onSelect={handleColorPaletteSelect} />
      </PaletteSection>

      <PreviewContainer>
        <TemplateCard textColor={textColor} backgroundColor={bgColor} />
      </PreviewContainer>

      <ToolCrossLinks
        toolKey="contrast-checker"
        title="Explore More Color Tools"
      />
    </>
  );
};

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(260px, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

const ImproveButton = styled.button`
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease;
  min-width: 140px;

  &:hover {
    background: #7e4fd4;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: unset;
  }
`;

const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaletteSection = styled.div`
  margin-top: 2.5rem;
`;

const PaletteTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export default ColorContrast;
