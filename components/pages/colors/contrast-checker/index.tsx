import React, { useState } from 'react';
import styled from 'styled-components';

import { ColorInputBig } from '@/components/ui/inputs/color-input-big';
import { ContrastStatus } from './contrast-status';
import { TemplateCard } from './template-card';
import { ColorPalette } from './example-palette';
import { adjustColorForContrast } from '@/utils/adjust-color-for-contrast';
import { ToolCrossLinks } from '@/components/ui/cross-links';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { TrandUp } from '@/components/icons/trand-up';
import { ShuffleIcon } from '@/components/icons/shuffle';

const ColorContrast: React.FC = () => {
  const [{ textColor, bgColor }, setColors] = useState<{ textColor: string; bgColor: string }>({
    textColor: '#000000',
    bgColor: '#FFFFFF',
  });

  const [currentTargetContrast, setCurrentTargetContrast] = useState<number>(7);

  const handleTextColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, textColor: color }));
    // Reset target when colors change
    setCurrentTargetContrast(7);
  };

  const handleBgColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, bgColor: color }));
    // Reset target when colors change
    setCurrentTargetContrast(7);
  };

  const handleColorPaletteSelect = (background: string, text: string) => {
    setColors({ bgColor: background, textColor: text });
    // Reset target when colors change
    setCurrentTargetContrast(7);
  };

  const handleImproveContrast = () => {
    const { textColor: newTextColor, bgColor: newBgColor, newTarget } = adjustColorForContrast(
      textColor, 
      bgColor, 
      currentTargetContrast
    );
    
    setColors({ textColor: newTextColor, bgColor: newBgColor });
    setCurrentTargetContrast(newTarget);
  };

  const handleSwapColors = () => {
    setColors({ textColor: bgColor, bgColor: textColor });
    // Reset target when colors change
    setCurrentTargetContrast(7);
  };

  return (
    <>
      <MainContainer>
        <FormSection>
          <FormContainer>
            <FormRow>
              <FormField>
                <FormLabel>Background Color</FormLabel>
                <ColorInputBig
                  value={bgColor}
                  onChange={handleBgColorChange}
                />
              </FormField>

              <FormField>
                <FormLabel>Text Color</FormLabel>
                <ColorInputBig
                  value={textColor}
                  onChange={handleTextColorChange}
                />
              </FormField>
            </FormRow>

            <ButtonContainer>
              <BaseTextButton
                text="Improve Contrast"
                icon={<TrandUp width="24" height="24" />}
                onClick={handleImproveContrast}
                isPrimary
              />
              <BaseTextButton
                text="Swap Colors"
                icon={<ShuffleIcon width="24" height="24" />}
                onClick={handleSwapColors}
              />
            </ButtonContainer>

            <ExamplesSection>
              <ColorPalette onSelect={handleColorPaletteSelect} />
            </ExamplesSection>
          </FormContainer>
        </FormSection>

        <ResultsSection>
          <ContrastStatus textColor={textColor} bgColor={bgColor} />
        </ResultsSection>
      </MainContainer>

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
  grid-template-columns: 3fr 3fr;
  gap: 6rem;
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
  gap: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);
  margin-bottom: 0.25rem;
`;

const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

const ExamplesSection = styled.div`
`;

export default ColorContrast;
