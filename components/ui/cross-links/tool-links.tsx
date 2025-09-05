import { Tool, CrossLink, CustomLinkFunction } from './types';

import { ColorInspectorIcon } from '@/components/icons/color-inspector';
import { ContrastCheckerIcon } from '@/components/icons/contrast-checker';
import { PaletteGenerationIcon } from '@/components/icons/palette-generation';
import { PaletteFromImageIcon } from '@/components/icons/palette-from-image';
import { GradientGenerationIcon } from '@/components/icons/gradient-generation';
import { ColorConversionIcon } from '@/components/icons/color-conversion';
import { ImageCompressionIcon } from '@/components/icons/image-compression';
import { ImageToBase64Icon } from '@/components/icons/image-to-base64';
import { Base64ToImageIcon } from '@/components/icons/base64-to-image';
import { QRCodeGeneratorIcon } from '@/components/icons/qr-code-generator';
import { LoremIpsumGeneratorIcon } from '@/components/icons/lorem-ipsum-generator';
import { GameIcon } from '@/components/icons/game';
import { ColorSwatchesIcon } from '@/components/icons/color-swatches';

// Tool categories for better organization
export const ToolCategories = {
  Colors: 'colors',
  Images: 'images',
  Generators: 'generators',
  Utilities: 'utilities'
} as const;

// All available tools with their metadata
export const AllTools: Record<string, Tool> = {
  'color-inspector': {
    title: 'Color Inspector',
    description: 'Analyze colors in detail (shades, harmonies, and more)',
    href: '/colors/inspector',
    category: ToolCategories.Colors,
    icon: <ColorInspectorIcon width="32" height="32" />,
    tags: ['color', 'analysis', 'hex', 'rgb', 'hsl']
  },
  'color-converter': {
    title: 'Color Converter',
    description: 'Convert colors between different formats (HEX, RGB, HSL, CMYK, and more)',
    href: '/colors/converter',
    category: ToolCategories.Colors,
    icon: <ColorConversionIcon width="32" height="32" />,
    tags: ['color', 'conversion', 'hex', 'rgb', 'hsl']
  },
  'contrast-checker': {
    title: 'Contrast Checker',
    description: 'Test color combinations for accessibility and readability',
    href: '/colors/contrast-checker',
    category: ToolCategories.Colors,
    icon: <ContrastCheckerIcon width="32" height="32" />,
    tags: ['color', 'contrast', 'accessibility', 'readability']
  },
  'palette-generator': {
    title: 'Palette Generator',
    description: 'Create beautiful color palettes and schemes',
    href: '/colors/palette-generator',
    category: ToolCategories.Colors,
    icon: <PaletteGenerationIcon width="32" height="32" />,
    tags: ['color', 'palette', 'scheme', 'generation']
  },
  'palette-from-image': {
    title: 'Palette from Image',
    description: 'Find inspiration by extracting color palettes from images',
    href: '/colors/palette-from-image',
    category: ToolCategories.Colors,
    icon: <PaletteFromImageIcon width="32" height="32" />,
    tags: ['color', 'palette', 'image', 'extraction']
  },
  'gradient-generator': {
    title: 'Gradient Generator',
    description: 'Create stunning gradients for heatmaps, charts, and visual designs',
    href: '/colors/gradient-generator',
    category: ToolCategories.Colors,
    icon: <GradientGenerationIcon width="32" height="32" />,
    tags: ['color', 'gradient', 'transition', 'generation']
  },
  'image-compression': {
    title: 'Image Compression',
    description: 'Compress images while maintaining quality for faster loading times',
    href: '/images/compression',
    category: ToolCategories.Images,
    icon: <ImageCompressionIcon width="32" height="32" />,
    tags: ['image', 'compression', 'optimization', 'quality']
  },
  'image-to-base64': {
    title: 'Image to Base64',
    description: 'Convert images to Base64 encoded strings for use in web applications',
    href: '/images/image-to-base64',
    category: ToolCategories.Images,
    icon: <ImageToBase64Icon width="32" height="32" />,
    tags: ['image', 'base64', 'conversion', 'encoding']
  },
  'base64-to-image': {
    title: 'Base64 to Image',
    description: 'Convert Base64 strings back to images for use in web applications',
    href: '/images/base64-to-image',
    category: ToolCategories.Images,
    icon: <Base64ToImageIcon width="32" height="32" />,
    tags: ['image', 'base64', 'conversion', 'decoding']
  },
  'qr-code-generator': {
    title: 'QR Code Generator',
    description: 'Generate free, forever-lasting, unlimited QR codes for URLs, WiFi, and more',
    href: '/generators/qr-code',
    category: ToolCategories.Generators,
    icon: <QRCodeGeneratorIcon width="32" height="32" />,
    tags: ['qr', 'code', 'generation', 'url', 'text']
  },
  'lorem-ipsum-generator': {
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design and development for your projects',
    href: '/generators/lorem-ipsum',
    category: ToolCategories.Generators,
    icon: <LoremIpsumGeneratorIcon width="32" height="32" />,
    tags: ['text', 'placeholder', 'lorem', 'ipsum']
  },
  'guess-color-blend': {
    title: 'Guess Color Blend',
    description: 'Test your color knowledge and learn about color blending through an interactive game',
    href: '/games/guess-color-blend',
    category: ToolCategories.Utilities,
    icon: <GameIcon width="32" height="32" />,
    tags: ['color', 'game', 'blend', 'interactive']
  },
  'color-swatches': {
    title: 'Comprehensive Color Swatches',
    description: 'Browse our extensive collection of color swatches to find the perfect hues for your designs',
    href: '/cheatsheets/colors-swatches',
    category: ToolCategories.Utilities,
    icon: <ColorSwatchesIcon width="32" height="32" />,
    tags: ['color', 'swatches', 'palette', 'reference']
  }
};

