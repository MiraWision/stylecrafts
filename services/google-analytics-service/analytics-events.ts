export const analyticsEvents = {
  colors: {
    converter: {
      colorConverted: (color: string) => ({
        category: 'ColorsConverter',
        action: 'ColorsConverter-ColorConverted',
        label: color
      }),
      colorCopied: (color: string) => ({
        category: 'ColorsConverter',
        action: 'ColorsConverter-ColorCopied',
        label: color
      }),
    },
    gradient: {
      colorAddedToGradient: (color: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-ColorAddedToGradient',
        label: color
      }),
      colorRemovedFromGradient: (color: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-ColorRemovedFromGradient',
        label: color
      }),
      exampleGradientSelected: (gradientName: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-ExampleGradientSelected',
        label: gradientName
      }),
      gradientCopied: (gradient: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-GradientCopied',
        label: gradient
      }),
      colorCopied: (color: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-ColorCopied',
        label: color
      }),
    },
  },
  images: {
    base64ToImage: {
      imageConverted: (size: string) => ({
        category: 'ImagesBase64ToImage',
        action: 'ImagesBase64ToImage-ImageConverted',
        label: size,
      }),
      imageDownloaded: (size: string) => ({
        category: 'ImagesBase64ToImage',
        action: 'ImagesBase64ToImage-ImageDownloaded',
        label: size,
      }),
    },
    imageToBase64: {
      imageConverted: (size: string) => ({
        category: 'ImagesImageToBase64',
        action: 'ImagesImageToBase64-ImageConverted',
        label: size,
      }),
      imageCopied: (size: string) => ({
        category: 'ImagesImageToBase64',
        action: 'ImagesImageToBase64-ImageCopied',
        label: size,
      }),
      imageCopiedToCSS: (size: string) => ({
        category: 'ImagesImageToBase64',
        action: 'ImagesImageToBase64-ImageCopiedToCSS',
        label: size,
      }),
      imageCopiedToHTML: (size: string) => ({
        category: 'ImagesImageToBase64',
        action: 'ImagesImageToBase64-ImageCopiedToHTML',
        label: size,
      }),
    },
    compression: {
      imageUploaded: (size: string) => ({
        category: 'ImagesCompression',
        action: 'ImagesCompression-ImageUploaded',
        label: size,
      }),
      compressionSettingsChanged: (settings: string) => ({
        category: 'ImagesCompression',
        action: 'ImagesCompression-CompressionSettingsChanged',
        label: settings,
      }),
      imageCompressed: (optimizationPercentage: string) => ({
        category: 'ImagesCompression',
        action: 'ImagesCompression-ImageCompressed',
        label: optimizationPercentage,
      }),
    },
  },
  games: {
    colorMatched: (level: string) => ({
      category: 'Games',
      action: 'Games-ColorMatched',
      label: level,
    }),
    challengeStarted: () => ({
      category: 'Games',
      action: 'Games-ChallengeStarted',
    }),
    challengeEnded: (time: string) => ({
      category: 'Games',
      action: 'Games-ChallengeEnded',
      label: time,
    }),
    challengeScored: (score: string) => ({
      category: 'Games',
      action: 'Games-ChallengeScored',
      label: score,
    }),
    challengeTopScored: (score: string) => ({
      category: 'Games',
      action: 'Games-ChallengeTopScored',
      label: score,
    }),
  },
  cheatsheets: {
    characters: {
      characterCopied: (character: string) => ({
        category: 'CheatsheetsCharacters',
        action: 'CheatsheetsCharacters-CharacterCopied',
        label: character
      }),
    },
    emojis: {
      emojiCopied: (emoji: string) => ({
        category: 'CheatsheetsEmojis',
        action: 'CheatsheetsEmojis-EmojiCopied',
        label: emoji
      }),
    },
    colorSwatches: {
      colorCopied: (color: string) => ({
        category: 'CheatsheetsColorSwatches',
        action: 'CheatsheetsColorSwatches-ColorCopied',
        label: color
      }),
    },
  },
  generators: {
    loremIpsum: {
      textGenerated: (type: string, count: string) => ({
        category: 'GeneratorsLoremIpsum',
        action: 'GeneratorsLoremIpsum-TextGenerated',
        label: `${type}-${count}`
      }),
      textCopied: (type: string, count: string) => ({
        category: 'GeneratorsLoremIpsum',
        action: 'GeneratorsLoremIpsum-TextCopied',
        label: `${type}-${count}`
      }),
    },
    qrCode: {
      qrCodeGenerated: (contentType: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-QRCodeGenerated',
        label: contentType
      }),
      qrCodeDownloaded: (contentType: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-QRCodeDownloaded',
        label: contentType
      }),
      logoAdded: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-LogoAdded',
      }),
      logoRemoved: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-LogoRemoved',
      }),
      styleChanged: (setting: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-StyleChanged',
        label: setting
      }),
    },
  },
  contrast: {
    colorsChanged: (textColor: string, bgColor: string) => ({
      category: 'ColorsContrast',
      action: 'ColorsContrast-ColorsChanged',
      label: `${textColor}-${bgColor}`
    }),
    contrastImproved: (originalContrast: string, newContrast: string) => ({
      category: 'ColorsContrast',
      action: 'ColorsContrast-ContrastImproved',
      label: `${originalContrast}-${newContrast}`
    }),
    colorsSwapped: () => ({
      category: 'ColorsContrast',
      action: 'ColorsContrast-ColorsSwapped',
    }),
    examplePaletteSelected: (paletteName: string) => ({
      category: 'ColorsContrast',
      action: 'ColorsContrast-ExamplePaletteSelected',
      label: paletteName
    }),
  },
  palette: {
    colorAdded: (color: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-ColorAdded',
      label: color
    }),
    colorRemoved: (color: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-ColorRemoved',
      label: color
    }),
    colorChanged: (oldColor: string, newColor: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-ColorChanged',
      label: `${oldColor}-${newColor}`
    }),
    paletteCopied: (format: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-PaletteCopied',
      label: format
    }),
    paletteExported: (format: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-PaletteExported',
      label: format
    }),
    examplePaletteSelected: (paletteName: string) => ({
      category: 'ColorsPalette',
      action: 'ColorsPalette-ExamplePaletteSelected',
      label: paletteName
    }),
  },
  paletteFromImage: {
    imageUploaded: (imageSize: string) => ({
      category: 'ColorsPaletteFromImage',
      action: 'ColorsPaletteFromImage-ImageUploaded',
      label: imageSize
    }),
    exampleImageSelected: (imageName: string) => ({
      category: 'ColorsPaletteFromImage',
      action: 'ColorsPaletteFromImage-ExampleImageSelected',
      label: imageName
    }),
    colorRemoved: (color: string) => ({
      category: 'ColorsPaletteFromImage',
      action: 'ColorsPaletteFromImage-ColorRemoved',
      label: color
    }),
    paletteRefreshed: () => ({
      category: 'ColorsPaletteFromImage',
      action: 'ColorsPaletteFromImage-PaletteRefreshed',
    }),
    colorCopied: (color: string) => ({
      category: 'ColorsPaletteFromImage',
      action: 'ColorsPaletteFromImage-ColorCopied',
      label: color
    }),
  },
  inspector: {
    colorSelected: (color: string) => ({
      category: 'ColorsInspector',
      action: 'ColorsInspector-ColorSelected',
      label: color
    }),
    colorInputChanged: (color: string) => ({
      category: 'ColorsInspector',
      action: 'ColorsInspector-ColorInputChanged',
      label: color
    }),
    shadeSelected: (shade: string) => ({
      category: 'ColorsInspector',
      action: 'ColorsInspector-ShadeSelected',
      label: shade
    }),
    exampleColorSelected: (color: string) => ({
      category: 'ColorsInspector',
      action: 'ColorsInspector-ExampleColorSelected',
      label: color
    }),
  },
};
