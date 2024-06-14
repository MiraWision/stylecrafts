import { GAEvent } from './types';

type EventFunction = (...args: any[]) => GAEvent;

interface AnalyticsEvents {
  [category: string]: {
    [eventName: string]: EventFunction;
  };
}

const analyticsEvents: AnalyticsEvents = {
  colorConverter: {
    colorEntered: (colorCode: string) => ({
      category: 'ColorConverter',
      action: 'ColorEntered',
      label: colorCode
    }),
    conversionDisplayed: (colorFormats: string) => ({
      category: 'ColorConverter',
      action: 'ConversionDisplayed',
      label: colorFormats
    })
  },
  gradientGenerator: {
    colorsEntered: (colorCodes: string) => ({
      category: 'GradientGenerator',
      action: 'ColorsEntered',
      label: colorCodes
    }),
    gradientGenerated: (gradientDetails: string) => ({
      category: 'GradientGenerator',
      action: 'GradientGenerated',
      label: gradientDetails
    })
  },
  colorMixer: {
    colorsAndWeightsSelected: (colorWeights: string) => ({
      category: 'ColorMixer',
      action: 'ColorsAndWeightsSelected',
      label: colorWeights
    }),
    colorsMixed: (mixedColor: string) => ({
      category: 'ColorMixer',
      action: 'ColorsMixed',
      label: mixedColor
    })
  },
  imageConverter: {
    imageUploaded: (imageDetails: string) => ({
      category: 'ImageConverter',
      action: 'ImageUploaded',
      label: imageDetails
    }),
    base64Converted: (conversionType: string) => ({
      category: 'ImageConverter',
      action: 'Base64Converted',
      label: conversionType
    })
  },
  imageOptimization: {
    imageUploadedForOptimization: (imageDetails: string) => ({
      category: 'ImageOptimization',
      action: 'ImageUploaded',
      label: imageDetails
    }),
    optimizationSettingsChanged: (settingsDetails: string) => ({
      category: 'ImageOptimization',
      action: 'SettingsChanged',
      label: settingsDetails
    }),
    imageOptimizedAndDownloaded: (downloadDetails: string) => ({
      category: 'ImageOptimization',
      action: 'ImageDownloaded',
      label: downloadDetails
    })
  },
  copyActions: {
    textCopied: (contentType: string) => ({
      category: 'CopyAction',
      action: 'TextCopied',
      label: contentType
    })
  },
  game: {
    gameStarted: (gameLevel: string) => ({
      category: 'Game',
      action: 'GameStarted',
      label: gameLevel
    }),
    colorGuessAttempted: (guessDetails: string) => ({
      category: 'Game',
      action: 'GuessAttempted',
      label: guessDetails
    }),
    levelCompleted: (levelDetails: string) => ({
      category: 'Game',
      action: 'LevelCompleted',
      label: levelDetails
    }),
    challengeModeStarted: () => ({
      category: 'Game',
      action: 'ChallengeStarted'
    }),
    challengeProgressed: (currentLevel: string) => ({
      category: 'Game',
      action: 'ChallengeProgressed',
      label: currentLevel
    })
  },
  generalInteractions: {
    pageView: (pageName: string) => ({
      category: 'PageView',
      action: 'PageVisited',
      label: pageName
    }),
    toolUsage: (toolName: string) => ({
      category: 'ToolUsage',
      action: 'ToolAccessed',
      label: toolName
    })
  }
};

export { analyticsEvents };