// Tool-specific cross-link configurations
export const CrossLinks: Record<string, {
  mandatoryTools: (string | CustomLinkFunction)[];
  optionalTools: string[];
}> = {
  'color-converter': {
    mandatoryTools: [
      (dynamicData?: any) => ({
        title: 'Inspect This Color',
        description: dynamicData?.color 
          ? `Analyze ${dynamicData.color} color in detail (shades, harmonies, and more)`
          : 'Analyze the current color in detail (shades, harmonies, and more)',
        href: dynamicData?.color 
          ? `/colors/inspector#${dynamicData.color.replace(/^#/, '')}`
          : '/colors/inspector',
        icon: <ColorInspectorIcon width="32" height="32" />
      }),
    ],
    optionalTools: ['gradient-generator', 'color-inspector', 'contrast-checker', 'palette-generator'],
  },
  'color-inspector': {
    mandatoryTools: ['color-converter', 'contrast-checker'],
    optionalTools: ['palette-generator', 'gradient-generator', 'palette-from-image'],
  },
  'contrast-checker': {
    mandatoryTools: ['color-inspector', 'color-converter'],
    optionalTools: ['palette-generator', 'palette-from-image', 'gradient-generator']
  },
  'palette-generator': {
    mandatoryTools: ['color-inspector', 'contrast-checker'],
    optionalTools: ['color-converter', 'palette-from-image', 'gradient-generator']
  },
  'palette-from-image': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: ['contrast-checker', 'gradient-generator', 'color-converter']
  },
  'gradient-generator': {
    mandatoryTools: ['color-inspector', 'palette-generator'],
    optionalTools: ['color-converter', 'palette-from-image', 'contrast-checker']
  },
  'image-compression': {
    mandatoryTools: ['image-to-base64'],
    optionalTools: ['base64-to-image']
  },
  'image-to-base64': {
    mandatoryTools: ['image-compression'],
    optionalTools: ['base64-to-image']
  },
  'base64-to-image': {
    mandatoryTools: ['image-compression'],
    optionalTools: ['image-to-base64']
  },
  'qr-code-generator': {
    mandatoryTools: ['lorem-ipsum-generator'],
    optionalTools: []
  },
  'lorem-ipsum-generator': {
    mandatoryTools: ['qr-code-generator'],
    optionalTools: []
  },
  'guess-color-blend': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: ['palette-from-image']
  },
  'color-swatches': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: ['color-converter']
  },
  'blog-exploring-colors-of-bridgerton': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: ['color-converter']
  },
  'blog-qr-codes-in-modern-web-design': {
    mandatoryTools: ['qr-code-generator', 'lorem-ipsum-generator'],
    optionalTools: []
  },
  'blog-accessible-web-design': {
    mandatoryTools: ['contrast-checker', 'color-inspector'],
    optionalTools: ['color-converter']
  },
  'blog-psychology-of-color': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: []
  },
  'blog-creating-color-steps-for-heatmaps': {
    mandatoryTools: ['gradient-generator', 'color-inspector'],
    optionalTools: ['color-converter']
  },
  'blog-color-theory-for-digital-design': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: []
  },
  'blog-integrating-base64-images-in-your-web-projects': {
    mandatoryTools: ['image-to-base64', 'image-compression'],
    optionalTools: ['color-converter']
  },
  'blog-essential-tools-for-designers-in-2025': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: []
  },
  'blog-blending-colors-for-unique-palettes': {
    mandatoryTools: ['palette-generator', 'color-inspector'],
    optionalTools: []
  },
  'blog-optimizing-images-for-the-web': {
    mandatoryTools: ['image-compression', 'image-to-base64'],
    optionalTools: []
  },
  'blog-top-trends-in-web-design-for-2025': {
    mandatoryTools: ['qr-code-generator', 'lorem-ipsum-generator'],
    optionalTools: []
  },
  'blog-understanding-color-formats': {
    mandatoryTools: ['color-converter', 'color-inspector'],
    optionalTools: []
  },
};

