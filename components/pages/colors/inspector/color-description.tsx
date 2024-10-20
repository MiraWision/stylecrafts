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
  const kelvin = (r + g + b) / 3 * (10000 / 255);
  return Math.round(kelvin);
};

const calculateLuminosity = (color: Color) => {
  const rgb = convertColor(color.hex(), ColorFormat.RGB);
  const rgbValues = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgbValues;
  return Math.max(r, g, b) / 255;
};

const ColorDescription: React.FC<Props> = ({ color }) => {
  const hex = useMemo(() => color.hex(), [color]);
  const rgb = useMemo(() => color.rgb(), [color]);
  const hsl = useMemo(() => color.hsl(), [color]);
  const temperature = useMemo(() => calculateTemperature(color), [color]);
  const luminosity = useMemo(() => calculateLuminosity(color), [color]);
  const saturation = useMemo(() => parseFloat(color.hsl().match(/(\d+(\.\d+)?)/g)?.[1] || '0'), [color]);

  return (
    <Container>
      <ColorInfo>
        <div><b>HEX:</b> {hex}</div>
        <div><b>RGB:</b> {rgb}</div>
        <div><b>HSL:</b> {hsl}</div>
        <div><b>Temperature:</b> {temperature}K</div>
      </ColorInfo>

      <ScaleContainer>
        <b>Luminosity:</b>
        <ScaleBar>
          <LuminosityScale>
            <ScaleGradient startColor="#ffffff" endColor="#000000" />
            <Indicator position={luminosity} />
          </LuminosityScale>
        </ScaleBar>
      </ScaleContainer>

      <ScaleContainer>
        <b>Temperature:</b>
        <ScaleBar>
          <TemperatureScale>
            <ScaleGradient startColor="#ff4500" endColor="#00bfff" />
            <Indicator position={(temperature - 2000) / (10000 - 2000)} />
          </TemperatureScale>
        </ScaleBar>
      </ScaleContainer>

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

const ScaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const ScaleBar = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

const LuminosityScale = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const TemperatureScale = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const ScaleGradient = styled.div<{ startColor: string, endColor: string }>`
  background: linear-gradient(to right, ${({ startColor }) => startColor}, ${({ endColor }) => endColor});
  width: 100%;
  height: 100%;
`;

const Indicator = styled.div<{ position: number }>`
  position: absolute;
  top: -5px;
  left: ${({ position }) => position * 100}%;
  width: 10px;
  height: 30px;
  background-color: cyan;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
