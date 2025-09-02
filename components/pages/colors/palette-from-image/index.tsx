import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageColorPicker } from './image-picker';
import { useToast } from '@/components/ui/toast';
import { ImagePlaceholder } from '@/components/ui/images/image-placeholder';
import { ImageInputMini, ImageData } from '@/components/ui/inputs/image-input-mini';
import { ImageExamples } from './image-examples';
import { Label } from '@/components/ui/texts/label';
import { ToolCrossLinks } from '@/components/ui/cross-links';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';
import { CopyIcon } from '@/components/icons/copy';
import { UploadTextButton } from '@/components/ui/text-buttons/upload-text-button';

import { Palette } from './palette';

interface Props {}

const exampleImages = [
  {
    src: '/image-examples/orange-nature.jpeg',
    colors: ["#ffdac0", "#c76948", "#b88f63", "#7c534b", "#4f2100", "#9a4f29", "#220b00", "#8a391a"]
  },
  {
    src: '/image-examples/green-nature.jpeg',
    colors: ["#5083b0","#85a5ba","#c0ded6","#f9ffd6","#727a85","#3a442b","#212725","#5f5939"]
  },
  {
    src: '/image-examples/green-blue-nature.jpeg',
    colors: ["#2b5023", "#a6c0e0", "#6f9dcb", "#668c51", "#aca12f", "#4a79aa", "#ac392d", "#95709f"]
  },
  {
    src: '/image-examples/purple-nature.jpeg',
    colors: ["#505caa", "#463350", "#a565a0", "#d39cba", "#6a8bce", "#8f5f6e"]
  },
  {
    src: '/image-examples/orange-pink-blue-nature.jpeg',
    colors: ["#302747", "#b85347", "#fa9a16", "#494285", "#8a548d"]
  },
  {
    src: '/image-examples/white-animal.jpeg',
    colors: ["#6b5e85", "#cbafaa", "#e3cab8", "#443d70", "#ead2c9", "#3d3a70", "#4c3d3e", "#1f1a21", "#3f4077", "#d7b0c7"]
  },
  {
    src: '/image-examples/horvatia-example.jpg',
    colors: ["#176f94", "#b8c8d8", "#225260", "#408eb3", "#b88b71", "#9e745b", "#619078"]
  },
  {
    src: '/image-examples/canoe-example.jpg',
    colors: ["#cddce5", "#485349", "#70a2a8", "#5a7698", "#cc5d67", "#778e62", "#879b69", "#a86588"]
  }
];

