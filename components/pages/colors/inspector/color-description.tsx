import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Color, convertColor, ColorFormat } from '@mirawision/colorize';
import { Slider } from 'primereact/slider';

interface Props {
  color: Color;
}

const calculateTemperature = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues;
  const kelvin = (r + g + b) / 3 * (10000 / 255); // Rough approximation
  return Math.round(kelvin);
};

const ColorDescription: React.FC<Props> = ({ color }) => {
  const hex = useMemo(() => color.hex(), [color]);
  const rgb = useMemo(() => color.rgb(), [color]);
  const hsl = useMemo(() => color.hsl(), [color]);
  const temperature = useMemo(() => calculateTemperature(color), [color]);
  const saturation = useMemo(() => parseFloat(color.hsl().match(/(\d+(\.\d+)?)/g)?.[1] || '0'), [color]);

  return (
    <Container>
      <ColorInfo>
        <div><b>HEX:</b> {hex}</div>
        <div><b>RGB:</b> {rgb}</div>
        <div><b>HSL:</b> {hsl}</div>
        <div><b>Temperature:</b> {temperature}K</div>
      </ColorInfo>
      <SaturationContainer>
        <b>Saturation:</b>
        <SaturationBar>
          <Slider value={saturation} min={0} max={100} disabled />
        </SaturationBar>
      </SaturationContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid var(--surface-border);
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 1rem;
`;

const ColorInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  b {
    margin-right: 0.5rem;
  }
`;

const SaturationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SaturationBar = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

export { ColorDescription };
