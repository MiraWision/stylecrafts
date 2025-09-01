import React, { useMemo, useState } from 'react';
import { generateMultiSteppedGradient } from '@mirawision/colorize';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { Gradient, GradientExamplesList } from '@/components/pages/colors/gradient-generator/gradient-examples';
import { Preview } from './preview';
import { GradientSettings } from './settings';
import { ToolCrossLinks } from '@/components/ui/cross-links';

interface Props {
}

const GradientGenerator: React.FC<Props> = ({}) => {
  const [gradientSettings, setGradientSettings] = useState<Gradient['colors']>(['#ffffff00', 3, '#ffffff00', 3, '#ffffff00']);

  const gradient = useMemo<string[] | null>(() => {
    if (gradientSettings) {
      try {
        return generateMultiSteppedGradient(...gradientSettings);
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return null;
  }, [gradientSettings]);

  const selectColors = (colors: Gradient['colors']) => {
    setGradientSettings(colors);

    GAService.logEvent(analyticsEvents.colors.gradient.exampleGradientSelected(colors.join(', ')));
  };

  const addColorStep = () => {
    setGradientSettings([...gradientSettings, 2, '#ffffff' ]);

    GAService.logEvent(analyticsEvents.colors.gradient.colorAddedToGradient('#ffffff'));
  };

  const removeColorStep = (index: number) => {
    if (gradientSettings.length <= 3) {
      return;
    }

    const isLastItem = index === (gradientSettings.length - 1) / 2;

    const condition = isLastItem 
      ? (_: any, i: number) => i !== index * 2 && i !== index * 2 - 1
      : (_: any, i: number) => i !== index * 2 && i !== index * 2 + 1;

    const updatedGradientSettings = gradientSettings.filter(condition) as Gradient['colors'];

    setGradientSettings(updatedGradientSettings);

    GAService.logEvent(analyticsEvents.colors.gradient.colorRemovedFromGradient(`Removed color at index: ${index}`));
  };

  const updateColor = (index: number, newColor: string) => {
    const updatedGradientSettings = [...gradientSettings];

    updatedGradientSettings[index * 2] = newColor;

    setGradientSettings(updatedGradientSettings as Gradient['colors']);
  };

  const updateSteps = (index: number, newSteps: number) => {
    const updatedGradientSettings = [...gradientSettings];

    updatedGradientSettings[index * 2 + 1] = newSteps;

    setGradientSettings(updatedGradientSettings as Gradient['colors']);
  };

  return (
    <>
      <Preview gradient={gradient || []} />

      <GradientSettings 
        gradientSettings={gradientSettings}
        gradient={gradient}
        onAddColor={addColorStep}
        onRemoveColor={removeColorStep}
        onUpdateColor={updateColor}
        onUpdateSteps={updateSteps}
      />

      <GradientExamplesList
        onSelected={selectColors}
      />

      <ToolCrossLinks
        toolKey="gradient-generator"
        title="Explore More Color Tools"
      />
    </>
  );
}

export { GradientGenerator };