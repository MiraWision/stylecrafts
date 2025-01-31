import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat } from '@mirawision/colorize';
import { getPaletteWithCoordinates } from '@/utils/colors-palette-from-image';
import { Zoom } from './zoom';

const PIXEL_WINDOW = 11;

interface ZoomData {
  x: number;
  y: number;
}

interface Props {
  selectedImage: string | null;
  onPaletteChange: (palette: string[]) => void;
}

const ImageColorPicker: React.FC<Props> = ({ selectedImage, onPaletteChange }) => {
  const [palette, setPalette] = useState<string[]>([]);
  const [pixelationMode, setPixelationMode] = useState<boolean>(false);
  const [normalZoomLevel, setNormalZoomLevel] = useState<number>(5);
  const [zoomData, setZoomData] = useState<ZoomData | null>(null);
  const [pixelMatrix, setPixelMatrix] = useState<string[][] | null>(null);
  const [displaySize, setDisplaySize] = useState<{ w: number; h: number } | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      setPixelMatrix(null);
      setZoomData(null);
    }
  }, [selectedImage]);

  const handleImageLoad = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;

    const colorsWithCoordinates = getPaletteWithCoordinates(
      img,
      10,
      img.width,
      img.height
    ).slice(0, 10);
    const colors = colorsWithCoordinates.map((c) => c.color);
    setPalette(colors);
    onPaletteChange(colors);

    offscreenCanvasRef.current = document.createElement('canvas');
    offscreenCanvasRef.current.width = img.naturalWidth;
    offscreenCanvasRef.current.height = img.naturalHeight;
    const ctx = offscreenCanvasRef.current.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    if (!displaySize || displaySize.w !== rect.width || displaySize.h !== rect.height) {
      setDisplaySize({ w: rect.width, h: rect.height });
    }

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setZoomData({ x, y });

    if (!pixelationMode) {
      setPixelMatrix(null);
    } else {

      if (!offscreenCanvasRef.current) return;
      const ctx = offscreenCanvasRef.current.getContext('2d');
      if (!ctx) return;

      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      const realX = Math.round(x * scaleX);
      const realY = Math.round(y * scaleY);

      const half = Math.floor(PIXEL_WINDOW / 2);
      const startX = Math.max(0, realX - half);
      const startY = Math.max(0, realY - half);
      const w = Math.min(PIXEL_WINDOW, img.naturalWidth - startX);
      const h = Math.min(PIXEL_WINDOW, img.naturalHeight - startY);

      const imageData = ctx.getImageData(startX, startY, w, h).data;
      let index = 0;
      const rowColors: string[][] = [];

      for (let row = 0; row < h; row++) {
        const rowArr: string[] = [];
        for (let col = 0; col < w; col++) {
          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          // alpha = imageData[index + 3];
          index += 4;
          const rgbColor = `rgb(${r},${g},${b})`;
          const hexColor = convertColor(rgbColor, ColorFormat.HEX);
          rowArr.push(hexColor);
        }

        while (rowArr.length < PIXEL_WINDOW) {
          rowArr.push('#000000');
        }
        rowColors.push(rowArr);
      }

      while (rowColors.length < PIXEL_WINDOW) {
        rowColors.push(Array(PIXEL_WINDOW).fill('#000000'));
      }

      setPixelMatrix(rowColors);
    }
  };

  const handleMouseLeave = () => {
    setZoomData(null);
    setPixelMatrix(null);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    const realX = Math.floor(x * scaleX);
    const realY = Math.floor(y * scaleY);

    const imageData = ctx.getImageData(realX, realY, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    const hexColor = convertColor(rgbColor, ColorFormat.HEX);

    const newPalette = [...palette, hexColor];
    setPalette(newPalette);
    onPaletteChange(newPalette);
  };

  const togglePixelationMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixelationMode(e.target.checked);
    if (!e.target.checked) {
      setPixelMatrix(null);
    }
  };

  const handleZoomLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNormalZoomLevel(Number(e.target.value));
  };

  return (
    <Container>
      <ImageWrapper>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Uploaded"
            ref={imageRef}
            onLoad={handleImageLoad}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleImageClick}
            style={{ cursor: 'crosshair' }}
          />
        )}

        {zoomData && displaySize && (
          <Zoom
            zoomData={zoomData}
            imageUrl={selectedImage || ''}
            pixelationMode={pixelationMode}
            pixelMatrix={pixelMatrix}
            normalZoomLevel={normalZoomLevel}
            displayWidth={displaySize.w}
            displayHeight={displaySize.h}
          />
        )}
      </ImageWrapper>

      {selectedImage && (
        <ControlsContainer>
          <label>
            <input
              type="checkbox"
              checked={pixelationMode}
              onChange={togglePixelationMode}
            />
            Pixelation Mode
          </label>

          {!pixelationMode && (
            <div>
              <label>
                Zoom: {normalZoomLevel}x
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={normalZoomLevel}
                  onChange={handleZoomLevelChange}
                  style={{ marginLeft: '6px' }}
                />
              </label>
            </div>
          )}
        </ControlsContainer>
      )}
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
  max-width: 700px;
  img {
    max-width: 100%;
    display: block;
  }
`;

const ControlsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export { ImageColorPicker };
