import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { BaseLayout } from '@/layouts/base-layout';
import { Header1, Header2 } from '@/components/templates/headers-template';
import { NPMLink } from '@/components/common/npm-link';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { Label } from '@/components/common/label';
import { ColorsOutput } from '@/components/ui/inputs/colors-output';
import { generateMultiSteppedGradient } from '@mirawision/colorize';

const Colors = [
  '#FF5733',
  '#3498DB',
  '#8E44AD',
  '#16A085',
  '#F1C40F',
  '#E74C3C',
  '#2ECC71',
  '#D35400',
  '#7F8C8D',
  '#2980B9',
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

const ColorsGradient = () => {
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

  const copyToClipboard = () => {
    const jsonColors = JSON.stringify(intermediateMultiColors);
    navigator.clipboard.writeText(jsonColors).then(() => {
      alert('Colors copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy!', err);
    });
  };

  return (
    <BaseLayout>
      <Header1 centered>Gradient Mixer</Header1>
      <Header2 centered>Create a Multi-Stepped Gradient</Header2>

      <Grid>
        <div>
          {colorSteps.map((item, index) => (
            <div key={index}>
              <Label margin="1rem 0 0.5rem 0">{`Steps to Color ${index + 1}`}</Label>
              <ColorInput
                value={item.color}
                onChange={(newColor) => updateColor(index, newColor)}
              />

              {index < colorSteps.length - 1 && (
                <>
                  <Label margin="1rem 0 0.5rem 0">{`Steps to Color ${index + 2}`}</Label>
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
          <StyledButton icon="pi pi-plus" label="Add Color" onClick={addColorStep} />
        </div>
        <div>
          <StyledCopyButton icon="pi pi-copy" label="Copy All" onClick={copyToClipboard} />
          <ColorsOutput colors={intermediateMultiColors} />
        </div>
      </Grid>

      <NPMLink
        text="Need to have color tools like these in your app? Feel free to use our NPM package"
        packageName="@mirawision/colorize"
      />
    </BaseLayout>
  );
};

export default ColorsGradient;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10rem;
  width: 40rem;
  margin: 24px auto;
  padding-bottom: 3rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1.4rem;
  height: 1rem;
  width: 8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  .pi {
    font-size: 0.8rem;
  }
`;

const StyledCopyButton = styled(Button)`
  margin-bottom: 1.4rem;
  height: 1rem;
  width: 8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;

  .pi {
    font-size: 0.8rem;
  }
`;