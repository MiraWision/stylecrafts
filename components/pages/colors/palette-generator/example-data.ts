import { PaletteColor } from './types';

interface PaletteData {
  iconPath?: string;
  name: string;
  colors: PaletteColor[];
}

export const examplePalettes: PaletteData[] = [
  // Business & Professional
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
  },

  // Seasons
  {
    name: 'Spring Bloom',
    colors: [
      { baseColor: '#f0fdf4', title: 'Background', shades: [] },
      { baseColor: '#14532d', title: 'Text', shades: [] },
      { baseColor: '#22c55e', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Summer Sunset',
    colors: [
      { baseColor: '#fef3c7', title: 'Background', shades: [] },
      { baseColor: '#92400e', title: 'Text', shades: [] },
      { baseColor: '#f97316', title: 'Primary', shades: [] },
      { baseColor: '#ec4899', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Autumn Leaves',
    colors: [
      { baseColor: '#fef2f2', title: 'Background', shades: [] },
      { baseColor: '#7f1d1d', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#f59e0b', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Winter Frost',
    colors: [
      { baseColor: '#f8fafc', title: 'Background', shades: [] },
      { baseColor: '#1e293b', title: 'Text', shades: [] },
      { baseColor: '#0ea5e9', title: 'Primary', shades: [] },
      { baseColor: '#8b5cf6', title: 'Accent', shades: [] },
    ]
  },

  // Holidays
  {
    name: 'Christmas Joy',
    colors: [
      { baseColor: '#dc2626', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#059669', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Halloween Night',
    colors: [
      { baseColor: '#1e1b4b', title: 'Background', shades: [] },
      { baseColor: '#fbbf24', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#8b5cf6', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Valentine Love',
    colors: [
      { baseColor: '#fdf2f8', title: 'Background', shades: [] },
      { baseColor: '#831843', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#f43f5e', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Easter Pastels',
    colors: [
      { baseColor: '#fef3c7', title: 'Background', shades: [] },
      { baseColor: '#92400e', title: 'Text', shades: [] },
      { baseColor: '#a3e635', title: 'Primary', shades: [] },
      { baseColor: '#f0abfc', title: 'Accent', shades: [] },
    ]
  },

  // Movies & TV Shows
  {
    name: 'Bridgerton Regency',
    colors: [
      { baseColor: '#fdf4ff', title: 'Background', shades: [] },
      { baseColor: '#581c87', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Bridgerton Romance',
    colors: [
      { baseColor: '#fef2f2', title: 'Background', shades: [] },
      { baseColor: '#7f1d1d', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#f59e0b', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Bridgerton Elegance',
    colors: [
      { baseColor: '#f8fafc', title: 'Background', shades: [] },
      { baseColor: '#1e293b', title: 'Text', shades: [] },
      { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
      { baseColor: '#10b981', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Twilight Mystique',
    colors: [
      { baseColor: '#0f172a', title: 'Background', shades: [] },
      { baseColor: '#e2e8f0', title: 'Text', shades: [] },
      { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
      { baseColor: '#06b6d4', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Harry Potter Magic',
    colors: [
      { baseColor: '#1e293b', title: 'Background', shades: [] },
      { baseColor: '#fbbf24', title: 'Text', shades: [] },
      { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
      { baseColor: '#dc2626', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Marvel Universe',
    colors: [
      { baseColor: '#1e1b4b', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#0ea5e9', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Disney Magic',
    colors: [
      { baseColor: '#fef3c7', title: 'Background', shades: [] },
      { baseColor: '#92400e', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#06b6d4', title: 'Accent', shades: [] },
    ]
  },

  // Brands
  {
    name: 'Apple Minimalist',
    colors: [
      { baseColor: '#ffffff', title: 'Background', shades: [] },
      { baseColor: '#1d1d1f', title: 'Text', shades: [] },
      { baseColor: '#007aff', title: 'Primary', shades: [] },
      { baseColor: '#34c759', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Nike Dynamic',
    colors: [
      { baseColor: '#000000', title: 'Background', shades: [] },
      { baseColor: '#ffffff', title: 'Text', shades: [] },
      { baseColor: '#f5f5f5', title: 'Primary', shades: [] },
      { baseColor: '#ff6b35', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Coca-Cola Classic',
    colors: [
      { baseColor: '#ffffff', title: 'Background', shades: [] },
      { baseColor: '#1a1a1a', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Starbucks Green',
    colors: [
      { baseColor: '#f8fafc', title: 'Background', shades: [] },
      { baseColor: '#1e293b', title: 'Text', shades: [] },
      { baseColor: '#059669', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'McDonald\'s Happy',
    colors: [
      { baseColor: '#ffffff', title: 'Background', shades: [] },
      { baseColor: '#1a1a1a', title: 'Text', shades: [] },
      { baseColor: '#fbbf24', title: 'Primary', shades: [] },
      { baseColor: '#dc2626', title: 'Accent', shades: [] },
    ]
  },

  // Nature & Environment
  {
    name: 'Ocean Deep',
    colors: [
      { baseColor: '#0f172a', title: 'Background', shades: [] },
      { baseColor: '#e2e8f0', title: 'Text', shades: [] },
      { baseColor: '#0ea5e9', title: 'Primary', shades: [] },
      { baseColor: '#06b6d4', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Forest Green',
    colors: [
      { baseColor: '#f0fdf4', title: 'Background', shades: [] },
      { baseColor: '#14532d', title: 'Text', shades: [] },
      { baseColor: '#059669', title: 'Primary', shades: [] },
      { baseColor: '#84cc16', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Desert Sand',
    colors: [
      { baseColor: '#fef3c7', title: 'Background', shades: [] },
      { baseColor: '#92400e', title: 'Text', shades: [] },
      { baseColor: '#f59e0b', title: 'Primary', shades: [] },
      { baseColor: '#dc2626', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Mountain Peak',
    colors: [
      { baseColor: '#f8fafc', title: 'Background', shades: [] },
      { baseColor: '#1e293b', title: 'Text', shades: [] },
      { baseColor: '#64748b', title: 'Primary', shades: [] },
      { baseColor: '#0ea5e9', title: 'Accent', shades: [] },
    ]
  },

  // Art & Creative
  {
    name: 'Van Gogh Starry',
    colors: [
      { baseColor: '#0f172a', title: 'Background', shades: [] },
      { baseColor: '#fbbf24', title: 'Text', shades: [] },
      { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
      { baseColor: '#06b6d4', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Monet Waterlilies',
    colors: [
      { baseColor: '#f0f9ff', title: 'Background', shades: [] },
      { baseColor: '#0c4a6e', title: 'Text', shades: [] },
      { baseColor: '#06b6d4', title: 'Primary', shades: [] },
      { baseColor: '#10b981', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Warhol Pop',
    colors: [
      { baseColor: '#ffffff', title: 'Background', shades: [] },
      { baseColor: '#1a1a1a', title: 'Text', shades: [] },
      { baseColor: '#ec4899', title: 'Primary', shades: [] },
      { baseColor: '#fbbf24', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Picasso Cubism',
    colors: [
      { baseColor: '#fef3c7', title: 'Background', shades: [] },
      { baseColor: '#92400e', title: 'Text', shades: [] },
      { baseColor: '#dc2626', title: 'Primary', shades: [] },
      { baseColor: '#8b5cf6', title: 'Accent', shades: [] },
    ]
  },

  // Technology & Digital
  {
    name: 'Cyberpunk Neon',
    colors: [
      { baseColor: '#000000', title: 'Background', shades: [] },
      { baseColor: '#00ff00', title: 'Text', shades: [] },
      { baseColor: '#ff00ff', title: 'Primary', shades: [] },
      { baseColor: '#00ffff', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Retro Gaming',
    colors: [
      { baseColor: '#1a1a1a', title: 'Background', shades: [] },
      { baseColor: '#00ff00', title: 'Text', shades: [] },
      { baseColor: '#ff0000', title: 'Primary', shades: [] },
      { baseColor: '#0000ff', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'AI Future',
    colors: [
      { baseColor: '#0f172a', title: 'Background', shades: [] },
      { baseColor: '#e2e8f0', title: 'Text', shades: [] },
      { baseColor: '#06b6d4', title: 'Primary', shades: [] },
      { baseColor: '#8b5cf6', title: 'Accent', shades: [] },
    ]
  },
  {
    name: 'Digital Minimal',
    colors: [
      { baseColor: '#ffffff', title: 'Background', shades: [] },
      { baseColor: '#1a1a1a', title: 'Text', shades: [] },
      { baseColor: '#3b82f6', title: 'Primary', shades: [] },
      { baseColor: '#10b981', title: 'Accent', shades: [] },
    ]
  }
];
