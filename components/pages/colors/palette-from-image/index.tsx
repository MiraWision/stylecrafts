import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { ImageColorPicker } from './image-picker';
import { useToast } from '@/components/ui/toast';
import { ImageInput, ImageData } from '@/components/ui/inputs/image-input';
import { ImageExamples } from './image-examples';
import { ToolCrossLinks } from '@/components/ui/cross-links';
import { UploadTextButton } from '@/components/ui/text-buttons/upload-text-button';

import { Palette } from './palette';

interface Props {}

const exampleImages = [
  {
    src: '/image-examples/orange-nature.jpeg',
    colors: ["#572e1a","#89512a","#2f170c","#fde3bf","#b4581f","#b8774e","#e0ad85","#de9855","#f6ca79","#752f0d","#7e5040","#fff8e5"]
  },
  {
    src: '/image-examples/green-nature.jpeg',
    colors: ["#2b2d22","#7b8187","#a69073","#4577a2","#474f4d","#5a6033","#647d91","#cfd6cc","#6a93b7","#a7a49c","#f4cc91","#91adb9"]
  },
  {
    src: '/image-examples/green-blue-nature.jpeg',
    colors: ["#193818","#8cacd5","#76a3d3","#1f3739","#bdd0e8","#be4951","#5b8cbf","#ebe4e4","#4e7023","#95b9e1","#a7c2e3","#60805a"]
  },
  {
    src: '/image-examples/purple-nature.jpeg',
    colors: ["#433b6d","#b16ba1","#8887cc","#414095","#635c98","#eaa0a8","#79529c","#4562b8","#503544","#4e65b3","#5a7ac5","#4951a4"]
  },
  {
    src: '/image-examples/orange-pink-blue-nature.jpeg',
    colors: ["#13130a","#974948","#39254f","#0c1a35","#563470","#072351","#342966","#753e63","#542c35","#e57137","#1c3275","#092a65"]
  },
  {
    src: '/image-examples/white-animal.jpeg',
    colors: ["#907b88","#423f78","#514a84","#47437d","#615583","#4c4782","#494583","#4f487d","#4e404f","#574f86","#c4aaa9","#6f6181"]
  },
  {
    src: '/image-examples/horvatia-example.jpg',
    colors: ["#cb9c81","#ece0d2","#2e3225","#267ba2","#c0cee3","#c9d5e4","#97c0db","#6f7064","#becfe2","#b2cbe0","#5c9bbd","#10597a"]
  },
  {
    src: '/image-examples/canoe-example.jpg',
    colors: ["#df7381","#bdceb6","#6a8c9f","#f5f7fb","#91c6c7","#b7c0d6","#f9fcfe","#758765","#39423d","#fefefe","#e4eaf4","#d1eef4"]
  }
];

const PaletteFromImageMain: React.FC<Props> = () => {
  const { toast } = useToast();

  const [palette, setPalette] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [clearedPaletteVersion, setClearedPaletteVersion] = useState(0);

  const handlePaletteChange = (newPalette: string[]) => {
    setPalette(newPalette);
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
    } else {
      setPalette([]);
    }
    
    setSelectedImage({ content: imageSrc });
    setClearedPaletteVersion(v => v + 1);
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
            <ImageInputStyled
              value={null}
              onChange={(image) => handleImageSelect(image.content as string)} 
            />
          )}
          <UploadButtonContainer>
            <UploadTextButton 
              text='Upload Image'
              onFileSelect={handleFileSelect}
            />
          </UploadButtonContainer>
        </ImageColumn>

        <PaletteColumn>
          <Palette
            palette={palette}
            onRemoveColor={handleRemoveColor}
            onRefreshPalette={handleRefreshPalette}
          />
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 13rem;
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
  gap: 0.5rem;
  width: 13rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    order: 2;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
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

const ImageInputStyled = styled(ImageInput)`
  width: 100%;
  min-height: 15rem;
`;

export { PaletteFromImageMain };
