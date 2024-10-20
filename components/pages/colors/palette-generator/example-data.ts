import { PaletteColor } from './types';

interface PaletteData {
  iconPath?: string;
  name: string;
  colors: PaletteColor[];
}

export const examplePalettes: PaletteData[] = [
  // Bridgerton houses (House Featherington)
  {
    name: 'House Featherington',
    iconPath: '/icons/bridgerton.svg',
    colors: [
      { baseColor: '#d4af37', title: 'Background', shades: [{ shade: 50, hex: '#e0b955' }, { shade: -50, hex: '#c29b2f' }] },
      { baseColor: '#3c2f2f', title: 'Text', shades: [{ shade: 50, hex: '#504848' }, { shade: -50, hex: '#2a1c1c' }] },
      { baseColor: '#a67c00', title: 'Primary', shades: [{ shade: 50, hex: '#b98d12' }, { shade: -50, hex: '#946800' }] },
      { baseColor: '#7d3f00', title: 'Additional', shades: [{ shade: 50, hex: '#915000' }, { shade: -50, hex: '#652800' }] },
    ]
  },
  // Bridgerton houses (House Bridgerton)
  {
    name: 'House Bridgerton',
    iconPath: '/icons/bridgerton.svg',
    colors: [
      { baseColor: '#5b92e5', title: 'Background', shades: [{ shade: 50, hex: '#6da4f1' }, { shade: -50, hex: '#4a80d3' }] },
      { baseColor: '#ffffff', title: 'Text', shades: [{ shade: 50, hex: '#f2f2f2' }, { shade: -50, hex: '#e5e5e5' }] },
      { baseColor: '#1d3557', title: 'Primary', shades: [{ shade: 50, hex: '#2d466e' }, { shade: -50, hex: '#162847' }] },
      { baseColor: '#a8dadc', title: 'Additional', shades: [{ shade: 50, hex: '#b9e2e3' }, { shade: -50, hex: '#96c7ca' }] },
    ]
  },
  // Twilight Saga (Cullen family)
  {
    name: 'Cullen Family',
    iconPath: '/icons/twilight.svg',
    colors: [
      { baseColor: '#d7ccc8', title: 'Background', shades: [{ shade: 50, hex: '#e1d4d1' }, { shade: -50, hex: '#c7b6b3' }] },
      { baseColor: '#4e342e', title: 'Text', shades: [{ shade: 50, hex: '#6e5049' }, { shade: -50, hex: '#3e241f' }] },
      { baseColor: '#8d6e63', title: 'Primary', shades: [{ shade: 50, hex: '#a98f82' }, { shade: -50, hex: '#73554d' }] },
      { baseColor: '#263238', title: 'Additional', shades: [{ shade: 50, hex: '#37474f' }, { shade: -50, hex: '#1a2326' }] },
    ]
  },
  // Twilight Saga (Volturi)
  {
    name: 'Volturi',
    iconPath: '/icons/twilight.svg',
    colors: [
      { baseColor: '#0d0d0d', title: 'Background', shades: [{ shade: 50, hex: '#262626' }, { shade: -50, hex: '#000000' }] },
      { baseColor: '#ffcc00', title: 'Text', shades: [{ shade: 50, hex: '#ffd633' }, { shade: -50, hex: '#cca300' }] },
      { baseColor: '#990000', title: 'Primary', shades: [{ shade: 50, hex: '#b20000' }, { shade: -50, hex: '#730000' }] },
      { baseColor: '#660000', title: 'Additional', shades: [{ shade: 50, hex: '#800000' }, { shade: -50, hex: '#520000' }] },
    ]
  },
  // Halloween 1
  {
    name: 'Halloween Dark',
    iconPath: '/icons/halloween.svg',
    colors: [
      { baseColor: '#ff7518', title: 'Background', shades: [{ shade: 50, hex: '#ff8333' }, { shade: -50, hex: '#e65e00' }] },
      { baseColor: '#1a1a1a', title: 'Text', shades: [{ shade: 50, hex: '#333333' }, { shade: -50, hex: '#000000' }] },
      { baseColor: '#ff0000', title: 'Primary', shades: [{ shade: 50, hex: '#ff3333' }, { shade: -50, hex: '#cc0000' }] },
      { baseColor: '#ffff00', title: 'Additional', shades: [{ shade: 50, hex: '#ffff33' }, { shade: -50, hex: '#cccc00' }] },
    ]
  },
  // Halloween 2
  {
    name: 'Halloween Light',
    iconPath: '/icons/halloween.svg',
    colors: [
      { baseColor: '#fca503', title: 'Background', shades: [{ shade: 50, hex: '#feb623' }, { shade: -50, hex: '#e89202' }] },
      { baseColor: '#5c5c5c', title: 'Text', shades: [{ shade: 50, hex: '#747474' }, { shade: -50, hex: '#464646' }] },
      { baseColor: '#ff6f61', title: 'Primary', shades: [{ shade: 50, hex: '#ff8474' }, { shade: -50, hex: '#e55e53' }] },
      { baseColor: '#fdf3c1', title: 'Additional', shades: [{ shade: 50, hex: '#fdf7d1' }, { shade: -50, hex: '#e5dcb3' }] },
    ]
  },
  // Christmas (Traditional)
  {
    name: 'Christmas (Traditional)',
    iconPath: '/icons/christmas.svg',
    colors: [
      { baseColor: '#008000', title: 'Background', shades: [{ shade: 50, hex: '#00a000' }, { shade: -50, hex: '#006000' }] },
      { baseColor: '#ff0000', title: 'Text', shades: [{ shade: 50, hex: '#ff3333' }, { shade: -50, hex: '#cc0000' }] },
      { baseColor: '#ffffff', title: 'Primary', shades: [{ shade: 50, hex: '#f2f2f2' }, { shade: -50, hex: '#e5e5e5' }] },
      { baseColor: '#d4af37', title: 'Additional', shades: [{ shade: 50, hex: '#e0b955' }, { shade: -50, hex: '#c29b2f' }] },
    ]
  },
  // Christmas (Modern)
  {
    name: 'Christmas (Modern)',
    iconPath: '/icons/christmas.svg',
    colors: [
      { baseColor: '#b22222', title: 'Background', shades: [{ shade: 50, hex: '#c23434' }, { shade: -50, hex: '#a11111' }] },
      { baseColor: '#228b22', title: 'Text', shades: [{ shade: 50, hex: '#2ba92b' }, { shade: -50, hex: '#1a761a' }] },
      { baseColor: '#ffffff', title: 'Primary', shades: [{ shade: 50, hex: '#f2f2f2' }, { shade: -50, hex: '#e5e5e5' }] },
      { baseColor: '#dcdcdc', title: 'Additional', shades: [{ shade: 50, hex: '#ededed' }, { shade: -50, hex: '#cbcbcb' }] },
    ]
  },
  // Harry Potter (Gryffindor)
  {
    name: 'Gryffindor',
    iconPath: '/icons/harry-potter.svg',
    colors: [
      { baseColor: '#7f0909', title: 'Background', shades: [{ shade: 50, hex: '#941010' }, { shade: -50, hex: '#680606' }] },
      { baseColor: '#d4af37', title: 'Text', shades: [{ shade: 50, hex: '#e0b955' }, { shade: -50, hex: '#c29b2f' }] },
      { baseColor: '#ffcc00', title: 'Primary', shades: [{ shade: 50, hex: '#ffd633' }, { shade: -50, hex: '#cca300' }] },
      { baseColor: '#000000', title: 'Additional', shades: [{ shade: 50, hex: '#333333' }, { shade: -50, hex: '#000000' }] },
    ]
  },
  // Harry Potter (Slytherin)
  {
    name: 'Slytherin',
    iconPath: '/icons/harry-potter.svg',
    colors: [
      { baseColor: '#1a472a', title: 'Background', shades: [{ shade: 50, hex: '#255e3b' }, { shade: -50, hex: '#113a1a' }] },
      { baseColor: '#aaaaaa', title: 'Text', shades: [{ shade: 50, hex: '#cccccc' }, { shade: -50, hex: '#888888' }] },
      { baseColor: '#2a623d', title: 'Primary', shades: [{ shade: 50, hex: '#367a4f' }, { shade: -50, hex: '#205026' }] },
      { baseColor: '#5d5d5d', title: 'Additional', shades: [{ shade: 50, hex: '#747474' }, { shade: -50, hex: '#474747' }] },
    ]
  },
  // Harry Potter (Hufflepuff)
  {
    name: 'Hufflepuff',
    iconPath: '/icons/harry-potter.svg',
    colors: [
      { baseColor: '#f0c75e', title: 'Background', shades: [{ shade: 50, hex: '#f3d589' }, { shade: -50, hex: '#e2b645' }] },
      { baseColor: '#000000', title: 'Text', shades: [{ shade: 50, hex: '#333333' }, { shade: -50, hex: '#000000' }] },
      { baseColor: '#ffffff', title: 'Primary', shades: [{ shade: 50, hex: '#f2f2f2' }, { shade: -50, hex: '#e5e5e5' }] },
      { baseColor: '#a67c00', title: 'Additional', shades: [{ shade: 50, hex: '#b98d12' }, { shade: -50, hex: '#946800' }] },
    ]
  },
  // Harry Potter (Ravenclaw)
  {
    name: 'Ravenclaw',
    iconPath: '/icons/harry-potter.svg',
    colors: [
      { baseColor: '#0e1a40', title: 'Background', shades: [{ shade: 50, hex: '#132555' }, { shade: -50, hex: '#09112b' }] },
      { baseColor: '#946b2d', title: 'Text', shades: [{ shade: 50, hex: '#b48347' }, { shade: -50, hex: '#78511d' }] },
      { baseColor: '#5d5d5d', title: 'Primary', shades: [{ shade: 50, hex: '#747474' }, { shade: -50, hex: '#474747' }] },
      { baseColor: '#f0e68c', title: 'Additional', shades: [{ shade: 50, hex: '#f2e8aa' }, { shade: -50, hex: '#d9cb7a' }] },
    ]
  },
];
