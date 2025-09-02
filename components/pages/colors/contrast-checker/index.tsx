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
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { UploadTextButton } from '@/components/ui/text-buttons/upload-text-button';
import { getPaletteWithCoordinates } from '@/utils/colors-palette-from-image';

const ColorContrast: React.FC = () => {
  const [{ textColor, bgColor }, setColors] = useState<{ textColor: string; bgColor: string }>({
    textColor: '#000000',
    bgColor: '#FFFFFF',
  });

  const [currentTargetContrast, setCurrentTargetContrast] = useState<number>(7);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePalette, setImagePalette] = useState<string[]>([]);
  const [isGeneratingPalette, setIsGeneratingPalette] = useState(false);

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

  const handleImageChange = (image: ImageData) => {
    setSelectedImage(image);
    if (image.content) {
      generatePaletteFromImage(image.content);
    } else {
      setImagePalette([]);
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData: ImageData = {
          content: reader.result as string,
          fileMetaData: {
            name: file.name,
            type: file.type as any,
            size: file.size,
            lastModified: file.lastModified,
          },
        };
        setSelectedImage(imageData);
        generatePaletteFromImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePaletteFromImage = (imageSrc: string) => {
    setIsGeneratingPalette(true);
    setImagePalette([]);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const palette = getPaletteWithCoordinates(img, 15, img.naturalWidth, img.naturalHeight);
        const colors = palette.map(item => item.color);
        setImagePalette(colors);
      } catch (error) {
        console.error('Error generating palette:', error);
        setImagePalette([]);
      } finally {
        setIsGeneratingPalette(false);
      }
    };
    img.onerror = () => {
      setIsGeneratingPalette(false);
      setImagePalette([]);
    };
    img.src = imageSrc;
  };

  const handlePaletteColorSelect = (color: string) => {
    // If text color is currently black (default), set it to the selected color
    // Otherwise, set background color to the selected color
    if (textColor === '#000000') {
      setColors(prev => ({ ...prev, textColor: color }));
    } else {
      setColors(prev => ({ ...prev, bgColor: color }));
    }
    setCurrentTargetContrast(7);
  };

  // Calculate the number of grid items needed for minimum 3 rows (9 items) or based on actual colors
  const gridItemCount = Math.max(9, Math.ceil(imagePalette.length / 3) * 3);

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

      <ImagePaletteSection>
        <ImageInputContainer>
          <ImageInput
            value={selectedImage?.content || null}
            onChange={handleImageChange}
          />
          <UploadButtonContainer>
            <UploadTextButton 
              text='Upload Image'
              onFileSelect={handleFileSelect}
            />
          </UploadButtonContainer>
        </ImageInputContainer>

        <PaletteContainer>
          <PaletteLabel>Palette</PaletteLabel>
          <PaletteGrid>
            {Array.from({ length: gridItemCount }).map((_, index) => {
              const color = imagePalette[index];
              if (color) {
                return (
                  <PaletteColor
                    key={index}
                    $backgroundColor={color}
                    onClick={() => handlePaletteColorSelect(color)}
                    title={`Click to use ${color}`}
                  >
                    <ColorHex>{color}</ColorHex>
                  </PaletteColor>
                );
              }
              return (
                <EmptyPaletteColor key={index}>
                  <EmptyText>No color</EmptyText>
                </EmptyPaletteColor>
              );
            })}
          </PaletteGrid>
          {isGeneratingPalette && (
            <GeneratingText>Generating palette...</GeneratingText>
          )}
        </PaletteContainer>
      </ImagePaletteSection>

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

const ImagePaletteSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  margin-top: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UploadButtonContainer = styled.div`
  text-align: center;
  margin: 0.5rem 0;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const PaletteLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--surface-900);
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;
`;

const PaletteColor = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid var(--surface-200);

  &:hover {
    transform: scale(1.05);
    border-color: var(--primary-color);
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const EmptyPaletteColor = styled.div`
  width: 4rem;
  height: 4rem;
  border: 2px dashed var(--surface-300);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-50);

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const EmptyText = styled.div`
  font-size: 0.75rem;
  color: var(--surface-500);
  text-align: center;
  line-height: 1.2;
`;

const ColorHex = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-family: var(--font-mono);
`;

const GeneratingText = styled.div`
  font-size: 0.875rem;
  color: var(--surface-600);
  font-style: italic;
`;

export default ColorContrast;
