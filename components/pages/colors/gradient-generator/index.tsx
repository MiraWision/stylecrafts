import React, { useEffect, useMemo, useState } from 'react';
import { generateMultiSteppedGradient } from '@mirawision/colorize';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { copyToClipboard } from '@/utils/copy';
import { useToast } from '@/components/ui/toast';

import { ColorInput } from '@/components/ui/inputs/color-input';
import { Label } from '@/components/ui/texts/label';
import { ColorsOutput } from '@/components/pages/colors/gradient-generator/colors-output';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { Gradient, GradientExamplesList } from '@/components/pages/colors/gradient-generator/gradient-examples';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { RemoveButton } from '@/components/ui/buttons/remove-button';
import { StepNumberInput } from '@/components/ui/inputs/step-number-input';

interface Props {
}

const GradientGenerator: React.FC<Props> = ({}) => {
  const { showToast } = useToast();

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

  const handleColorsSelected = (colors: Gradient['colors']) => {
    setGradientSettings(colors);
  
    GAService.logEvent(analyticsEvents.gradientGenerator.gradientGenerated(`Loaded example: ${JSON.stringify(colors)}`));
  };

  const addColorStep = () => {
    setGradientSettings([...gradientSettings, 2, '#ffffff' ]);

    GAService.logEvent(analyticsEvents.gradientGenerator.colorsEntered(`Added color`));
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
    
    GAService.logEvent(analyticsEvents.gradientGenerator.colorsEntered(`Removed color at index: ${index}`));
  };

  const updateColor = (index: number, newColor: string) => {
    const updatedGradientSettings = [...gradientSettings];

    updatedGradientSettings[index * 2] = newColor;

    setGradientSettings(updatedGradientSettings as Gradient['colors']);
    
    GAService.logEvent(analyticsEvents.gradientGenerator.colorsEntered(`Updated color at index: ${index} to ${newColor}`));
  };

  const updateSteps = (index: number, newSteps: number) => {
    const updatedGradientSettings = [...gradientSettings];

    updatedGradientSettings[index * 2 + 1] = newSteps;

    setGradientSettings(updatedGradientSettings as Gradient['colors']);

    GAService.logEvent(analyticsEvents.gradientGenerator.colorsEntered(`Updated steps at index: ${index} to ${newSteps}`));
  };

  const copyAll = () => {
    const formattedColors = JSON.stringify(gradient).replace(/,/g, ', ');

    copyToClipboard(formattedColors, {
      onSuccess: () => {
        showToast({ severity: 'success', summary: 'Array copied to clipboard' });

        GAService.logEvent(analyticsEvents.copyActions.textCopied('Copied all gradient colors'));
      },
      onFail: () => showToast({ severity: 'error', summary: 'Failed to copy array' }),
    });
  };

  return (
    <>
      <Container>
        <div>
          {gradientSettings.map((item, index) => {
            const colorIndex = Math.floor(index / 2);

            const type = index % 2 === 0 ? 'color' : 'steps';

            if (type === 'color') {
              return (
                <Field>
                  <Label>Color {colorIndex + 1}</Label>

                  <ColorInputContainer>
                    <ColorInput
                      value={item as string}
                      onChange={(newColor) => updateColor(colorIndex, newColor)}
                    />

                    <RemoveButton 
                      onClick={() => removeColorStep(colorIndex)}
                      disabled={gradientSettings.length <= 3} 
                    />
                  </ColorInputContainer>
                </Field>
              )
            }

            return (
              <Field>
                <Label>Steps to Color {colorIndex + 2}</Label>

                <StepNumberInput
                  value={item as number}
                  onChange={(newSteps) => updateSteps(colorIndex, newSteps)}
                  min={1}
                  max={25}
                  step={1}
                  showButtons
                />
              </Field>
            );
          })}

          <PrimaryButton icon='pi pi-plus' onClick={addColorStep}>
            Add Color
          </PrimaryButton>
        </div>

        <div>
          {gradient && (
            <Results>
              <ColorsOutput colors={gradient} />

              <PrimaryButton icon='pi pi-copy' onClick={copyAll}>
                Copy All
              </PrimaryButton>
            </Results>
          )}
        </div>
      </Container>

      <GradientExamplesList
        onSelected={handleColorsSelected}
      />
    </>
  );
}

const Container = styled(TwoColumnsContainer)`
  min-height: 25rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export { GradientGenerator };