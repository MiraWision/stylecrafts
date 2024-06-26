import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { getPaletteWithCoordinates } from '@/utils/colors-palette-from-image';

interface Props {
  onPaletteChange: (autoPalette: string[], userPalette: string[]) => void;
};

const ImageColorPicker: React.FC<Props> = ({ onPaletteChange }) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [autoPalette, setAutoPalette] = useState<string[]>([]);
  const [userPalette, setUserPalette] = useState<string[]>([]);
  const [colorPickers, setColorPickers] = useState<{ color: string; x: number; y: number }[]>([]);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const colorsWithCoordinates = getPaletteWithCoordinates(imageRef.current, 10);
      const colors = colorsWithCoordinates.map((color) => color.color);
      setAutoPalette(colors);
      setColorPickers(colorsWithCoordinates);
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
    const newColorPickers = [...colorPickers];
    newColorPickers[index] = { color: newColor, x: constrainedX, y: constrainedY };
    setColorPickers(newColorPickers);

    const newUserPalette = [...userPalette];
    newUserPalette[index] = newColor;
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
    if (imageRef.current && imageSrc) {
      handleImageLoad();
    }
  }, [imageSrc]);

  return (
    <Container>
      <ChooseButton onClick={handleChooseClick}>Choose</ChooseButton>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <ImageWrapper>
        {imageSrc && (
          <>
            <img src={imageSrc as string} alt='Uploaded' ref={imageRef} onLoad={handleImageLoad} />
            {colorPickers.map((picker, index) => (
              <ColorPicker
                key={index}
                color={picker.color}
                x={picker.x}
                y={picker.y}
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
  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  img {
    max-width: 100%;
    cursor: crosshair;
  }
`;

const ChooseButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ColorPicker = styled.div<{ color: string; x: number; y: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  border: 2px solid white;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

export { ImageColorPicker };