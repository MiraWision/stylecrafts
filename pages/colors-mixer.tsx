import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { BaseLayout } from '@/layouts/base-layout';
import { Header1, Header2 } from '@/components/templates/headers-template';
import { NPMLink } from '@/components/common/npm-link';
import { ColorInput } from '@/components/common/color-input';
import { Label } from '@/components/common/label';
import { ColorsOutput } from '@/components/common/colors-output';

const hexToRgb = (hex: string) => {
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }

  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
};

const calculateIntermediateColors = (startColor: string, endColor: string, steps: number) => {
  const interpolate = (start: number, end: number, step: number, maxSteps: number) => {
    return start + ((end - start) * step / maxSteps);
  };

  const toHex = (colorValue: number): string => {
    const clampedValue = Math.max(0, Math.min(255, colorValue));

    const hex = clampedValue.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
  };

  let startRGB = hexToRgb(startColor);
  let endRGB = hexToRgb(endColor);
  let colorArray = [];

  for (let step = 0; step <= steps; step++) {
    let r = Math.round(interpolate(startRGB[0], endRGB[0], step, steps));
    let g = Math.round(interpolate(startRGB[1], endRGB[1], step, steps));
    let b = Math.round(interpolate(startRGB[2], endRGB[2], step, steps));
    colorArray.push(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
  }

  return colorArray;
};

const Colors = [
  '#FF5733',
  '#3498DB',
  '#8E44AD',
  '#16A085',
  '#F1C40F',
  '#E74C3C',
  '#2ECC71',
  '#D35400',
  '#7F8C8D',
  '#2980B9',
];

const getRandomElements = (arr: any[], count: number) => {
  let shuffled = arr.slice();

  for (let i = 0; i < count; i++) {
    let j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

const [firstColor, secondColor] = getRandomElements(Colors, 2);

const ColorsMixer = () => {
  const [color1, setColor1] = useState<string>(firstColor);
  const [color2, setColor2] = useState<string>(secondColor);
  const [steps, setSteps] = useState<number>(5);
  const [intermediateColors, setIntermediateColors] = useState<string[]>([]);
  
  useEffect(() => {
    const newColors = calculateIntermediateColors(color1, color2, steps + 1);

    setIntermediateColors(newColors);
  }, [color1, color2, steps]);

  const onChangeSteps = ({ value }: InputNumberChangeEvent) => {
    if (!value) {
      return;
    }

    if (value < 1) {
      value = 1;
    }

    if (value > 25) {
      value = 25;
    }

    setSteps(value);
  };

  return (
    <BaseLayout>
      <Header1 centered>Colors Mixer</Header1>
      <Header2 centered>Select 2 Colors and get Intermediate Colors between them</Header2>

      <Grid>
        <div>
          <Label>Color 1</Label>
          <ColorInput value={color1} onChange={setColor1} />

          <Label>Color 2</Label>
          <ColorInput value={color2} onChange={setColor2} />

          <Label>Number of Intermediate Colors (1 - 25)</Label>
          <InputNumberStyled 
            value={steps} 
            onChange={onChangeSteps} 
            showButtons
            min={1}
            max={25}  
          />
        </div>

        <ColorsOutput colors={intermediateColors} />
      </Grid>
      
      <NPMLink 
        text='Need to have color tools like these in you app? Feel free to use our NPM package'
        packageName='@mirawision/colorize'
      />
    </BaseLayout>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  width: 640px;
  margin: 24px auto;
`;

const InputNumberStyled = styled(InputNumber)`
  width: 201px;
`;

export default ColorsMixer;
