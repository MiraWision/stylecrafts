import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

const ColorsGradientPage = () => {
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
  };

  const updateColor = (index: number, newColor: string) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index].color = newColor;
    setColorSteps(newColorSteps);
  };

  const updateSteps = (index: number, newSteps: number) => {
    const newColorSteps = [...colorSteps];
    newColorSteps[index].steps = newSteps;
    setColorSteps(newColorSteps);
  };

  const copyAll = () => {
    copyToClipboard(JSON.stringify(intermediateMultiColors), {
      onSuccess: () => toast.current?.show({ severity: 'success', summary: 'Array copied to clipboard' }),
      onFail: () => toast.current?.show({ severity: 'error', summary: 'Failed to copy array' }),
    });
  };

  return (
    <BaseLayout>
      <Toast ref={toast} />
      
      <MainContainer>
        <Title>Colors Gradient</Title>

        <Subtitle>Generate Multi-Stepped Gradients</Subtitle>

        <TwoColumnsContainer>
          <div>
            {colorSteps.map((item, index) => (
              <div key={index}>
                <Label margin='1rem 0 0.5rem 0'>{`Steps to Color ${index + 1}`}</Label>

                <ColorInput
                  value={item.color}
                  onChange={(newColor) => updateColor(index, newColor)}
                />

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
              </div>
            ))}

            <StyledButton icon='pi pi-plus' label='Add Color' onClick={addColorStep} />
          </div>

          <div>
            <StyledButton icon='pi pi-copy' label='Copy All' onClick={copyAll} />

            <ColorsOutput colors={intermediateMultiColors} />
          </div>
        </TwoColumnsContainer>

        <NPMLink
          text='Need to have color tools like these in your app? Feel free to use our NPM package'
          packageName='@mirawision/colorize'
        />
      </MainContainer>
      
      <PostContainer>
        <Markdown 
          markdownText={content}
        />
      </PostContainer> 
    </BaseLayout>
  );
};

const StyledButton = styled(Button)`
  margin-top: 1.4rem;
  height: 2rem;
  width: 8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;

  .pi {
    font-size: 0.8rem;
  }
`;

export default ColorsGradientPage;
