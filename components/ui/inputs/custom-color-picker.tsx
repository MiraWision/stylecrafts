import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const CustomColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    const { h, s, l } = hexToHsl(color);
    setHue(h);
    setSaturation(s);
    setLightness(l);
  }, [color]);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(Number(e.target.value));
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightness(Number(e.target.value));
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(e.target.value));
  };

  const handleColorChange = () => {
    const hex = hslToHex(hue, saturation, lightness, opacity);
    onChange(hex);
  };

  useEffect(() => {
    // handleColorChange();
  }, [hue, saturation, lightness, opacity]);

  return (
    <ColorPickerContainer>
      <ColorSquare
        $hue={hue}
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const newSaturation = (x / rect.width) * 100;
          const newLightness = 100 - (y / rect.height) * 100;
          setSaturation(newSaturation);
          setLightness(newLightness);
        }}
      />
      <Slider
        min='0'
        max='360'
        value={hue}
        onChange={handleHueChange}
        background='linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
      />
      <Slider
        min='0'
        max='100'
        value={saturation}
        onChange={handleSaturationChange}
        background={`linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`}
      />
      <Slider
        min='0'
        max='100'
        value={lightness}
        onChange={handleLightnessChange}
        background={`linear-gradient(to right, black, hsl(${hue}, ${saturation}%, 50%), white)`}
      />
      <Slider
        min='0'
        max='100'
        value={opacity}
        onChange={handleOpacityChange}
        background={`linear-gradient(to right, hsla(${hue}, ${saturation}%, ${lightness}%, 0), hsla(${hue}, ${saturation}%, ${lightness}%, 1)), url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA0SURBVHgBrY0xCgAgDANTqf7/u7ZCdZIs4tDeliNwMs0DxOjKEw0f8geJAwvzVZzQh7/ZDXaqC/njEno+AAAAAElFTkSuQmCC") repeat`}
      />
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--surface-100);
  border: 1px solid var(--surface-border);
`;

const ColorSquare = styled.div.attrs<{ $hue: number }>(({ $hue }) => ({
  style: {
    background: `linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%), hsl(${$hue}, 100%, 50%)`,
  },
}))`
  width: 100%;
  height: 12rem;
  position: relative;
  cursor: crosshair;
`;

const Slider = styled.input.attrs<{ background: string }>({ type: 'range' })`
  width: 100%;
  margin: 10px 0;
  appearance: none;
  border-radius: 4px;

  &::-webkit-slider-runnable-track {
    height: 8px;
    cursor: pointer;
    background: ${(props) => props.background || 'grey'};
    border-radius: 4px;
  }

  &::-moz-range-track {
    height: 8px;
    cursor: pointer;
    background: ${(props) => props.background || 'grey'};
    border-radius: 4px;
  }

  &::-ms-track {
    height: 8px;
    cursor: pointer;
    background: ${(props) => props.background || 'grey'};
    border-radius: 4px;
    border: none;
  }

  &::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    cursor: pointer;
    appearance: none;
    margin-top: -4px;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const hexToHsl = (hex: string) => {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  let a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a: a * 100 };
};

const hslToHex = (h: number, s: number, l: number, o: number) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (o < 100) {
    const a = Math.round((o / 100) * 255);
    return `${hex}${toHex(a)}`;
  }

  return hex;
};

export { CustomColorPicker };