const PaletteFromImageMain: React.FC<Props> = () => {
  const { toast } = useToast();

  const [palette, setPalette] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [clearedPaletteVersion, setClearedPaletteVersion] = useState(0);

  const handlePaletteChange = (newPalette: string[]) => {
    setPalette(newPalette);
    
    // Log extracted colors when palette changes (for example images)
    if (selectedImage && exampleImages.find(img => img.src === selectedImage.content)) {
      const colorsString = JSON.stringify(newPalette);
      console.log(`Extracted colors for ${selectedImage.content}:`, colorsString);
      
      // Log in the exact format requested
      console.log(colorsString);
    }
  };

  const handleRemoveColor = (index: number) => {
    setPalette(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleRefreshPalette = () => {
    setPalette([]);
    setClearedPaletteVersion(v => v + 1);
  };

  const handleImageSelect = (imageSrc: string) => {
    // prevent re-selecting the same image from examples
    if (selectedImage?.content === imageSrc) {
      return;
    }
    
    // Find the example image to get predefined colors
    const exampleImage = exampleImages.find(img => img.src === imageSrc);
    if (exampleImage) {
      setPalette(exampleImage.colors);
      
      // Log the predefined colors for the selected example
      const colorsString = JSON.stringify(exampleImage.colors);
      console.log(`Selected example image: ${imageSrc}`);
      console.log(`Predefined colors:`, colorsString);
      console.log(colorsString);
    } else {
      setPalette([]);
    }
    
    setSelectedImage({ content: imageSrc });
    setClearedPaletteVersion(v => v + 1);
  };

  // Function to update example colors with extracted values
  const updateExampleColors = (imageSrc: string, newColors: string[]) => {
    const exampleIndex = exampleImages.findIndex(img => img.src === imageSrc);
    if (exampleIndex !== -1) {
      // This would update the example colors in a real scenario
      // For now, we'll just log the update
      console.log(`Would update colors for ${imageSrc} to:`, JSON.stringify(newColors));
      console.log(JSON.stringify(newColors));
    }
  };

  const handleLogCurrentColors = () => {
    if (palette.length > 0) {
      const colorsString = JSON.stringify(palette);
      console.log('Current extracted colors:', colorsString);
      console.log(colorsString);
      
      // Copy to clipboard
      navigator.clipboard.writeText(colorsString).then(() => {
        toast.success('Copied!', 'Colors copied to clipboard in the exact format');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = colorsString;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success('Copied!', 'Colors copied to clipboard in the exact format');
      });
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = {
          content: reader.result as string,
          fileMetaData: {
            name: file.name,
            type: file.type as any,
            size: file.size,
            lastModified: file.lastModified,
          }
        };
        setSelectedImage(newImage);
        // Clear palette for uploaded images to trigger auto-generation
        setPalette([]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <GridContainer>
        <ImageColumn>
          {selectedImage ? (
            <ImageColorPicker
              selectedImage={selectedImage.content}
              onPaletteChange={handlePaletteChange}
              clearedPaletteVersion={clearedPaletteVersion}
            />
          ) : (
            <ImagePlaceholderContainer>
              <PlaceholderText>
                Upload an image or select from examples below to generate a color palette
              </PlaceholderText>
            </ImagePlaceholderContainer>
          )}
          <UploadButtonContainer>
            <UploadTextButton 
              text='Upload Image'
              onFileSelect={handleFileSelect}
            />
          </UploadButtonContainer>
        </ImageColumn>

        <PaletteColumn>
          <StyledLabel fontSize='14'>Palette</StyledLabel>
          <Palette
            palette={palette}
            onRemoveColor={handleRemoveColor}
            onRefreshPalette={handleRefreshPalette}
          />
          
          {palette.length > 0 && (
            <LogColorsButtonContainer>
              <BaseTextButton
                text="Log & Copy Colors"
                icon={<CopyIcon width="20" height="20" />}
                onClick={handleLogCurrentColors}
              />
            </LogColorsButtonContainer>
          )}
        </PaletteColumn>
      </GridContainer>

      <ImageExamplesContainer>
        <ImageExamples
          images={exampleImages}
          onImageSelect={handleImageSelect}
        />
      </ImageExamplesContainer>

      <ToolCrossLinks
        toolKey="palette-from-image"
        title="Explore More Color Tools"
      />
    </>
  );
};

const StyledLabel = styled(Label)`
  height: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 17.5rem;
  gap: 2rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const PaletteColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 17.5rem;
  flex-shrink: 0;
  @media (max-width: 768px) {
    order: 2;
    align-items: center;
    width: 100%;
    margin-bottom: 1.2rem;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;

  & > *:first-child {
    min-width: 180px;
    max-width: 100%;
    width: auto;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    margin-bottom: 1.5rem;
    
    & > *:first-child {
      min-width: 100%;
      width: 100%;
    }
  }
`;

const UploadButtonContainer = styled.div`
  text-align: center;
  margin: 0.5rem 0;
`;

const ImageExamplesContainer = styled.div`
  margin-top: 1rem;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const ImagePlaceholderContainer = styled.div`
  width: 20rem;
  height: 10rem;
  border: 0.0625rem dashed var(--surface-border);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--surface-50);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 8rem;
  }
`;

const PlaceholderText = styled.div`
  color: var(--surface-600);
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.5;
  max-width: 300px;
`;

const LogColorsButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export { PaletteFromImageMain };
