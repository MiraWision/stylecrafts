import { useEffect, useState } from 'react';
import { ColorPicker } from 'primereact/colorpicker';

import { BaseLayout } from '@/layouts/base-layout';
import { CopyButton } from '@/components/common/copy-button';

function calculateIntermediateColors(startColor: string, endColor: string, steps: number) {
  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  // Interpolate between two values
  const interpolate = (start: number, end: number, step: number, maxSteps: number) => {
    return start + ((end - start) * step / maxSteps);
  };

  let startRGB = hexToRgb(startColor);
  let endRGB = hexToRgb(endColor);
  let colorArray = [];

  for (let step = 0; step <= steps; step++) {
    let r = Math.round(interpolate(startRGB[0], endRGB[0], step, steps));
    let g = Math.round(interpolate(startRGB[1], endRGB[1], step, steps));
    let b = Math.round(interpolate(startRGB[2], endRGB[2], step, steps));
    colorArray.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colorArray;
}

const ColorsMixer = () => {
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#000000');
  const [steps, setSteps] = useState(5);
  const [intermediateColors, setIntermediateColors] = useState<string[]>([]);
  
  useEffect(() => {
    const newColors = calculateIntermediateColors(color1, color2, steps);
    setIntermediateColors(newColors);
  }, [color1, color2, steps]);

  return (
    <BaseLayout>
      <div>
        <ColorPicker value={color1} onChange={(e) => setColor1(`#${e.value}`)} />
        <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} />
        <ColorPicker value={color2} onChange={(e) => setColor2(`#${e.value}`)} />
        <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} />
        <input type="number" value={steps} onChange={(e) => setSteps(e.target.value as unknown as number)} />
      </div>
      <div>
        {intermediateColors.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, height: '50px', width: '50px' }}>
            {color}
            <CopyButton text={color} />
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}

export default ColorsMixer;
