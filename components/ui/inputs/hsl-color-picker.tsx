import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

interface Props {
}

const HSLColorPicker = ({}) => {
  const steps = 25;

  const [hue, setHue] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const generateGrid = () => {
    let grid = [];
    for (let i = 0; i <= steps; i++) {
      let row = [];
      for (let j = 0; j <= steps; j++) {
        row.push({
          color: `hsl(${hue}, ${j * (100 / steps)}%, ${i * (100 / steps)}%)`,
          saturation: j * (100 / steps),
          lightness: i * (100 / steps)
        });
      }
      grid.push(row);
    }
    return grid;
  };

  const generateHueBar = () => {
    let hues = [];
    for (let i = 0; i <= 36; i++) {
      hues.push(`hsl(${i * 10}, 100%, 50%)`);
    }
    return hues;
  };

  const grid = useMemo(() => generateGrid(), [hue]);
  const hueBar = useMemo(() => generateHueBar(), []);

  return (
    <div>
      <h2>Hue Bar</h2>
      <HueBarContainer>
        {hueBar.map((color, index) => (
          <HueBar key={index} $backgroundColor={color} onClick={() => setHue(index * 10)} />
        ))}
      </HueBarContainer>
      
      <h2>HSL Color Grid</h2>
      <GridContainer $steps={steps}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              $backgroundColor={cell.color}
              $isSelected={selectedColor === cell.color}
              onClick={() => setSelectedColor(cell.color)}
              title={`H: ${hue}, S: ${cell.lightness}%, L: ${cell.saturation}%`}
            />
          ))
        )}
      </GridContainer>

      {selectedColor && (
        <SelectedColorDisplay>
          <h3>Selected Color: {selectedColor}</h3>
          <SelectedColorBox $backgroundColor={selectedColor} />
        </SelectedColorDisplay>
      )}
    </div>
  );
};

const HueBarContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const HueBar = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 6px;
  height: 20px;
  cursor: pointer;
`;

const GridContainer = styled.div.attrs<{ $steps: number }>(({ $steps }) => ({
  style: {
    gridTemplateColumns: `repeat(${$steps + 1}, 1fr)`,
  },
}))`
  width: fit-content;
  display: grid;
`;

const GridCell = styled.div.attrs<{ $backgroundColor: string, $isSelected: boolean }>(({ $backgroundColor, $isSelected }) => ({
  style: {
    backgroundColor: $backgroundColor,
    cursor: $isSelected ? 'default' : 'pointer',
  },
}))`
  width: 10px;
  height: 10px;
`;

const SelectedColorDisplay = styled.div`
  margin-top: 20px;
`;

const SelectedColorBox = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

export { HSLColorPicker };
