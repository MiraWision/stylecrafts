import { PaletteColor } from './types';

interface PaletteData {
  iconPath?: string;
  name: string;
  colors: PaletteColor[];
}

interface PaletteGroup {
  title: string;
  palettes: PaletteData[];
}

export const examplePaletteGroups: PaletteGroup[] = [
  // Movies & TV Shows (Special Group - Top Priority)
  {
    title: 'Movies & TV Shows',
    palettes: [
      {
        name: 'Bridgerton Elegance',
        colors: [
          { baseColor: '#c6dbee', title: 'Background', shades: [] },
          { baseColor: '#9bbad1', title: 'Text', shades: [] },
          { baseColor: '#6f8fa5', title: 'Primary', shades: [] },
          { baseColor: '#f5f5f5', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Featherington Flair',
        colors: [
          { baseColor: '#ffeb3b', title: 'Background', shades: [] },
          { baseColor: '#f5a623', title: 'Text', shades: [] },
          { baseColor: '#e4572e', title: 'Primary', shades: [] },
          { baseColor: '#ff6f61', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Sharma Opulence',
        colors: [
          { baseColor: '#7f3b6b', title: 'Background', shades: [] },
          { baseColor: '#d4af37', title: 'Text', shades: [] },
          { baseColor: '#e0a899', title: 'Primary', shades: [] },
          { baseColor: '#4a274f', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Duke of Hastings',
        colors: [
          { baseColor: '#1b263b', title: 'Background', shades: [] },
          { baseColor: '#415a77', title: 'Text', shades: [] },
          { baseColor: '#778da9', title: 'Primary', shades: [] },
          { baseColor: '#e0e1dd', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Queen\'s Court',
        colors: [
          { baseColor: '#d4af37', title: 'Background', shades: [] },
          { baseColor: '#b76e79', title: 'Text', shades: [] },
          { baseColor: '#7d3c98', title: 'Primary', shades: [] },
          { baseColor: '#5b2c6f', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Lady Danbury',
        colors: [
          { baseColor: '#5a189a', title: 'Background', shades: [] },
          { baseColor: '#7b2cbf', title: 'Text', shades: [] },
          { baseColor: '#9d4edd', title: 'Primary', shades: [] },
          { baseColor: '#c77dff', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Gryffindor House',
        colors: [
          { baseColor: '#740001', title: 'Background', shades: [] },
          { baseColor: '#d3a625', title: 'Text', shades: [] },
          { baseColor: '#ae0001', title: 'Primary', shades: [] },
          { baseColor: '#eeba30', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Slytherin House',
        colors: [
          { baseColor: '#1a472a', title: 'Background', shades: [] },
          { baseColor: '#2a623d', title: 'Text', shades: [] },
          { baseColor: '#5d5d5d', title: 'Primary', shades: [] },
          { baseColor: '#aaaaaa', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Ravenclaw House',
        colors: [
          { baseColor: '#0e1a40', title: 'Background', shades: [] },
          { baseColor: '#946b2d', title: 'Text', shades: [] },
          { baseColor: '#222f5b', title: 'Primary', shades: [] },
          { baseColor: '#b8860b', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Hufflepuff House',
        colors: [
          { baseColor: '#ecb939', title: 'Background', shades: [] },
          { baseColor: '#372e29', title: 'Text', shades: [] },
          { baseColor: '#f0c75e', title: 'Primary', shades: [] },
          { baseColor: '#726255', title: 'Accent', shades: [] },
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
      {
        name: 'Star Wars Saga',
        colors: [
          { baseColor: '#000000', title: 'Background', shades: [] },
          { baseColor: '#ffd700', title: 'Text', shades: [] },
          { baseColor: '#4169e1', title: 'Primary', shades: [] },
          { baseColor: '#dc143c', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Game of Thrones',
        colors: [
          { baseColor: '#1a1a1a', title: 'Background', shades: [] },
          { baseColor: '#d4af37', title: 'Text', shades: [] },
          { baseColor: '#8b0000', title: 'Primary', shades: [] },
          { baseColor: '#2f4f4f', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Stranger Things',
        colors: [
          { baseColor: '#0f0f0f', title: 'Background', shades: [] },
          { baseColor: '#ff6b35', title: 'Text', shades: [] },
          { baseColor: '#004e89', title: 'Primary', shades: [] },
          { baseColor: '#ffd23f', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Holidays & Events (Special Group - Top Priority)
  {
    title: 'Holidays & Events',
    palettes: [
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
      {
        name: 'New Year Sparkle',
        colors: [
          { baseColor: '#0f172a', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#fbbf24', title: 'Primary', shades: [] },
          { baseColor: '#8b5cf6', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Thanksgiving Warmth',
        colors: [
          { baseColor: '#7c2d12', title: 'Background', shades: [] },
          { baseColor: '#fef3c7', title: 'Text', shades: [] },
          { baseColor: '#f97316', title: 'Primary', shades: [] },
          { baseColor: '#84cc16', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Seasons
  {
    title: 'Seasons',
    palettes: [
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
    ]
  },

  // Business & Professional
  {
    title: 'Business & Professional',
    palettes: [
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
      {
        name: 'Sports & Fitness',
        colors: [
          { baseColor: '#1e293b', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#10b981', title: 'Primary', shades: [] },
          { baseColor: '#f59e0b', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Music & Arts',
        colors: [
          { baseColor: '#581c87', title: 'Background', shades: [] },
          { baseColor: '#fdf4ff', title: 'Text', shades: [] },
          { baseColor: '#ec4899', title: 'Primary', shades: [] },
          { baseColor: '#fbbf24', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Brands
  {
    title: 'Brands',
    palettes: [
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
      {
        name: 'Netflix Dark',
        colors: [
          { baseColor: '#000000', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#e50914', title: 'Primary', shades: [] },
          { baseColor: '#564d4d', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Spotify Green',
        colors: [
          { baseColor: '#000000', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#1db954', title: 'Primary', shades: [] },
          { baseColor: '#191414', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Uber Modern',
        colors: [
          { baseColor: '#000000', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#1a1a1a', title: 'Primary', shades: [] },
          { baseColor: '#f6f6f6', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Nature & Environment
  {
    title: 'Nature & Environment',
    palettes: [
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
      {
        name: 'Sunset Glow',
        colors: [
          { baseColor: '#fef3c7', title: 'Background', shades: [] },
          { baseColor: '#92400e', title: 'Text', shades: [] },
          { baseColor: '#f97316', title: 'Primary', shades: [] },
          { baseColor: '#ec4899', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Aurora Borealis',
        colors: [
          { baseColor: '#0f172a', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#10b981', title: 'Primary', shades: [] },
          { baseColor: '#06b6d4', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Art & Creative
  {
    title: 'Art & Creative',
    palettes: [
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
      {
        name: 'Japanese Zen',
        colors: [
          { baseColor: '#f8fafc', title: 'Background', shades: [] },
          { baseColor: '#1e293b', title: 'Text', shades: [] },
          { baseColor: '#dc2626', title: 'Primary', shades: [] },
          { baseColor: '#fbbf24', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Mediterranean Sea',
        colors: [
          { baseColor: '#0ea5e9', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#fbbf24', title: 'Primary', shades: [] },
          { baseColor: '#10b981', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Technology & Digital
  {
    title: 'Technology & Digital',
    palettes: [
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
      },
      {
        name: 'Metaverse',
        colors: [
          { baseColor: '#1e1b4b', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#8b5cf6', title: 'Primary', shades: [] },
          { baseColor: '#06b6d4', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Gaming & Entertainment
  {
    title: 'Gaming & Entertainment',
    palettes: [
      {
        name: 'Minecraft Blocks',
        colors: [
          { baseColor: '#8b4513', title: 'Background', shades: [] },
          { baseColor: '#228b22', title: 'Text', shades: [] },
          { baseColor: '#32cd32', title: 'Primary', shades: [] },
          { baseColor: '#ffd700', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Fortnite Battle',
        colors: [
          { baseColor: '#1e3a8a', title: 'Background', shades: [] },
          { baseColor: '#fbbf24', title: 'Text', shades: [] },
          { baseColor: '#10b981', title: 'Primary', shades: [] },
          { baseColor: '#ef4444', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Pokemon Adventure',
        colors: [
          { baseColor: '#fef3c7', title: 'Background', shades: [] },
          { baseColor: '#dc2626', title: 'Text', shades: [] },
          { baseColor: '#3b82f6', title: 'Primary', shades: [] },
          { baseColor: '#10b981', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Super Mario',
        colors: [
          { baseColor: '#dc2626', title: 'Background', shades: [] },
          { baseColor: '#fbbf24', title: 'Text', shades: [] },
          { baseColor: '#3b82f6', title: 'Primary', shades: [] },
          { baseColor: '#10b981', title: 'Accent', shades: [] },
        ]
      },
    ]
  },

  // Social Media & Apps
  {
    title: 'Social Media & Apps',
    palettes: [
      {
        name: 'Instagram Gradient',
        colors: [
          { baseColor: '#f09433', title: 'Background', shades: [] },
          { baseColor: '#e6683c', title: 'Text', shades: [] },
          { baseColor: '#dc2743', title: 'Primary', shades: [] },
          { baseColor: '#cc2366', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'TikTok Energy',
        colors: [
          { baseColor: '#000000', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#ff0050', title: 'Primary', shades: [] },
          { baseColor: '#00f2ea', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'Twitter Blue',
        colors: [
          { baseColor: '#1da1f2', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#14171a', title: 'Primary', shades: [] },
          { baseColor: '#657786', title: 'Accent', shades: [] },
        ]
      },
      {
        name: 'YouTube Red',
        colors: [
          { baseColor: '#ff0000', title: 'Background', shades: [] },
          { baseColor: '#ffffff', title: 'Text', shades: [] },
          { baseColor: '#282828', title: 'Primary', shades: [] },
          { baseColor: '#909090', title: 'Accent', shades: [] },
        ]
      },
    ]
  },
];

// Legacy export for backward compatibility
export const examplePalettes: PaletteData[] = examplePaletteGroups.flatMap(group => group.palettes);
