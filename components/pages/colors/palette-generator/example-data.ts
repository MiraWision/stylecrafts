import { PaletteColor } from './types';

interface PaletteData {
  iconPath?: string;
  name: string;
  colors: PaletteColor[];
}

export const examplePalettes: PaletteData[] = [
  {
    name: 'Modern Business',
    colors: [
      { baseColor: '#1a1a1a', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#2563eb', title: 'Primary', shades: [] },
      { baseColor: '#f59e0b', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Tech Startup',
    colors: [
      { baseColor: '#0f172a', title: 'Background', shades: [] },
      { baseColor: '#f8fafc', title: 'Text', shades: [] },
      { baseColor: '#06b6d4', title: 'Primary', shades: [] },
      { baseColor: '#10b981', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Creative Agency',
    colors: [
      { baseColor: '#2d1b69', title: 'Background', shades: [] },
      { baseColor: '#fafafa', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'E-commerce',
    colors: [
      { baseColor: '#1e293b', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#059669', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Healthcare',
    colors: [
      { baseColor: '#f0f9ff', title: 'Background', shades: [] },
      { baseColor: '#0c4a6e', title: 'Text', shades: [] },
      { baseColor: '#0284c7', title: 'Primary', shades: [] },
      { baseColor: '#16a34a', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Education',
    colors: [
      { baseColor: '#fefce8', title: 'Background', shades: [] },
      { baseColor: '#422006', title: 'Text', shades: [] },
      { baseColor: '#ca8a04', title: 'Primary', shades: [] },
      { baseColor: '#7c3aed', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Finance',
    colors: [
      { baseColor: '#f8fafc', title: 'Background', shades: [] },
      { baseColor: '#1e293b', title: 'Text', shades: [] },
      { baseColor: '#059669', title: 'Primary', shades: [] },
      { baseColor: '#dc2626', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Travel & Tourism',
    colors: [
      { baseColor: '#0f766e', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#f59e0b', title: 'Primary', shades: [] },
      { baseColor: '#ef4444', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Food & Restaurant',
    colors: [
      { baseColor: '#7c2d12', title: 'Background', shades: [] },
      { baseColor: '#fef3c7', title: 'Text', shades: [] },
      { baseColor: '#f97316', title: 'Primary', shades: [] },
      { baseColor: '#84cc16', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Fashion & Beauty',
    colors: [
      { baseColor: '#581c87', title: 'Background', shades: [] },
      { baseColor: '#fdf4ff', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Real Estate',
    colors: [
      { baseColor: '#1e293b', title: 'Background', shades: [] },
      { baseColor: '#f1f5f9', title: 'Text', shades: [] },
      { baseColor: '#0ea5e9', title: 'Primary', shades: [] },
      { baseColor: '#10b981', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Entertainment',
    colors: [
      { baseColor: '#1e1b4b', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
      { baseColor: '#f43f5e', title: 'Accent', shades: [] },
    ]
  }
];
