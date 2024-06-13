const analyticsEvents = {
  colorConverter: {
    colorEntered: {
      event: 'ColorConverter',
      action: 'ColorEntered',
      label: 'colorCode'
    },
    conversionDisplayed: {
      event: 'ColorConverter',
      action: 'ConversionDisplayed',
      label: 'colorFormats'
    }
  },
  gradientGenerator: {
    colorsEntered: {
      event: 'GradientGenerator',
      action: 'ColorsEntered',
      label: 'colorCodes'
    },
    gradientGenerated: {
      event: 'GradientGenerator',
      action: 'GradientGenerated',
      label: 'gradientDetails'
    }
  },
  colorMixer: {
    colorsAndWeightsSelected: {
      event: 'ColorMixer',
      action: 'ColorsAndWeightsSelected',
      label: 'colorWeights'
    },
    colorsMixed: {
      event: 'ColorMixer',
      action: 'ColorsMixed',
      label: 'mixedColor'
    }
  },
  imageConverter: {
    imageUploaded: {
      event: 'ImageConverter',
      action: 'ImageUploaded',
      label: 'imageDetails'
    },
    base64Converted: {
      event: 'ImageConverter',
      action: 'Base64Converted',
      label: 'conversionType'
    }
  },
  imageOptimization: {
    imageUploadedForOptimization: {
      event: 'ImageOptimization',
      action: 'ImageUploaded',
      label: 'imageDetails'
    },
    optimizationSettingsChanged: {
      event: 'ImageOptimization',
      action: 'SettingsChanged',
      label: 'settingsDetails'
    },
    imageOptimizedAndDownloaded: {
      event: 'ImageOptimization',
      action: 'ImageDownloaded',
      label: 'downloadDetails'
    }
  },
  copyActions: {
    textCopied: {
      event: 'CopyAction',
      action: 'TextCopied',
      label: 'contentType'
    }
  },
  game: {
    gameStarted: {
      event: 'Game',
      action: 'GameStarted',
      label: 'gameLevel'
    },
    colorGuessAttempted: {
      event: 'Game',
      action: 'GuessAttempted',
      label: 'guessDetails'
    },
    levelCompleted: {
      event: 'Game',
      action: 'LevelCompleted',
      label: 'levelDetails'
    },
    challengeModeStarted: {
      event: 'Game',
      action: 'ChallengeStarted'
    },
    challengeProgressed: {
      event: 'Game',
      action: 'ChallengeProgressed',
      label: 'currentLevel'
    }
  },
  generalInteractions: {
    pageView: {
      event: 'PageView',
      action: 'PageVisited',
      label: 'pageName'
    }
  }
};

export default analyticsEvents;