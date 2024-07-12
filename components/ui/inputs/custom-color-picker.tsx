import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SliderLabel = styled.label`
  min-width: 70px;
`;

const ColorDisplay = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  cursor: crosshair;
`;

const GradientOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    linear-gradient(to top, #000, transparent);
`;

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const parseHexColor = (hex: string) => {
  let r = 0, g = 0, b = 0, a = 1;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 9) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    a = parseInt(hex.slice(7, 9), 16) / 255;
  }
  return { r, g, b, a };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
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
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number) => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const CustomColorPicker: React.FC<ColorPickerProps> = ({ color: initialColor, onChange }) => {
  const [colorState, setColorState] = useState({
    hue: 0,
    saturation: 100,
    lightness: 50,
    opacity: 1,
    hex: '',
  });

  useEffect(() => {
    console.log('initialColor:', initialColor);
    const { r, g, b, a } = parseHexColor(initialColor);
    const { h, s, l } = rgbToHsl(r, g, b);
    setColorState((prevState) => ({
      ...prevState,
      hue: h,
      saturation: s,
      lightness: l,
      opacity: a,
      hex: initialColor,
    }));
  }, [initialColor]);

  useEffect(() => {
    updateColor(colorState.hue, colorState.saturation, colorState.lightness, colorState.opacity);
  }, [colorState.hue, colorState.saturation, colorState.lightness, colorState.opacity]);

  const handleSliderChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorState({
      ...colorState,
      [type]: parseFloat(e.target.value),
    });
  };

  const updateColor = (h: number, s: number, l: number, a: number) => {
    const rgbColor = hslToRgb(h, s / 100, l / 100);
    const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
    const finalColor = a === 1 ? hexColor : `${hexColor}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
    setColorState((prevState) => ({
      ...prevState,
      hex: finalColor,
    }));
    console.log('finalColor:', finalColor);
    onChange(finalColor);
  };

  return (
    <ColorPickerWrapper>
      <SliderWrapper>
        <SliderLabel>Hue:</SliderLabel>
        <input type="range" min="0" max="360" value={colorState.hue} onChange={handleSliderChange('hue')} />
      </SliderWrapper>
      <SliderWrapper>
        <SliderLabel>Saturation:</SliderLabel>
        <input type="range" min="0" max="100" value={colorState.saturation} onChange={handleSliderChange('saturation')} />
      </SliderWrapper>
      <SliderWrapper>
        <SliderLabel>Lightness:</SliderLabel>
        <input type="range" min="0" max="100" value={colorState.lightness} onChange={handleSliderChange('lightness')} />
      </SliderWrapper>
      <SliderWrapper>
        <SliderLabel>Opacity:</SliderLabel>
        <input type="range" min="0" max="1" step="0.01" value={colorState.opacity} onChange={handleSliderChange('opacity')} />
      </SliderWrapper>
      <ColorDisplay style={{ background: `hsl(${colorState.hue}, ${colorState.saturation}%, ${colorState.lightness}%)` }}>
        <GradientOverlay />
      </ColorDisplay>
      <p>Selected Color: {colorState.hex}</p>
    </ColorPickerWrapper>
  );
};

export { CustomColorPicker };
