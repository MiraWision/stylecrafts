import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat } from '@mirawision/colorize';

const PIXEL_WINDOW = 11;

interface ZoomData {
  x: number;
  y: number;
}

interface LabColor {
  L: number;
  a: number;
  b: number;
  hex: string;
}

interface Props {
  selectedImage: string | null;
  onPaletteChange: (palette: string[]) => void;
  clearedPaletteVersion?: number;
}

const ImageColorPicker: React.FC<Props> = ({
  selectedImage,
  onPaletteChange,
  clearedPaletteVersion,
}) => {
  const [palette, setPalette] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const pixelationMode = true;
  const [zoomData, setZoomData] = useState<ZoomData | null>(null);
  const [pixelMatrix, setPixelMatrix] = useState<string[][] | null>(null);
  const [displaySize, setDisplaySize] = useState<{ w: number; h: number } | null>(null);

  const isTouchRef = useRef(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      setPixelMatrix(null);
      setZoomData(null);
      setPalette([]);
      onPaletteChange([]);
      return;
    }
    
    // Reset palette when image changes
    setPalette([]);
    onPaletteChange([]);
  }, [selectedImage]);

  // Separate effect for auto-generation
  useEffect(() => {
    if (selectedImage && palette.length === 0 && imageRef.current && imageRef.current.complete) {
      generateAutoPalette();
    }
  }, [selectedImage, palette.length]);

  useEffect(() => {
    setPalette([]);
    onPaletteChange([]);
  }, [clearedPaletteVersion]);

  // Convert RGB to LAB color space for better color distance calculations
  const rgbToLab = (r: number, g: number, b: number): LabColor => {
    // Normalize RGB values
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    // Convert to sRGB
    const rSrgb = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
    const gSrgb = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
    const bSrgb = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

    // Convert to XYZ
    const x = rSrgb * 0.4124 + gSrgb * 0.3576 + bSrgb * 0.1805;
    const y = rSrgb * 0.2126 + gSrgb * 0.7152 + bSrgb * 0.0722;
    const z = rSrgb * 0.0193 + gSrgb * 0.1192 + bSrgb * 0.9505;

    // Convert to LAB
    const xn = 0.95047;
    const yn = 1.00000;
    const zn = 1.08883;

    const xr = x > 0.008856 ? Math.pow(x / xn, 1/3) : (7.787 * x / xn) + (16/116);
    const yr = y > 0.008856 ? Math.pow(y / yn, 1/3) : (7.787 * y / yn) + (16/116);
    const zr = z > 0.008856 ? Math.pow(z / zn, 1/3) : (7.787 * z / zn) + (16/116);

    const L = (116 * yr) - 16;
    const a = 500 * (xr - yr);
    const bLab = 200 * (yr - zr);

    return { L, a, b: bLab, hex: '' };
  };

  // Calculate LAB color distance (perceptually uniform)
  const labDistance = (color1: LabColor, color2: LabColor): number => {
    const dL = color1.L - color2.L;
    const da = color1.a - color2.a;
    const db = color1.b - color2.b;
    return Math.sqrt(dL * dL + da * da + db * db);
  };

  // Sample colors from a comprehensive grid (e.g., 50x50) for complete coverage
  const sampleGridColors = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, gridSize: number = 50): LabColor[] => {
    const colors: LabColor[] = [];
    const stepX = img.naturalWidth / gridSize;
    const stepY = img.naturalHeight / gridSize;
    
    // Sample every pixel in the grid
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const px = Math.floor(x * stepX);
        const py = Math.floor(y * stepY);
        
        // Ensure we don't go out of bounds
        if (px >= img.naturalWidth || py >= img.naturalHeight) continue;
        
        const imageData = ctx.getImageData(px, py, 1, 1).data;
        const r = imageData[0];
        const g = imageData[1];
        const b = imageData[2];
        
        const labColor = rgbToLab(r, g, b);
        labColor.hex = convertColor(`rgb(${r}, ${g}, ${b})`, ColorFormat.HEX);
        colors.push(labColor);
      }
    }
    
    return colors;
  };

  // Simple K-means clustering to find representative colors
  const kMeansClustering = (colors: LabColor[], k: number, maxIterations: number = 10): LabColor[] => {
    if (colors.length <= k) {
      return colors;
    }
    
    // Initialize centroids with random colors
    const centroids: LabColor[] = [];
    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor((i * 137.5) % colors.length);
      centroids.push({ ...colors[randomIndex] });
    }
    
    let iterations = 0;
    let hasChanged = true;
    
    while (hasChanged && iterations < maxIterations) {
      hasChanged = false;
      iterations++;
      
      // Assign each color to nearest centroid
      const clusters: LabColor[][] = Array.from({ length: k }, () => []);
      
      colors.forEach(color => {
        let minDistance = Infinity;
        let nearestCentroid = 0;
        
        centroids.forEach((centroid, index) => {
          const distance = labDistance(color, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            nearestCentroid = index;
          }
        });
        
        clusters[nearestCentroid].push(color);
      });
      
      // Update centroids
      clusters.forEach((cluster, index) => {
        if (cluster.length === 0) return;
        
        // Calculate average LAB values
        let avgL = 0, avgA = 0, avgB = 0;
        cluster.forEach(color => {
          avgL += color.L;
          avgA += color.a;
          avgB += color.b;
        });
        
        avgL /= cluster.length;
        avgA /= cluster.length;
        avgB /= cluster.length;
        
        // Find the color closest to the average (centroid)
        let closestColor = cluster[0];
        let minDistance = Infinity;
        
        cluster.forEach(color => {
          const distance = Math.sqrt(
            Math.pow(color.L - avgL, 2) + 
            Math.pow(color.a - avgA, 2) + 
            Math.pow(color.b - avgB, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
          }
        });
        
        // Check if centroid changed
        if (closestColor.hex !== centroids[index].hex) {
          hasChanged = true;
          centroids[index] = closestColor;
        }
      });
    }
    
    return centroids;
  };

  const generateAutoPalette = () => {
    if (!imageRef.current || !offscreenCanvasRef.current) return;
    
    setIsGenerating(true);
    
    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      const img = imageRef.current;
      const canvas = offscreenCanvasRef.current;
      if (!img || !canvas) {
        setIsGenerating(false);
        return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsGenerating(false);
        return;
      }

      try {
        const gridColors = sampleGridColors(ctx, img, 100);
        
        const clusteredColors = kMeansClustering(gridColors, 12);
        const finalPalette = clusteredColors.map(c => c.hex);
        
        setPalette(finalPalette);
        onPaletteChange(finalPalette);
      } catch (error) {
        console.error('Error generating palette:', error);
        const fallbackColors = sampleGridColors(ctx, img, 30);
        const fallbackPalette = kMeansClustering(fallbackColors, 12).map(c => c.hex);
        setPalette(fallbackPalette);
        onPaletteChange(fallbackPalette);
      }
      
      setIsGenerating(false);
    }, 100);
  };

  const handleImageLoad = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;

    offscreenCanvasRef.current = document.createElement('canvas');
    offscreenCanvasRef.current.width = img.naturalWidth;
    offscreenCanvasRef.current.height = img.naturalHeight;
    const ctx = offscreenCanvasRef.current.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      // Only generate palette if none exists
      if (palette.length === 0) {
        generateAutoPalette();
      }
    }
  };

  const getCoordinatesFromEvent = (
    event: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    if (!imageRef.current) return null;
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    if (!displaySize || displaySize.w !== rect.width || displaySize.h !== rect.height) {
      setDisplaySize({ w: rect.width, h: rect.height });
    }

    let clientX: number;
    let clientY: number;

    if ('touches' in event || 'changedTouches' in event) {
      const touchEvent = event as React.TouchEvent<HTMLImageElement>;
      const touchList =
        touchEvent.touches.length > 0 ? touchEvent.touches : touchEvent.changedTouches;
      if (touchList.length === 0) return null;
      clientX = touchList[0].clientX;
      clientY = touchList[0].clientY;
    } else {
      const mouseEvent = event as React.MouseEvent<HTMLImageElement>;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  };

  const updatePixelMatrix = (x: number, y: number) => {
    if (!imageRef.current || !offscreenCanvasRef.current) return;
    const img = imageRef.current;
    const ctx = offscreenCanvasRef.current.getContext('2d');
    if (!ctx) return;

    const scaleX = img.naturalWidth / (displaySize?.w || img.offsetWidth);
    const scaleY = img.naturalHeight / (displaySize?.h || img.offsetHeight);
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
  };

  const extractColorFromCoordinates = (x: number, y: number) => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

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

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const coords = getCoordinatesFromEvent(event);
    if (!coords) return;
    setZoomData(coords);
    if (pixelationMode) {
      updatePixelMatrix(coords.x, coords.y);
    } else {
      setPixelMatrix(null);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
    event.preventDefault();
    const coords = getCoordinatesFromEvent(event);
    if (!coords) return;
    setZoomData(coords);
    if (pixelationMode) {
      updatePixelMatrix(coords.x, coords.y);
    } else {
      setPixelMatrix(null);
    }
  };

  const handleMouseLeave = () => {
    setZoomData(null);
    setPixelMatrix(null);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {

    if (isTouchRef.current) {
      isTouchRef.current = false;
      return;
    }
    const coords = getCoordinatesFromEvent(event);
    if (coords) {
      extractColorFromCoordinates(coords.x, coords.y);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    isTouchRef.current = true;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    event.preventDefault();
    const coords = getCoordinatesFromEvent(event);
    if (coords) {
      extractColorFromCoordinates(coords.x, coords.y);
    }
    isTouchRef.current = false;
    setZoomData(null);
    setPixelMatrix(null);
  };

  const handleTouchCancel = (event: React.TouchEvent<HTMLImageElement>) => {
    event.preventDefault();
    isTouchRef.current = false;
    setZoomData(null);
    setPixelMatrix(null);
  };

  return (
    <Container>
      <ImageWrapper>
        {selectedImage && (
          <>
            <img
              src={selectedImage}
              alt="Uploaded"
              ref={imageRef}
              onLoad={handleImageLoad}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleImageClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              style={{ cursor: 'crosshair' }}
            />
          </>
        )}
        {zoomData && displaySize && pixelMatrix && (
          <PixelWindow pixelMatrix={pixelMatrix} mouse={zoomData} />
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
  width: 100%;
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
    touch-action: manipulation; 
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

const PixelWindow: React.FC<{
  pixelMatrix: string[][];
  mouse: { x: number; y: number };
}> = ({ pixelMatrix, mouse }) => {
  const size = 22;
  const half = Math.floor(pixelMatrix.length / 2);
  const color = pixelMatrix[half]?.[half] || '#ffffff';
  const offsetX = 12;
  const offsetY = 12;

  return (
    <SinglePixelWrapper
      style={{
        left: mouse.x + offsetX,
        top: mouse.y + offsetY,
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
      $color={color}
    />
  );
};

const SinglePixelWrapper = styled.div<{ $color: string }>`
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  border: 2.5px solid #e53935;
  box-shadow: 0 0 0 2px #fff, 0 2px 8px rgba(0,0,0,0.12);
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
`;

const LoadingText = styled.div`
  color: var(--surface-600);
  font-size: 0.875rem;
  font-weight: 500;
`;

export { ImageColorPicker };
