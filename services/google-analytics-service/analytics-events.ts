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
      previewSwiped: () => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-PreviewSwiped',
      }),
      editColor: (color: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-EditColor',
        label: color
      }),
      editSteps: (steps: string) => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-EditSteps',
        label: steps
      }),
      adjustColorMenuOpened: () => ({
        category: 'ColorsGradient',
        action: 'ColorsGradient-AdjustColorMenuOpened',
      }),
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
      shadeSelected: (shade: string) => ({
        category: 'ColorsPalette',
        action: 'ColorsPalette-ShadeSelected',
        label: shade
      }),
      copyCSS: () => ({
        category: 'ColorsPalette',
        action: 'ColorsPalette-CopyCSS',
      }),
      copyJSON: () => ({
        category: 'ColorsPalette',
        action: 'ColorsPalette-CopyJSON',
      }),
      previewSwiped: () => ({
        category: 'ColorsPalette',
        action: 'ColorsPalette-PreviewSwiped',
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
      paletteCopied: () => ({
        category: 'ColorsPaletteFromImage',
        action: 'ColorsPaletteFromImage-PaletteCopied',
      }),
    },
    inspector: {
      colorChanged: (color: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ColorChanged',
        label: color
      }),
      exampleColorSelected: (color: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ExampleColorSelected',
        label: color
      }),
      colorCopied: (color: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ColorCopied',
        label: color
      }),
      harmonyColorCopied: (color: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-HarmonyColorCopied',
        label: color
      }),
      colorSwatchesOpened: () => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ColorSwatchesOpened',
      }),
      shadeSelected: (shade: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ShadeSelected',
        label: shade
      }),
      tintSelected: (tint: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-TintSelected',
        label: tint
      }),
      toneSelected: (tone: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-ToneSelected',
        label: tone
      }),
      hueSelected: (hue: string) => ({
        category: 'ColorsInspector',
        action: 'ColorsInspector-HueSelected',
        label: hue
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
      imageDownloaded: (imageSize: string) => ({
        category: 'ImagesCompression',
        action: 'ImagesCompression-ImageDownloaded',
        label: imageSize,
      }),
    },
  },
  games: {
    guessColorBlend: {
      colorMatched: (level: string) => ({
        category: 'GamesGuessColorBlend',
        action: 'GamesGuessColorBlend-ColorMatched',
        label: level,
      }),
      gameStarted: () => ({
        category: 'GamesGuessColorBlend',
        action: 'GamesGuessColorBlend-GameStarted',
      }),
      gameEnded: (time: string) => ({
        category: 'GamesGuessColorBlend',
        action: 'GamesGuessColorBlend-GameEnded',
        label: time,
      }),
      gameTopScored: (score: string) => ({
        category: 'GamesGuessColorBlend',
        action: 'GamesGuessColorBlend-GameTopScored',
        label: score,
      }),
    },
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
      colorInspected: (color: string) => ({
        category: 'CheatsheetsColorSwatches',
        action: 'CheatsheetsColorSwatches-ColorInspected',
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
      logoAdded: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-LogoAdded',
      }),
      logoRemoved: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-LogoRemoved',
      }),
      typeChanged: (type: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-TypeChanged',
        label: type
      }),
      downloadSVG: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-DownloadSVG',
      }),
      downloadJPEG: () => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-DownloadJPEG',
      }),
      colorChanged: (color: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-ColorChanged',
        label: color
      }),
      eyeShapeChanged: (shape: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-EyeShapeChanged',
        label: shape
      }),
      cellShapeChanged: (shape: string) => ({
        category: 'GeneratorsQRCode',
        action: 'GeneratorsQRCode-CellShapeChanged',
        label: shape
      }),
    },
  },
  general: {
    exploreMoreToolsClicked: (toolKey: string) => ({
      category: 'General',
      action: 'General-ExploreMoreToolsClicked',
      label: toolKey
    }),
    npmLibraryClicked: (libraryName: string) => ({
      category: 'General',
      action: 'General-NPMLibraryClicked',
      label: libraryName
    }),
    landingFeatureClicked: (featureName: string) => ({
      category: 'General',
      action: 'General-LandingFeatureClicked',
      label: featureName
    }),
    landingLibraryCopied: (libraryName: string) => ({
      category: 'General',
      action: 'General-LandingLibraryCopied',
      label: libraryName
    }),
    landingLibraryClicked: (libraryName: string) => ({
      category: 'General',
      action: 'General-LandingLibraryClicked',
      label: libraryName
    }),
    landingNpmOpened: (libraryName: string) => ({
      category: 'General',
      action: 'General-LandingNpmOpened',
      label: libraryName
    }),
    landingGithubOpened: (repositoryName: string) => ({
      category: 'General',
      action: 'General-LandingGithubOpened',
      label: repositoryName
    }),
    footerInstagramOpened: () => ({
      category: 'General',
      action: 'General-FooterInstagramOpened',
    }),
    footerLinkedInOpened: () => ({
      category: 'General',
      action: 'General-FooterLinkedInOpened',
    }),
    footerTwitterOpened: () => ({
      category: 'General',
      action: 'General-FooterTwitterOpened',
    }),
  },
};
