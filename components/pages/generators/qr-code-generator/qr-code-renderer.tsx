import React, { useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { CellShape, EyeShape, Settings } from './types';
import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { DownloadIcon } from '@/components/icons/download';
import { BaseTextButton } from '@/components/ui/text-buttons/base-text-button';

const QRCodeSize = 256;
const PaddingSize = 16;
const LogoSizePercentage = 0.36;

interface Radii {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

interface CellParams {
  x: number;
  y: number;
  width: number;
  height: number;
  radii: Radii;
}

interface Props {
  qrMatrix: number[][];
  settings: Settings;
  logo?: string;
}

// TODO: Render logo based on settings
// TODO: Add save as JPEG and save as SVG functionality

const QRCodeRenderer: React.FC<Props> = ({ qrMatrix, settings, logo }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  const cellSize = useMemo(() => QRCodeSize / qrMatrix.length, [qrMatrix.length]);

  const smallCornerRadii = useMemo(() => cellSize * 0.25, [cellSize]);

  const fullCornerRadii = useMemo(() => cellSize * 0.5, [cellSize]);

  const eyeCellCount = useMemo(() => {
    const index = qrMatrix[0]?.findIndex((cell) => cell === 0);

    return index;
  }, [qrMatrix.length]);

  const logoPosition = useMemo(() => {
    const cellCount = Math.floor(QRCodeSize * LogoSizePercentage / cellSize);

    return {
      cellCount,
      size: cellCount * cellSize,
      x: Math.floor((qrMatrix.length - cellCount) / 2) * cellSize,
      y: Math.floor((qrMatrix.length - cellCount) / 2) * cellSize,
    };
  }, [cellSize]);

  const calculateCellParams = (rowIndex: number, colIndex: number): CellParams => {
    const x = colIndex * cellSize + PaddingSize;
    const y = rowIndex * cellSize + PaddingSize;

    const params: CellParams = {
      x,
      y,
      width: cellSize,
      height: cellSize,
      radii: {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0,
      },
    };

    const isEmptyNeighbour = (row: number, col: number, direction: 'top' | 'right' | 'bottom' | 'left') => {
      switch (direction) {
        case 'top':
          return row === 0 || !qrMatrix[row - 1][col];

        case 'right':
          return col === qrMatrix.length - 1 || !qrMatrix[row][col + 1];

        case 'bottom':
          return row === qrMatrix.length - 1 || !qrMatrix[row + 1][col];

        case 'left':
          return col === 0 || !qrMatrix[row][col - 1];

        default:
          return false;
      }
    }

    const neighbours = {
      top: !isEmptyNeighbour(rowIndex, colIndex, 'top'),
      right: !isEmptyNeighbour(rowIndex, colIndex, 'right'),
      bottom: !isEmptyNeighbour(rowIndex, colIndex, 'bottom'),
      left: !isEmptyNeighbour(rowIndex, colIndex, 'left'),
    };

    switch (settings.cellShape) {
      case CellShape.Square:
        break;

      case CellShape.RoundedSquareSlight:
        params.radii = {
          topLeft: (!neighbours.top && !neighbours.left) ? smallCornerRadii : 0,
          topRight: (!neighbours.top && !neighbours.right) ? smallCornerRadii : 0,
          bottomRight: (!neighbours.bottom && !neighbours.right) ? smallCornerRadii : 0,
          bottomLeft: (!neighbours.bottom && !neighbours.left) ? smallCornerRadii : 0,
        };
        break;

      case CellShape.RoundedSquareFull:
        params.radii = {
          topLeft: (!neighbours.top && !neighbours.left) ? fullCornerRadii : 0,
          topRight: (!neighbours.top && !neighbours.right) ? fullCornerRadii : 0,
          bottomRight: (!neighbours.bottom && !neighbours.right) ? fullCornerRadii : 0,
          bottomLeft: (!neighbours.bottom && !neighbours.left) ? fullCornerRadii : 0,
        };
        break;

      case CellShape.Circle:
        params.radii = {
          topLeft: fullCornerRadii,
          topRight: fullCornerRadii,
          bottomRight: fullCornerRadii,
          bottomLeft: fullCornerRadii,
        };
        break;

      case CellShape.RoundedTopLeftBottomRight:
        params.radii = {
          topLeft: (!neighbours.top && !neighbours.left) ? fullCornerRadii : 0,
          topRight: 0,
          bottomRight: (!neighbours.bottom && !neighbours.right) ? fullCornerRadii : 0,
          bottomLeft: 0,
        };
        break;

      case CellShape.RoundedTopRightBottomLeft:
        params.radii = {
          topLeft: 0,
          topRight: (!neighbours.top && !neighbours.right) ? fullCornerRadii : 0,
          bottomRight: 0,
          bottomLeft: (!neighbours.bottom && !neighbours.left) ? fullCornerRadii : 0,
        };
        break;

      case CellShape.VerticalLines:
        params.x += cellSize * 0.05;
        params.width -= cellSize * 0.1;

        params.radii = {
          topLeft: !neighbours.top ? fullCornerRadii : 0,
          topRight: !neighbours.top ? fullCornerRadii : 0,
          bottomRight: !neighbours.bottom ? fullCornerRadii : 0,
          bottomLeft: !neighbours.bottom ? fullCornerRadii : 0,
        };
        break;

      case CellShape.HorizontalLines:
        params.y += cellSize * 0.05;
        params.height -= cellSize * 0.1;

        params.radii = {
          topLeft: !neighbours.left ? fullCornerRadii : 0,
          topRight: !neighbours.right ? fullCornerRadii : 0,
          bottomRight: !neighbours.right ? fullCornerRadii : 0,
          bottomLeft: !neighbours.left ? fullCornerRadii : 0,
        };
        break;

      default:
        break;

    }

    return params;
  }

  const isEyeCell = (rowIndex: number, colIndex: number) => {
    return (
      (rowIndex < eyeCellCount && colIndex < eyeCellCount) ||
      (rowIndex < eyeCellCount && colIndex >= qrMatrix.length - eyeCellCount) ||
      (rowIndex >= qrMatrix.length - eyeCellCount && colIndex < eyeCellCount)
    );
  }

  const isLogoCell = (rowIndex: number, colIndex: number) => {
    return (
      rowIndex >= logoPosition.y / cellSize &&
      rowIndex < (logoPosition.y + logoPosition.size) / cellSize &&
      colIndex >= logoPosition.x / cellSize &&
      colIndex < (logoPosition.x + logoPosition.size) / cellSize
    );
  }
    
  const generatePath = (cellParams: CellParams) => {
    const { x, y, width, height, radii } = cellParams;
    const { topLeft, topRight, bottomRight, bottomLeft } = radii;

    return `
      M ${x + topLeft}, ${y}
      L ${x + width - topRight}, ${y}
      A ${topRight},${topRight} 0 0 1 ${x + width}, ${y + topRight}
      L ${x + width}, ${y + height - bottomRight}
      A ${bottomRight},${bottomRight} 0 0 1 ${x + width - bottomRight}, ${y + height}
      L ${x + bottomLeft}, ${y + height}
      A ${bottomLeft},${bottomLeft} 0 0 1 ${x}, ${y + height - bottomLeft}
      L ${x}, ${y + topLeft}
      A ${topLeft},${topLeft} 0 0 1 ${x + topLeft}, ${y}
      Z
    `;
  };

  const renderEyes = () => {
    if (qrMatrix.length <= 0) return null;

    const positions = [
      { x: 0, y: 0 },
      { x: qrMatrix.length - eyeCellCount, y: 0 },
      { x: 0, y: qrMatrix.length - eyeCellCount },
    ];

    switch (settings.eyeShape) {
      case EyeShape.Square:
        return positions.map(({ x, y}) => (
          <>
            <rect
              x={x * cellSize + PaddingSize}
              y={y * cellSize + PaddingSize}
              width={eyeCellCount * cellSize}
              height={eyeCellCount * cellSize}
              fill={settings.foregroundColor}
            />
            <rect
              x={x * cellSize + PaddingSize + cellSize}
              y={y * cellSize + PaddingSize + cellSize}
              width={eyeCellCount * cellSize - cellSize * 2}
              height={eyeCellCount * cellSize - cellSize * 2}
              fill={settings.backgroundColor}
            />
            <rect
              x={x * cellSize + PaddingSize + cellSize * 2}
              y={y * cellSize + PaddingSize + cellSize * 2}
              width={eyeCellCount * cellSize - cellSize * 4}
              height={eyeCellCount * cellSize - cellSize * 4}
              fill={settings.foregroundColor}
            />
          </>
        ));

      case EyeShape.RoundedSquare:
        return positions.map(({ x, y }) => (
          <>
            <rect
              x={x * cellSize + PaddingSize}
              y={y * cellSize + PaddingSize}
              width={eyeCellCount * cellSize}
              height={eyeCellCount * cellSize}
              fill={settings.foregroundColor}
              rx={fullCornerRadii * 3}
              ry={fullCornerRadii * 3}
            />
            <rect
              x={x * cellSize + PaddingSize + cellSize}
              y={y * cellSize + PaddingSize + cellSize}
              width={eyeCellCount * cellSize - cellSize * 2}
              height={eyeCellCount * cellSize - cellSize * 2}
              fill={settings.backgroundColor}
              rx={fullCornerRadii * 2}
              ry={fullCornerRadii * 2}
            />
            <rect
              x={x * cellSize + PaddingSize + cellSize * 2}
              y={y * cellSize + PaddingSize + cellSize * 2}
              width={eyeCellCount * cellSize - cellSize * 4}
              height={eyeCellCount * cellSize - cellSize * 4}
              fill={settings.foregroundColor}
              rx={fullCornerRadii}
              ry={fullCornerRadii}
            />
          </>
        ));
      
      case EyeShape.Circle:
        return positions.map(({ x, y }) => (
          <>
            <circle
              cx={(x + eyeCellCount / 2) * cellSize + PaddingSize}
              cy={(y + eyeCellCount / 2) * cellSize + PaddingSize}
              r={eyeCellCount * cellSize / 2}
              fill={settings.foregroundColor}
            />
            <circle
              cx={(x + eyeCellCount / 2) * cellSize + PaddingSize}
              cy={(y + eyeCellCount / 2) * cellSize + PaddingSize}
              r={eyeCellCount * cellSize / 2 - cellSize}
              fill={settings.backgroundColor}
            />
            <circle
              cx={(x + eyeCellCount / 2) * cellSize + PaddingSize}
              cy={(y + eyeCellCount / 2) * cellSize + PaddingSize}
              r={eyeCellCount * cellSize / 2 - cellSize * 2}
              fill={settings.foregroundColor}
            /> 
          </>
        ));

      case EyeShape.Drop:
        return (
          <> 
            {positions.map(({ x, y }) => (
              <>
                <rect
                  x={x * cellSize + PaddingSize}
                  y={y * cellSize + PaddingSize}
                  width={eyeCellCount * cellSize}
                  height={eyeCellCount * cellSize}
                  fill={settings.foregroundColor}
                  rx={fullCornerRadii * 3}
                  ry={fullCornerRadii * 3}
                />
                <rect
                  x={x * cellSize + PaddingSize + cellSize}
                  y={y * cellSize + PaddingSize + cellSize}
                  width={eyeCellCount * cellSize - cellSize * 2}
                  height={eyeCellCount * cellSize - cellSize * 2}
                  fill={settings.backgroundColor}
                  rx={fullCornerRadii * 2}
                  ry={fullCornerRadii * 2}
                />
                <rect
                  x={x * cellSize + PaddingSize + cellSize * 2}
                  y={y * cellSize + PaddingSize + cellSize * 2}
                  width={eyeCellCount * cellSize - cellSize * 4}
                  height={eyeCellCount * cellSize - cellSize * 4}
                  fill={settings.foregroundColor}
                  rx={fullCornerRadii}
                  ry={fullCornerRadii}
                />
              </>
            ))}
            {[
              { x: eyeCellCount - 1.3, y: eyeCellCount - 1.3},
              { x: eyeCellCount - 1.3, y: qrMatrix.length - eyeCellCount},
              { x: qrMatrix.length - eyeCellCount, y: eyeCellCount - 1.3},
            ].map(({ x, y }) => (
              <rect
                x={x * cellSize + PaddingSize}
                y={y * cellSize + PaddingSize}
                width={cellSize * 1.3}
                height={cellSize * 1.3}
                fill={settings.foregroundColor}
              />
            ))}
          </>
        );

      default:
        return null;
    }
  };

  const onSaveJPEG = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);

    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      canvas.width = QRCodeSize + PaddingSize * 2;

      canvas.height = QRCodeSize + PaddingSize * 2;

      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');

      a.href = canvas.toDataURL('image/jpeg');

      a.download = 'qr-code.jpeg';

      a.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const onSaveSVG = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);

    const a = document.createElement('a');

    a.href = `data:image/svg+xml;base64,${btoa(svgData)}`;

    a.download = 'qr-code.svg';

    a.click();
  };

  const renderPlaceholder = () => {
    const Config = {
      TotalCellCount: 25,
      EyeCellCount: 7,
      CellSize: QRCodeSize / 25,
      CornerRadius: QRCodeSize / 100,
      ForegroundColor: '#d1d5db',
      BackgroundColor: '#ffffff',
    };

    const positions = [
      { x: 0, y: 0 },
      { x: Config.TotalCellCount - Config.EyeCellCount, y: 0 },
      { x: 0, y: Config.TotalCellCount - Config.EyeCellCount },
    ];

    const matrix = Array.from({ length: Config.TotalCellCount }, () => Array.from({ length: Config.TotalCellCount }, () => 1));

    for (let i = 0; i < Config.TotalCellCount; i++) {
      for (let j = 0; j < Config.TotalCellCount; j++) {
        if ((i <= Config.EyeCellCount && j <= Config.EyeCellCount)
          || (i <= Config.EyeCellCount && j >= Config.TotalCellCount - Config.EyeCellCount - 1)
          || (i >= Config.TotalCellCount - Config.EyeCellCount - 1 && j <= Config.EyeCellCount)) {
          matrix[i][j] = 0;
        }
      }
    }

    return (
      <Container>
        <SVG
          ref={svgRef}
          width={QRCodeSize + PaddingSize * 2}
          height={QRCodeSize + PaddingSize * 2}
        >
          <rect
            x={0}
            y={0}
            width={QRCodeSize + PaddingSize * 2}
            height={QRCodeSize + PaddingSize * 2}
            fill={Config.BackgroundColor}
          />

          {positions.map(({ x, y }) => (
            <>
              <rect
                x={x * Config.CellSize + PaddingSize}
                y={y * Config.CellSize + PaddingSize}
                width={Config.EyeCellCount * Config.CellSize}
                height={Config.EyeCellCount * Config.CellSize}
                fill={Config.ForegroundColor}
                rx={Config.CornerRadius * 3}
                ry={Config.CornerRadius * 3}
              />
              <rect
                x={x * Config.CellSize + PaddingSize + Config.CellSize}
                y={y * Config.CellSize + PaddingSize + Config.CellSize}
                width={Config.EyeCellCount * Config.CellSize - Config.CellSize * 2}
                height={Config.EyeCellCount * Config.CellSize - Config.CellSize * 2}
                fill={Config.BackgroundColor}
                rx={Config.CornerRadius * 2}
                ry={Config.CornerRadius * 2}
              />
              <rect
                x={x * Config.CellSize + PaddingSize + Config.CellSize * 2}
                y={y * Config.CellSize + PaddingSize + Config.CellSize * 2}
                width={Config.EyeCellCount * Config.CellSize - Config.CellSize * 4}
                height={Config.EyeCellCount * Config.CellSize - Config.CellSize * 4}
                fill={Config.ForegroundColor}
                rx={Config.CornerRadius}
                ry={Config.CornerRadius}
              />
            </>
          ))}

          {matrix.map((row, rowIndex) => row.map((cell, colIndex) => cell !== 0 && (
            <PlaceholderRect
              key={`${rowIndex}-${colIndex}`}
              delay={Math.random() * 10}
              x={colIndex * Config.CellSize + PaddingSize}
              y={rowIndex * Config.CellSize + PaddingSize}
              width={Config.CellSize}
              height={Config.CellSize}
              fill={cell ? Config.ForegroundColor : Config.BackgroundColor}
              rx={Config.CornerRadius}
              ry={Config.CornerRadius}
            />
          )))}
        </SVG>
      </Container>
    );
  };

  if (qrMatrix.length <= 0) return renderPlaceholder();

  return (
    <Container>
      <SVG
        ref={svgRef}
        width={QRCodeSize + PaddingSize * 2}
        height={QRCodeSize + PaddingSize * 2}
      >
        <rect
          x={0}
          y={0}
          width={QRCodeSize + PaddingSize * 2}
          height={QRCodeSize + PaddingSize * 2}
          fill={settings.backgroundColor}
        />

        {logo && (
          <g>
            <rect
              x={logoPosition.x + PaddingSize}
              y={logoPosition.y + PaddingSize}
              width={logoPosition.size}
              height={logoPosition.size}
              fill={settings.backgroundColor}
            />
            <image
              href={logo}
              x={logoPosition.x + PaddingSize * 1.5}
              y={logoPosition.y + PaddingSize * 1.5}
              width={logoPosition.size - PaddingSize}
              height={logoPosition.size - PaddingSize}
              preserveAspectRatio='xMidYMid meet'
            />
          </g>
        )}

        {qrMatrix.map((row, rowIndex) => row.map((cell, colIndex) => {
          if (!cell) return null;

          if (isEyeCell(rowIndex, colIndex)) return null;

          if (logo && isLogoCell(rowIndex, colIndex)) return null;

          const cellParams = calculateCellParams(rowIndex, colIndex);

          const pathData = generatePath(cellParams);

          return (
            <path key={`${rowIndex}-${colIndex}`} d={pathData} fill={settings.foregroundColor} />
          );
        }))}

        {renderEyes()}
      </SVG>

      <SaveButtons>
        <BaseTextButton
          text='Save as JPEG'
          icon={<DownloadIcon width='24' height='24' />}
          isPrimary
          onClick={() => {
            onSaveJPEG();
            GAService.logEvent(analyticsEvents.generators.qrCode.downloadJPEG());
          }}
        />

        <BaseTextButton
          text='Save as SVG'
          icon={<DownloadIcon width='24' height='24' />}
          isPrimary
          onClick={() => {
            onSaveSVG();
            GAService.logEvent(analyticsEvents.generators.qrCode.downloadSVG());
          }}
        />
      </SaveButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SVG = styled.svg`
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--surface-border);
`;

const SaveButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const randomOpacityAnimation = keyframes`
  0% { opacity: 1; }
  30% { opacity: 0.2; }
  70% { opacity: 0.2; }
  100% { opacity: 1; }
`;

const PlaceholderRect = styled.rect.attrs<{ delay: number }>(({ delay }) => ({
  style: {
    animationDelay: `${delay}s`,
  }
}))`
  animation: ${randomOpacityAnimation} 3s infinite;
`;
  

export { QRCodeRenderer };
