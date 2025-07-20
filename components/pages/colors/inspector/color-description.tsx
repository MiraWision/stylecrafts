import React, { useMemo } from 'react';
import { Color, convertColor, ColorFormat } from '@mirawision/colorize';
import { ColorDescriptionItem } from './color-description-item';
import styled from 'styled-components';

interface Props {
  color: Color;
}

const calculateTemperature = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues;
  return Math.round((r + g + b) / 3 * (9000 / 255) + 1000);
};

const calculateLuminosity = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues.map(v => v / 255);
  return Math.round((0.2126 * r + 0.7152 * g + 0.0722 * b) * 100);
};

const calculateSaturation = (color: Color) => {
  return parseFloat(color.hsl().match(/(\d+(\.\d+)?)/g)?.[1] || '0') / 100;
};

const ColorDescription: React.FC<Props> = ({ color }) => {
  const values = useMemo(() => [
    { label: 'HEX', value: color.hex(), copyable: true },
    { label: 'RGB', value: color.rgb(), copyable: true },
    { label: 'HSL', value: color.hsl(), copyable: true },
  ], [color]);

  const luminosity = useMemo(() => calculateLuminosity(color), [color]);
  const saturation = useMemo(() => calculateSaturation(color), [color]);

  return (
    <Container>
      {values.map(({ label, value, copyable }) => (
        <ColorDescriptionItem key={label} label={label} value={value} copyable={copyable} />
      ))}

      <FullWidthItem>
        <ColorDescriptionItem
          label="Temperature"
          value={`${calculateTemperature(color)}K`}
          scaleValue={(calculateTemperature(color) - 1000) / 9000}
          scaleGradient={['#FF4500', '#FFD700', '#FFFFFF', '#ADD8E6', '#1E90FF']}
          singleColumn={true}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Luminosity"
          value={`${luminosity}%`}
          scaleValue={luminosity / 100}
          scaleGradient={['#000000', '#777777', '#FFFFFF']}
          singleColumn={true}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Saturation"
          value={`${Math.round(saturation * 100)}%`}
          scaleValue={saturation}
          scaleGradient={['#808080', color.hex()]}
          singleColumn={true}
        />
      </FullWidthItem>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  align-items: start;
`;

const FullWidthItem = styled.div`
  grid-column: 1 / -1;
`;

export { ColorDescription };
