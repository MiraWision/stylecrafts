import React from 'react';
import styled from 'styled-components';

interface ZoomData {
  x: number;
  y: number;
}

interface ZoomProps {
  zoomData: ZoomData;
  imageUrl: string;
  pixelationMode: boolean;
  pixelMatrix: string[][] | null;
  normalZoomLevel: number;
  displayWidth: number;
  displayHeight: number;
}

const ZOOM_SIZE_PX = 120;

const Zoom: React.FC<ZoomProps> = ({
  zoomData,
  imageUrl,
  pixelationMode,
  pixelMatrix,
  normalZoomLevel,
  displayWidth,
  displayHeight,
}) => {
  const { x, y } = zoomData;
  const circleTop = y + 20;
  const circleLeft = x + 20;

  if (!pixelationMode) {
    const scaledBgWidth = displayWidth * normalZoomLevel;
    const scaledBgHeight = displayHeight * normalZoomLevel;

    const offsetX = ZOOM_SIZE_PX / 2 - x * normalZoomLevel;
    const offsetY = ZOOM_SIZE_PX / 2 - y * normalZoomLevel;

    return (
      <Magnifier
        style={{
          top: circleTop,
          left: circleLeft,
          width: ZOOM_SIZE_PX,
          height: ZOOM_SIZE_PX,
          transform: 'none',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${scaledBgWidth}px ${scaledBgHeight}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      >
        <CenterDot />
      </Magnifier>
    );
  }

  return (
    <Magnifier
      style={{
        top: circleTop,
        left: circleLeft,
        width: ZOOM_SIZE_PX,
        height: ZOOM_SIZE_PX,
        transform: 'none',
      }}
    >
      {pixelMatrix && (
        <PixelGrid>
          {pixelMatrix.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((color, colIndex) => {
                const isCenter =
                  rowIndex === Math.floor(pixelMatrix.length / 2) &&
                  colIndex === Math.floor(pixelMatrix[0].length / 2);
                return (
                  <Cell
                    key={colIndex}
                    style={{ backgroundColor: color }}
                    isCenter={isCenter}
                  />
                );
              })}
            </Row>
          ))}
        </PixelGrid>
      )}
    </Magnifier>
  );
};

const Magnifier = styled.div`
  position: absolute;
  pointer-events: none;
  border: 2px solid #999;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  background-repeat: no-repeat;
  background-color: #fff;
`;

const CenterDot = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: red;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PixelGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
`;

const Cell = styled.div<{ isCenter?: boolean }>`
  flex: 1;
  border: 1px solid #000;
  ${({ isCenter }) =>
    isCenter &&
    `
      box-shadow: inset 0 0 0 2px red;
    `}
`;

export { Zoom };