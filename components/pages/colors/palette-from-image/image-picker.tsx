import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { getPaletteWithCoordinates } from '@/utils/colors-palette-from-image';

interface Props {
  selectedImage: string | null;
  onPaletteChange: (autoPalette: string[], userPalette: string[]) => void;
};

const ImageColorPicker: React.FC<Props> = ({ selectedImage, onPaletteChange }) => {
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [userPalette, setUserPalette] = useState<string[]>([]);
  const [colorPickers, setColorPickers] = useState<{ color: string; x: number; y: number }[]>([]);
  const [movedPickers, setMovedPickers] = useState<boolean[]>([]);
  
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;
      const colorsWithCoordinates = getPaletteWithCoordinates(imageRef.current, 10, imgWidth, imgHeight);
      const colors = colorsWithCoordinates.map((color) => color.color);
      setAutoPalette(colors);
      setColorPickers(colorsWithCoordinates);
      setMovedPickers(Array(colorsWithCoordinates.length).fill(false));
      onPaletteChange(colors, []);
    }
  };

  const handleColorPickerMove = (index: number, x: number, y: number) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const constrainedX = Math.min(Math.max(0, x), rect.width);
    const constrainedY = Math.min(Math.max(0, y), rect.height);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(constrainedX, constrainedY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const newColor = `rgb(${r},${g},${b})`;
    const hexColor = convertColor(newColor, ColorFormat.HEX);
    const newColorPickers = [...colorPickers];
    newColorPickers[index] = { color: hexColor, x: constrainedX, y: constrainedY };
    setColorPickers(newColorPickers);

    const newUserPalette = [...userPalette];
    if (!movedPickers[index]) {
      // First move, add color to the palette
      newUserPalette.push(hexColor);
      setMovedPickers((prev) => {
        const newMovedPickers = [...prev];
        newMovedPickers[index] = true;
        return newMovedPickers;
      });
    } else {
      // Update existing color in the palette
      const colorIndex = movedPickers.reduce((acc, moved, idx) => (moved && idx <= index ? acc + 1 : acc), 0) - 1;
      newUserPalette[colorIndex] = hexColor;
    }
    setUserPalette(newUserPalette);
    onPaletteChange(autoPalette, newUserPalette);
  };

  const handleMouseDown = (index: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      const rect = imageRef.current!.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const y = moveEvent.clientY - rect.top;
      handleColorPickerMove(index, x, y);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
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
            <img src={selectedImage as string} alt='Uploaded' ref={imageRef} onLoad={handleImageLoad} />

            {colorPickers.map((picker, index) => (
              <ColorPicker
                key={index}
                $backgroundColor={picker.color}
                $x={picker.x}
                $y={picker.y}
                onMouseDown={(event) => handleMouseDown(index, event)}
              />
            ))}
          </>
        )}
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

  img {
    max-width: 100%;
    cursor: crosshair;
    border-radius: 0.5rem;
    user-select: none;
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