import { CrossLink } from './cross-links';
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

// Tool categories for better organization
export const TOOL_CATEGORIES = {
  COLORS: 'colors',
  IMAGES: 'images',
  GENERATORS: 'generators',
  UTILITIES: 'utilities'
} as const;

// All available tools with their metadata
export const ALL_TOOLS: Record<string, {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
}> = {
  'color-inspector': {
    title: 'Color Inspector',
    description: 'Analyze colors in detail (shades, harmonies, and more)',
    href: '/colors/inspector',
    category: TOOL_CATEGORIES.COLORS,
    icon: <ColorInspectorIcon width="32" height="32" />,
    tags: ['color', 'analysis', 'hex', 'rgb', 'hsl']
  },
  'color-converter': {
    title: 'Color Converter',
    description: 'Convert colors between different formats (HEX, RGB, HSL, CMYK, and more)',
    href: '/colors/converter',
    category: TOOL_CATEGORIES.COLORS,
    icon: <ColorConversionIcon width="32" height="32" />,
    tags: ['color', 'conversion', 'hex', 'rgb', 'hsl']
  },
  'contrast-checker': {
    title: 'Contrast Checker',
    description: 'Test color combinations for accessibility and readability',
    href: '/colors/contrast-checker',
    category: TOOL_CATEGORIES.COLORS,
    icon: <ContrastCheckerIcon width="32" height="32" />,
    tags: ['color', 'contrast', 'accessibility', 'readability']
  },
  'palette-generator': {
    title: 'Palette Generator',
    description: 'Create beautiful color palettes and schemes',
    href: '/colors/palette-generator',
    category: TOOL_CATEGORIES.COLORS,
    icon: <PaletteGenerationIcon width="32" height="32" />,
    tags: ['color', 'palette', 'scheme', 'generation']
  },
  'palette-from-image': {
    title: 'Palette from Image',
    description: 'Find inspiration by extracting color palettes from images',
    href: '/colors/palette-from-image',
    category: TOOL_CATEGORIES.COLORS,
    icon: <PaletteFromImageIcon width="32" height="32" />,
    tags: ['color', 'palette', 'image', 'extraction']
  },
  'gradient-generator': {
    title: 'Gradient Generator',
    description: 'Create stunning gradients for heatmaps, charts, and visual designs',
    href: '/colors/gradient-generator',
    category: TOOL_CATEGORIES.COLORS,
    icon: <GradientGenerationIcon width="32" height="32" />,
    tags: ['color', 'gradient', 'transition', 'generation']
  },
  'image-compression': {
    title: 'Image Compression',
    description: 'Compress images while maintaining quality for faster loading times',
    href: '/images/compression',
    category: TOOL_CATEGORIES.IMAGES,
    icon: <ImageCompressionIcon width="32" height="32" />,
    tags: ['image', 'compression', 'optimization', 'quality']
  },
  'image-to-base64': {
    title: 'Image to Base64',
    description: 'Convert images to Base64 encoded strings for use in web applications',
    href: '/images/image-to-base64',
    category: TOOL_CATEGORIES.IMAGES,
    icon: <ImageToBase64Icon width="32" height="32" />,
    tags: ['image', 'base64', 'conversion', 'encoding']
  },
  'base64-to-image': {
    title: 'Base64 to Image',
    description: 'Convert Base64 strings back to images for use in web applications',
    href: '/images/base64-to-image',
    category: TOOL_CATEGORIES.IMAGES,
    icon: <Base64ToImageIcon width="32" height="32" />,
    tags: ['image', 'base64', 'conversion', 'decoding']
  },
  'qr-code-generator': {
    title: 'QR Code Generator',
    description: 'Generate free, forever-lasting, unlimited QR codes for URLs, WiFi, and more',
    href: '/generators/qr-code',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: <QRCodeGeneratorIcon width="32" height="32" />,
    tags: ['qr', 'code', 'generation', 'url', 'text']
  },
  'lorem-ipsum-generator': {
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design and development for your projects',
    href: '/generators/lorem-ipsum',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: <LoremIpsumGeneratorIcon width="32" height="32" />,
    tags: ['text', 'placeholder', 'lorem', 'ipsum']
  }
};