// Helper function to get a tool or blog post by key
const getToolByKey = (key: string): CrossLink | null => {
  // First check if it's a tool
  const tool = AllTools[key];
  if (tool) {
    return {
      title: tool.title,
      description: tool.description,
      href: tool.href,
      icon: tool.icon
    };
  }
  
  return null;
};

// Helper function to get random tools from a list
const getRandomToolsFromList = (toolKeys: string[], count: number, excludeTool?: string): CrossLink[] => {
  const availableTools = toolKeys.filter(key => key !== excludeTool);
  
  if (availableTools.length === 0) return [];
  
  const shuffled = [...availableTools].sort(() => 0.5 - Math.random());
  const selectedKeys = shuffled.slice(0, count);
  
  return selectedKeys
    .map(key => getToolByKey(key))
    .filter((tool): tool is CrossLink => tool !== null);
};

// Main function to get cross-links for a tool
export const getToolCrossLinks = (toolKey: string, dynamicData?: any): CrossLink[] => {
  const toolConfig = CrossLinks[toolKey];
  
  if (!toolConfig) {
    const allToolKeys = Object.keys(AllTools);
    return getRandomToolsFromList(allToolKeys, 3, toolKey);
  }

  let links: CrossLink[] = [];

  // Add mandatory tools (always in the specified order)
  for (const mandatoryTool of toolConfig.mandatoryTools) {
    if (typeof mandatoryTool === 'string') {
      const tool = getToolByKey(mandatoryTool);
      if (tool) links.push(tool);
    } else {
      const customLinkResult = mandatoryTool(dynamicData);
      links.push(customLinkResult);
    }
  }

  // Calculate how many optional tools we need to reach 3 total
  const targetCount = 3;
  const neededCount = Math.max(0, targetCount - links.length);

  // Add random optional tools if we need more
  if (neededCount > 0) {  
    const optionalTools = getRandomToolsFromList(toolConfig.optionalTools, neededCount);
    links.push(...optionalTools);
  }

  return links;
};
