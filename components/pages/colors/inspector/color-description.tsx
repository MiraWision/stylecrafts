import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Color, parseColorNumbers, getTemperature, getLuminance, ColorFormat, HSL } from '@mirawision/colorize';

import { ColorDescriptionItem } from './color-description-item';

interface Props {
  color: Color;
}

const ColorDescription: React.FC<Props> = ({ color }) => {
  const values = useMemo(() => [
    { label: 'HEX', value: color.hex(), copyable: true },
    { label: 'RGB', value: color.rgb(), copyable: true },
    { label: 'HSL', value: color.hsl(), copyable: true },
  ], [color]);

  const luminance = useMemo(() => getLuminance(color.hex()), [color]);

  const saturation = useMemo(() => {
    const { s } = parseColorNumbers(color.hsl(), ColorFormat.HSL) as HSL;
    return s;
  }, [color]);

  const temperature = useMemo(() => getTemperature(color.hex()), [color]);

  return (
    <Container>
      {values.map(({ label, value, copyable }) => (
        <ColorDescriptionItem key={label} label={label} value={value} copyable={copyable} />
      ))}

      <FullWidthItem>
        <ColorDescriptionItem
          label="Temperature"
          value={`${Math.round(temperature)}K`}
          scaleValue={(temperature - 1000) / 9000}
          scaleGradient={['#FF3800', '#FF6A00', '#FFD700', '#FFF5E1', '#FFFFFF', '#DDEFFF', '#A5C8FF', '#66AEFF', '#5BA9FF']}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Luminance"
          value={`${Math.round(luminance * 100)}%`}
          scaleValue={luminance}
          scaleGradient={['#000000', '#FFFFFF']}
        />
      </FullWidthItem>

      <FullWidthItem>
        <ColorDescriptionItem
          label="Saturation"
          value={`${saturation}%`}
          scaleValue={saturation / 100}
          scaleGradient={['#808080', color.withSaturation(100)]}
        />
      </FullWidthItem>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  align-items: start;
`;

const FullWidthItem = styled.div`
  grid-column: 1 / -1;
`;

export { ColorDescription };