// Tool-specific cross-link configurations
export const TOOL_CROSS_LINKS: Record<string, {
  relevantTools: string[];
  randomCount: number;
  customLinks?: CrossLink[];
}> = {
  'color-converter': {
    relevantTools: ['contrast-checker', 'palette-generator', 'gradient-generator'],
    randomCount: 2,
    customLinks: [
      {
        title: 'Inspect This Color',
        description: 'Analyze the current color in detail (shades, harmonies, and more)',
        href: '/colors/inspector',
        icon: <ColorInspectorIcon width="32" height="32" />
      }
    ]
  },
  'color-inspector': {
    relevantTools: ['color-converter', 'contrast-checker', 'palette-generator', 'gradient-generator', 'palette-from-image'],
    randomCount: 3
  },
  'contrast-checker': {
    relevantTools: ['color-inspector', 'color-converter', 'palette-generator', 'palette-from-image', 'gradient-generator'],
    randomCount: 3
  },
  'palette-generator': {
    relevantTools: ['color-inspector', 'color-converter', 'contrast-checker', 'palette-from-image', 'gradient-generator'],
    randomCount: 3
  },
  'palette-from-image': {
    relevantTools: ['palette-generator', 'color-inspector', 'contrast-checker', 'gradient-generator', 'palette-from-image'],
    randomCount: 3
  },
  'gradient-generator': {
    relevantTools: ['color-inspector', 'palette-generator', 'color-converter', 'palette-from-image', 'contrast-checker'],
    randomCount: 3
  },
  'image-compression': {
    relevantTools: ['image-to-base64', 'base64-to-image'],
    randomCount: 2
  },
  'image-to-base64': {
    relevantTools: ['image-compression', 'base64-to-image'],
    randomCount: 2
  },
  'base64-to-image': {
    relevantTools: ['image-compression', 'image-to-base64'],
    randomCount: 2
  },
  'qr-code-generator': {
    relevantTools: ['lorem-ipsum-generator'],
    randomCount: 1
  },
  'lorem-ipsum-generator': {
    relevantTools: ['qr-code-generator'],
    randomCount: 1
  }
};

// Function to get random tools from a category
export const getRandomToolsFromCategory = (category: string, count: number, excludeTool?: string): CrossLink[] => {
  const toolsInCategory = Object.entries(ALL_TOOLS)
    .filter(([key, tool]) => 
      tool.category === category && key !== excludeTool
    );
  
  // If we don't have enough tools, return what we have
  const availableCount = Math.min(count, toolsInCategory.length);
  if (availableCount === 0) return [];
  
  const shuffled = toolsInCategory.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, availableCount).map(([key, tool]) => ({
    title: tool.title,
    description: tool.description,
    href: tool.href,
    icon: tool.icon
  }));
};

// Function to get random tools from a list
export const getRandomToolsFromList = (toolKeys: string[], count: number, excludeTool?: string): CrossLink[] => {
  const availableTools = toolKeys.filter(key => key !== excludeTool);
  
  // If we don't have enough tools, return what we have
  const availableCount = Math.min(count, availableTools.length);
  if (availableCount === 0) return [];
  
  const shuffled = availableTools.sort(() => 0.5 - Math.random());
  const selectedKeys = shuffled.slice(0, availableCount);
  
  return selectedKeys.map(key => {
    const tool = ALL_TOOLS[key];
    return {
      title: tool.title,
      description: tool.description,
      href: tool.href,
      icon: tool.icon
    };
  });
};

// Main function to get cross-links for a tool
export const getToolCrossLinks = (toolKey: string, customData?: any): CrossLink[] => {
  const toolConfig = TOOL_CROSS_LINKS[toolKey];
  
  if (!toolConfig) {
    // Default: return up to 3 random tools from the same category
    const tool = ALL_TOOLS[toolKey];
    if (tool) {
      return getRandomToolsFromCategory(tool.category, 3, toolKey);
    }
    // Fallback: return up to 3 random tools
    const allToolKeys = Object.keys(ALL_TOOLS);
    return getRandomToolsFromList(allToolKeys, 3, toolKey);
  }

  let links: CrossLink[] = [];

  // Add custom links if specified
  if (toolConfig.customLinks) {
    links.push(...toolConfig.customLinks);
  }

  // Add random relevant tools
  const randomTools = getRandomToolsFromList(toolConfig.relevantTools, toolConfig.randomCount, toolKey);
  links.push(...randomTools);

  // If we don't have enough links and want to fill up to 3, add from same category
  // But only if we actually have more tools available
  const tool = ALL_TOOLS[toolKey];
  if (tool && links.length < 3) {
    const remainingCount = 3 - links.length;
    const categoryTools = getRandomToolsFromCategory(tool.category, remainingCount, toolKey);
    
    // Only add tools that aren't already in the links array
    const newTools = categoryTools.filter(categoryTool => 
      !links.some(existingLink => existingLink.href === categoryTool.href)
    );
    
    links.push(...newTools);
  }

  // Ensure no duplicate links
  return ensureUniqueLinks(links);
};

// Function to get cross-links with dynamic data (like current color for color tools)
export const getDynamicToolCrossLinks = (toolKey: string, dynamicData?: any): CrossLink[] => {
  const baseLinks = getToolCrossLinks(toolKey, dynamicData);
  
  // Apply dynamic modifications based on tool and data
  if (toolKey === 'color-converter' && dynamicData?.color) {
    const color = dynamicData.color.replace(/^#/, '');
    return baseLinks.map(link => {
      if (link.title === 'Inspect This Color') {
        return {
          ...link,
          href: `/colors/inspector#${color}`,
          description: `Analyze ${dynamicData.color} color in detail (shades, harmonies, and more)`
        };
      }
      return link;
    });
  }
  
  // Ensure no duplicate links
  return ensureUniqueLinks(baseLinks);
};

// Helper function to ensure unique links
export const ensureUniqueLinks = (links: CrossLink[]): CrossLink[] => {
  const seen = new Set<string>();
  return links.filter(link => {
    if (seen.has(link.href)) {
      return false;
    }
    seen.add(link.href);
    return true;
  });
};
