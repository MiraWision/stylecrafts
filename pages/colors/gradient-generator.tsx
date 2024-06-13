import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { MetaTagsPage } from '@/components/pages/meta-tags';
import { metaTags } from '@/content/meta-data/function-colors-gradient';

import { copyToClipboard } from '@/utils/copy';
import { content } from '@/content/function-descriptions/colors-gradient';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BaseLayout } from '@/layouts/base-layout';
import { Title, Subtitle } from '@/components/ui/typography';
import { NPMLink } from '@/components/ui/npm-link';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { Label } from '@/components/ui/label';
import { ColorsOutput } from '@/components/ui/outputs/colors-output';
import { generateMultiSteppedGradient } from '@mirawision/colorize';
import { MainContainer, TwoColumnsContainer } from '@/components/ui/containers';
import { PostContainer } from '@/components/ui/post';
import { Markdown } from '@/components/ui/markdown';
import { GradientExamplesList } from '@/components/pages/colors/gradient-generator/gradient-examples-list';

import { logEvent } from '@/lib/gtag';
import analyticsEvents from '@/lib/analytics-events';

const Colors = [
  '#ff5733',
  '#3498db',
  '#8e44ad',
  '#16a085',
  '#f1c40f',
  '#e74c3c',
  '#2ecc71',
  '#d35400',
  '#7f8c8d',
  '#2980b9',
];

const getRandomElements = (arr: string[], count: number) => {
  let shuffled = arr.slice();

  for (let i = 0; i < count; i++) {
    let j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

const initialColors = getRandomElements(Colors, 2);

const ColorsGradientGeneratorToolPage = () => {
  const toast = useRef<Toast>(null);

  const [colorSteps, setColorSteps] = useState<Array<{ color: string; steps: number }>>([
    { color: initialColors[0], steps: 3 },
    { color: initialColors[1], steps: 4 },
  ]);
  const [intermediateMultiColors, setIntermediateMultiColors] = useState<string[]>([]);

  useEffect(() => {
    try {
      const gradientArgs = colorSteps.flatMap(({ color, steps }, index) =>
        index < colorSteps.length - 1 ? [color, steps] : [color]
      );
      const newColors = generateMultiSteppedGradient(...gradientArgs);
      setIntermediateMultiColors(newColors);
    } catch (error) {
      console.error(error);
    }
  }, [colorSteps]);

  const addColorStep = () => {
    const newColor = getRandomElements(Colors, 1)[0];
    setColorSteps([...colorSteps, { color: newColor, steps: 2 }]);
    logEvent(
      analyticsEvents.gradientGenerator.colorsEntered.event,
      analyticsEvents.gradientGenerator.colorsEntered.action,
      `Added color: ${newColor}`
    );
  };

  const removeColorStep = (index: number) => {
    if (colorSteps.length > 2) {
      const newColorSteps = colorSteps.filter((_, i) => i !== index);
      setColorSteps(newColorSteps);
      logEvent(
        analyticsEvents.gradientGenerator.colorsEntered.event,
        analyticsEvents.gradientGenerator.colorsEntered.action,
        `Removed color at index: ${index}`
      );
    }
  };

  const updateColor = (index: number, newColor: string) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index].color = newColor;
    setColorSteps(newColorSteps);
    logEvent(
      analyticsEvents.gradientGenerator.colorsEntered.event,
      analyticsEvents.gradientGenerator.colorsEntered.action,
      `Updated color at index: ${index} to ${newColor}`
    );
  };

  const updateSteps = (index: number, newSteps: number) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index].steps = newSteps;
    setColorSteps(newColorSteps);
    logEvent(
      analyticsEvents.gradientGenerator.colorsEntered.event,
      analyticsEvents.gradientGenerator.colorsEntered.action,
      `Updated steps at index: ${index} to ${newSteps}`
    );
  };

  const copyAll = () => {
    const formattedColors = JSON.stringify(intermediateMultiColors).replace(/,/g, ', ');
    copyToClipboard(formattedColors, {
      onSuccess: () => {
        toast.current?.show({ severity: 'success', summary: 'Array copied to clipboard' });
        logEvent(
          analyticsEvents.copyActions.textCopied.event,
          analyticsEvents.copyActions.textCopied.action,
          'Copied all gradient colors'
        );
      },
      onFail: () => toast.current?.show({ severity: 'error', summary: 'Failed to copy array' }),
    });
  };

  const loadExample = (example: (string | number)[]): void => {
    const newColorSteps: Array<{ color: string; steps: number }> = [];

    for (let i = 0; i < example.length; i += 2) {
      const color = example[i];
      const steps = example[i + 1];

      if (typeof color === 'string' && (typeof steps === 'number' || steps === undefined)) {
        newColorSteps.push({ color, steps: steps !== undefined ? steps : 0 });
      }
    }

    setColorSteps(newColorSteps);
    logEvent(
      analyticsEvents.gradientGenerator.gradientGenerated.event,
      analyticsEvents.gradientGenerator.gradientGenerated.action,
      `Loaded example: ${JSON.stringify(example)}`
    );
  };

  return (
    <BaseLayout>
      <MetaTagsPage {...metaTags} />
      <Toast ref={toast} />

      <MainContainer>
        <Title>Colors Gradient</Title>
        <Subtitle>Generate Multi-Stepped Gradients</Subtitle>

        <TwoColumnsContainer>
          <div>
            {colorSteps.map((item, index) => (
              <ColorStepContainer key={index}>
                <Label margin='1rem 0 0.5rem 0'>{`Color ${index + 1}`}</Label>

                <ColorInputContainer>
                  <ColorInput
                    value={item.color}
                    onChange={(newColor) => updateColor(index, newColor)}
                  />
                  <RemoveButton
                    icon='pi pi-minus'
                    className='p-button-rounded p-button-danger p-button-sm'
                    onClick={() => removeColorStep(index)}
                    disabled={colorSteps.length <= 2}
                  />
                </ColorInputContainer>

                {index < colorSteps.length - 1 && (
                  <>
                    <Label margin='1rem 0 0.5rem 0'>{`Steps to Color ${index + 2}`}</Label>

                    <InputNumber
                      value={item.steps}
                      onChange={(e) => updateSteps(index, e.value || 0)}
                      showButtons
                      min={1}
                      max={25}
                    />
                  </>
                )}
              </ColorStepContainer>
            ))}

            <StyledButton icon='pi pi-plus' label='Add Color' onClick={addColorStep} />
          </div>

          <div>
            <StyledButton icon='pi pi-copy' label='Copy All' onClick={copyAll} />

            <ColorsOutput colors={intermediateMultiColors} />
          </div>
        </TwoColumnsContainer>

        <GradientExamplesList
          onSelected={loadExample}
        />

        <NPMLink
          text='Need to have color tools like these in your app? Feel free to use our NPM package'
          packageName='@mirawision/colorize'
        />
      </MainContainer>

      <PostContainer>
        <Markdown markdownText={content} />
      </PostContainer>
    </BaseLayout>
  );
};

const ColorStepContainer = styled.div`
  margin-bottom: 1rem;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled(Button)`
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  .pi {
    font-size: 0.75rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledButton = styled(Button)`
  margin: 1.4rem 0;
  height: 2rem;
  width: 8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;

  .pi {
    font-size: 0.8rem;
  }
`;

export default ColorsGradientGeneratorToolPage;