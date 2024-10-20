import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { getPaletteWithCoordinates } from '@/utils/colors-palette-from-image';

interface Props {
  selectedImage: string | null;
  onPaletteChange: (autoPalette: string[], userPalette: string[]) => void;
}

const ImageColorPicker: React.FC<Props> = ({ selectedImage, onPaletteChange }) => {
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [userPalette, setUserPalette] = useState<string[]>([]);
  const [colorPickers, setColorPickers] = useState<{ color: string; x: number; y: number }[]>([]);
  const [zoomStyle, setZoomStyle] = useState<{ backgroundImage: string; backgroundPosition: string } | null>(null);
  
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;
      const colorsWithCoordinates = getPaletteWithCoordinates(imageRef.current, 10, imgWidth, imgHeight).slice(0, 10);
      const colors = colorsWithCoordinates.map((color) => color.color);
      setAutoPalette(colors);
      setColorPickers(colorsWithCoordinates);
      onPaletteChange(colors, []);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    setZoomStyle({
      backgroundImage: `url(${imageRef.current.src})`,
      backgroundPosition: backgroundPosition,
    });
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(x, y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const newColor = `rgb(${r},${g},${b})`;
    const hexColor = convertColor(newColor, ColorFormat.HEX);
    const newUserPalette = [...userPalette, hexColor];
    setUserPalette(newUserPalette);
    setColorPickers([...colorPickers, { color: hexColor, x, y }]);
    onPaletteChange(autoPalette, newUserPalette);
  };

  const handleMouseLeave = () => {
    setZoomStyle(null);
  };

  useEffect(() => {
    if (imageRef.current && selectedImage) {
      handleImageLoad();
    }
  }, [selectedImage]);

  return (
    <Container>
      <ImageWrapper>
        {selectedImage && (
          <>
            <img 
              src={selectedImage as string} 
              alt='Uploaded' 
              ref={imageRef} 
              onLoad={handleImageLoad} 
              onMouseMove={handleMouseMove} 
              onClick={handleImageClick}
              onMouseLeave={handleMouseLeave}
            />
            {colorPickers.map((picker, index) => (
              <ColorPicker
                key={index}
                $backgroundColor={picker.color}
                $x={picker.x}
                $y={picker.y}
              />
            ))}
          </>
        )}
        {zoomStyle && <Zoom style={zoomStyle} />}
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  img {
    max-width: 100%;
    cursor: crosshair;
    border-radius: 0.5rem;
    user-select: none;
  }
`;

const Zoom = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-size: 10000%;
  border: 2px solid #ccc;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgba(255, 0, 0, 0.6);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ColorPicker = styled.div.attrs<{ $backgroundColor: string; $x: number; $y: number }>(({ $backgroundColor, $x, $y }) => ({
  style: {
    backgroundColor: $backgroundColor,
    top: `${$y}px`,
    left: `${$x}px`,
  },
}))`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 0.125rem solid white;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

export { ImageColorPicker };
